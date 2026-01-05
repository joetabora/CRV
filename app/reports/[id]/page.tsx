"use client"

import { useEffect, useState } from "react"
import { notFound, useParams } from "next/navigation"
import { getReportById } from "@/lib/mock-data"
import { ReportView } from "@/components/report/report-view"
import { Report } from "@/lib/types"
import { Loader2 } from "lucide-react"

export default function ReportPage() {
  const params = useParams()
  const id = params.id as string
  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch report on client side to access the in-memory store
    const fetchedReport = getReportById(id)
    
    // Debug logging
    console.log('[ReportPage] Fetching report:', id)
    console.log('[ReportPage] Report found:', !!fetchedReport)
    if (fetchedReport) {
      console.log('[ReportPage] platformAQVData:', fetchedReport.platformAQVData)
      console.log('[ReportPage] platforms:', fetchedReport.platformAQVData?.map(p => p.platform))
    }
    
    setReport(fetchedReport)
    setLoading(false)
  }, [id])

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
