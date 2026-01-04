"use client"

import { Report } from "@/lib/types"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
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
    <div className="min-h-screen bg-background">
      {/* Navigation Header - hidden in print */}
      <div className="no-print">
        <Header />
      </div>

      {/* Report Header Bar */}
      <div className="border-b bg-background sticky top-0 z-40 no-print">
        <div className="container max-w-5xl py-3 flex items-center justify-between">
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
      <div className="container max-w-5xl py-8 print:py-6">
        {/* Print Header - only visible in print */}
        <div className="hidden print:block mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded bg-neutral-900 flex items-center justify-center">
                <span className="text-white font-bold text-xs">CRV</span>
              </div>
              <div>
                <p className="font-semibold">Creator Valuation Report</p>
                <p className="text-xs text-muted-foreground">Confidential</p>
              </div>
            </div>
            <div className="text-right text-sm">
              <p className="font-medium">{report.creator.name}</p>
              <p className="text-muted-foreground">{format(report.createdAt, 'MMMM d, yyyy')}</p>
            </div>
          </div>
          <Separator />
        </div>

        {/* Sections */}
        <div className="space-y-12 print:space-y-8">
          {/* Executive Snapshot */}
          <section className="print-avoid-break">
            <ExecutiveSnapshot report={report} />
          </section>

          <Separator className="print:hidden" />

          {/* AQV Breakdown */}
          <section className="print-avoid-break">
            <AQVBreakdown report={report} />
          </section>

          <Separator className="print:hidden" />

          {/* Monetization & Revenue Potential */}
          <section className="print-avoid-break">
            <MonetizationPotential report={report} />
          </section>

          <Separator className="print:hidden" />

          {/* Peer Benchmarking */}
          <section className="print-avoid-break">
            <PeerBenchmarking report={report} />
          </section>

          <Separator className="print:hidden" />

          {/* Actionable Recommendations */}
          <section className="print-avoid-break">
            <ActionableRecommendations report={report} />
          </section>

          <Separator className="print:hidden" />

          {/* Methodology Appendix */}
          <section className="print-break-before print:pt-8">
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
