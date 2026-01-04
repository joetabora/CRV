import { notFound } from "next/navigation"
import { getReportById } from "@/lib/mock-data"
import { ReportView } from "@/components/report/report-view"

interface ReportPageProps {
  params: {
    id: string
  }
}

export default function ReportPage({ params }: ReportPageProps) {
  const report = getReportById(params.id)

  if (!report) {
    notFound()
  }

  return <ReportView report={report} />
}

