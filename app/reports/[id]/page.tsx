"use client"

import { useEffect, useState } from "react"
import { notFound, useParams, useSearchParams } from "next/navigation"
import { getReportById, generateNewReport, upgradeReportToPro } from "@/lib/mock-data"
import { ReportView } from "@/components/report/report-view"
import { Report } from "@/lib/types"
import { Loader2, CheckCircle, X } from "lucide-react"

export default function ReportPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const id = params.id as string
  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(true)
  const [showUpgradeSuccess, setShowUpgradeSuccess] = useState(false)

  useEffect(() => {
    // Check for upgrade success
    const upgraded = searchParams.get('upgraded')
    if (upgraded === 'true') {
      setShowUpgradeSuccess(true)
      // Auto-hide after 5 seconds
      setTimeout(() => setShowUpgradeSuccess(false), 5000)
    }

    // First try to get from store
    let fetchedReport = getReportById(id)
    
    // If upgraded flag is set, ensure report is Pro
    if (upgraded === 'true' && fetchedReport) {
      // Force upgrade in case the route handler didn't persist
      const upgradedReport = upgradeReportToPro(id)
      if (upgradedReport) {
        fetchedReport = upgradedReport
      } else {
        // Fallback: manually set to pro
        fetchedReport = { ...fetchedReport, accessLevel: 'pro' }
      }
    }
    
    // If not found in store but we have platform URLs in query params, regenerate
    if (!fetchedReport || !fetchedReport.platformAQVData || fetchedReport.platformAQVData.length === 0) {
      const platformsParam = searchParams.get('platforms')
      
      if (platformsParam) {
        const platformUrls = decodeURIComponent(platformsParam).split(',').filter(Boolean)
        
        if (platformUrls.length > 0) {
          // Regenerate report with the platform URLs from query params
          fetchedReport = generateNewReport({
            primaryUrl: platformUrls[0],
            additionalUrls: platformUrls.slice(1),
          })
          // Override the ID to match the URL
          fetchedReport = { ...fetchedReport, id }
          
          // If coming from upgrade, set to pro
          if (upgraded === 'true') {
            fetchedReport = { ...fetchedReport, accessLevel: 'pro' }
          }
        }
      }
    }
    
    setReport(fetchedReport)
    setLoading(false)
  }, [id, searchParams])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!report) {
    notFound()
  }

  return (
    <>
      {/* Upgrade Success Banner */}
      {showUpgradeSuccess && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="bg-emerald-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">Upgraded to Pro! All features unlocked.</span>
            <button
              onClick={() => setShowUpgradeSuccess(false)}
              className="ml-2 hover:bg-white/20 rounded p-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
      <ReportView report={report} />
    </>
  )
}
