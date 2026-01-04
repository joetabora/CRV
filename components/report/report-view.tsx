"use client"

import { Report } from "@/lib/types"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Printer } from "lucide-react"
import { format } from "date-fns"
import { ExecutiveSnapshot } from "./sections/executive-snapshot"
import { AQVBreakdown } from "./sections/aqv-breakdown"
import { MonetizationPotential } from "./sections/monetization-potential"
import { PeerBenchmarking } from "./sections/peer-benchmarking"
import { ActionableRecommendations } from "./sections/actionable-recommendations"
import { MethodologyAppendix } from "./sections/methodology-appendix"

interface ReportViewProps {
  report: Report
}

export function ReportView({ report }: ReportViewProps) {
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-muted/30 print:bg-white">
      {/* Navigation Header - hidden in print */}
      <div className="no-print">
        <Header />
      </div>

      {/* Report Header Bar */}
      <div className="border-b bg-background sticky top-0 z-40 no-print">
        <div className="container max-w-6xl py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-semibold">{report.creator.name}</h1>
                <Badge variant="outline" className="font-normal">{report.creator.platform}</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Generated {format(report.createdAt, 'MMM d, yyyy')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint} className="gap-2">
              <Printer className="h-4 w-4" />
              Print
            </Button>
            <Button size="sm" onClick={handlePrint} className="gap-2">
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="container max-w-6xl py-10 print:py-0 print:max-w-none">
        {/* Print Header - only visible in print */}
        <div className="hidden print:block mb-8 pb-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded bg-neutral-900 flex items-center justify-center">
                <span className="text-white font-bold text-sm">CRV</span>
              </div>
              <div>
                <p className="text-lg font-semibold">Creator Valuation Report</p>
                <p className="text-sm text-muted-foreground">Confidential</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-medium">{report.creator.name}</p>
              <p className="text-sm text-muted-foreground">{format(report.createdAt, 'MMMM d, yyyy')}</p>
            </div>
          </div>
        </div>

        {/* Sections with significant spacing */}
        <div className="space-y-8 print:space-y-6">
          {/* Executive Snapshot */}
          <section className="print-avoid-break">
            <ExecutiveSnapshot report={report} />
          </section>

          {/* AQV Breakdown */}
          <section className="print-avoid-break">
            <AQVBreakdown report={report} />
          </section>

          {/* Monetization & Revenue Potential */}
          <section className="print-avoid-break">
            <MonetizationPotential report={report} />
          </section>

          {/* Peer Benchmarking */}
          <section className="print-avoid-break">
            <PeerBenchmarking report={report} />
          </section>

          {/* Actionable Recommendations */}
          <section className="print-avoid-break">
            <ActionableRecommendations report={report} />
          </section>

          {/* Methodology Appendix */}
          <section className="print-break-before">
            <MethodologyAppendix report={report} />
          </section>
        </div>

        {/* Report Footer */}
        <footer className="mt-12 pt-6 border-t print:mt-8">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <p>CRV – Creator Valuation Reports</p>
            <p>Report ID: {report.id}</p>
            <p>Confidential – Do not distribute</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
