"use client"

import { useEffect, useState } from "react"
import { notFound, useParams, useSearchParams } from "next/navigation"
import { getReportById, generateNewReport } from "@/lib/mock-data"
import { ReportView } from "@/components/report/report-view"
import { Report } from "@/lib/types"
import { Loader2 } from "lucide-react"

export default function ReportPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const id = params.id as string
  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // First try to get from store
    let fetchedReport = getReportById(id)
    
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

  return <ReportView report={report} />
}
