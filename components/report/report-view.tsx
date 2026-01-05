"use client"

import { Report } from "@/lib/types"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Printer } from "lucide-react"
import { format } from "date-fns"
import { ExecutiveSnapshot } from "./sections/executive-snapshot"
import { PlatformContribution } from "./sections/platform-contribution"
import { AQVBreakdown } from "./sections/aqv-breakdown"
import { PlatformBreakdown } from "./sections/platform-breakdown"
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
      {/* Navigation - hidden in print */}
      <div className="no-print">
        <Header />
      </div>

      {/* Report Bar */}
      <div className="border-b bg-background sticky top-0 z-40 no-print">
        <div className="container max-w-5xl py-3 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-semibold">{report.creator.name}</h1>
              <Badge variant="outline" className="font-normal text-xs">{report.creator.platform}</Badge>
            </div>
            <p className="text-xs text-muted-foreground">{format(report.createdAt, 'MMM d, yyyy')}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-3.5 w-3.5 mr-1.5" />
              Print
            </Button>
            <Button size="sm" onClick={handlePrint}>
              <Download className="h-3.5 w-3.5 mr-1.5" />
              PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="container max-w-5xl py-8 print:py-0 print:max-w-none">
        {/* Print Header */}
        <div className="hidden print:flex print:items-center print:justify-between print:mb-6 print:pb-4 print:border-b">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-neutral-900 flex items-center justify-center">
              <span className="text-white font-bold text-xs">CRV</span>
            </div>
            <div>
              <p className="font-semibold">Creator Valuation Report</p>
              <p className="text-xs text-muted-foreground">Confidential</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold">{report.creator.name}</p>
            <p className="text-xs text-muted-foreground">{format(report.createdAt, 'MMMM d, yyyy')}</p>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6 print:space-y-4">
          <ExecutiveSnapshot report={report} />
          <PlatformContribution report={report} />
          <AQVBreakdown report={report} />
          <PlatformBreakdown report={report} />
          <MonetizationPotential report={report} />
          <PeerBenchmarking report={report} />
          <ActionableRecommendations report={report} />
          <MethodologyAppendix report={report} />
        </div>

        {/* Footer */}
        <footer className="mt-8 pt-4 border-t text-[10px] text-muted-foreground flex justify-between print:mt-6">
          <span>CRV – Creator Valuation Reports</span>
          <span>{report.id}</span>
          <span>Confidential</span>
        </footer>
      </div>
    </div>
  )
}
