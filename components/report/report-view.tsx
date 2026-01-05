"use client"

import { useState } from "react"
import { Report } from "@/lib/types"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Printer, Lock, Crown, Sparkles, Loader2, Check } from "lucide-react"
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

const PRO_FEATURES = [
  "YouTube & multi-platform analysis",
  "Platform contribution breakdown",
  "Peer benchmarking vs cohort",
  "PDF export for sharing",
]

const PRO_UNLOCKED_FEATURES = [
  { name: "Platform Contribution", description: "See how each platform weighs into your composite score" },
  { name: "YouTube Analysis", description: "Full YouTube metrics and optimization insights" },
  { name: "Peer Benchmarks", description: "Compare against similar creators in your cohort" },
  { name: "PDF Export", description: "Download and share professional reports" },
]

export function ReportView({ report }: ReportViewProps) {
  const isPro = report.accessLevel === 'pro'
  const [isUpgrading, setIsUpgrading] = useState(false)

  const handlePrint = () => {
    if (!isPro) {
      handleUpgrade()
      return
    }
    window.print()
  }

  const handleUpgrade = async () => {
    setIsUpgrading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportId: report.id }),
      })
      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Checkout error:', error)
      setIsUpgrading(false)
    }
  }

  return (
    <div className="min-h-screen bg-muted/30 print:bg-white">
      {/* Navigation - hidden in print */}
      <div className="no-print">
        <Header />
      </div>

      {/* Pro Confirmation Banner for Pro Users */}
      {isPro && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white no-print">
          <div className="container max-w-5xl py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <Crown className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-sm">Pro Report Unlocked</p>
                <p className="text-xs text-white/80">Full access to all premium analytics and exports</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {PRO_UNLOCKED_FEATURES.slice(0, 3).map((feature) => (
                <span key={feature.name} className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 text-xs">
                  <Check className="h-3 w-3" />
                  {feature.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Pro Upgrade Banner for Free Users */}
      {!isPro && (
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white no-print">
          <div className="container max-w-5xl py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-sm">Unlock the full report</p>
                <p className="text-xs text-white/80">Get YouTube analysis, peer benchmarking & PDF export</p>
              </div>
            </div>
            <Button 
              onClick={handleUpgrade}
              disabled={isUpgrading}
              className="bg-white text-violet-700 hover:bg-white/90 font-semibold"
              size="sm"
            >
              {isUpgrading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                <>Upgrade to Pro – $29</>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Report Bar */}
      <div className="border-b bg-background sticky top-0 z-40 no-print">
        <div className="container max-w-5xl py-3 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-semibold">{report.creator.name}</h1>
              <Badge variant="outline" className="font-normal text-xs">{report.creator.platform}</Badge>
              {isPro ? (
                <Badge className="text-[10px] bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                  <Crown className="h-3 w-3 mr-1" />
                  Pro
                </Badge>
              ) : (
                <Badge variant="secondary" className="text-[10px]">Free</Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{format(report.createdAt, 'MMM d, yyyy')}</p>
          </div>
          <div className="flex gap-2">
            {isPro ? (
              <>
                <Button variant="outline" size="sm" onClick={handlePrint}>
                  <Printer className="h-3.5 w-3.5 mr-1.5" />
                  Print
                </Button>
                <Button size="sm" onClick={handlePrint}>
                  <Download className="h-3.5 w-3.5 mr-1.5" />
                  PDF
                </Button>
              </>
            ) : (
              <Button 
                size="sm" 
                onClick={handleUpgrade}
                disabled={isUpgrading}
                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
              >
                {isUpgrading ? (
                  <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                ) : (
                  <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                )}
                Upgrade to Pro
              </Button>
            )}
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

        {/* What You Unlocked - Pro Users Only */}
        {isPro && (
          <Card className="mb-6 border-emerald-200 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 no-print">
            <CardContent className="py-5">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <Crown className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm mb-3">What You Unlocked</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {PRO_UNLOCKED_FEATURES.map((feature) => (
                      <div key={feature.name} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">{feature.name}</p>
                          <p className="text-[11px] text-muted-foreground leading-tight">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

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

        {/* Bottom Upgrade CTA for Free Users */}
        {!isPro && (
          <Card className="mt-8 border-2 border-violet-200 bg-gradient-to-br from-violet-50 to-indigo-50 no-print">
            <CardContent className="py-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-medium mb-3">
                    <Sparkles className="h-3 w-3" />
                    Pro Report
                  </div>
                  <h3 className="text-xl font-bold mb-2">Unlock the Complete Analysis</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Get the full picture with cross-platform insights, peer comparisons, and exportable reports.
                  </p>
                  <ul className="space-y-2 mb-6">
                    {PRO_FEATURES.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="text-center">
                    <p className="text-3xl font-bold">$29</p>
                    <p className="text-xs text-muted-foreground">one-time payment</p>
                  </div>
                  <Button 
                    onClick={handleUpgrade}
                    disabled={isUpgrading}
                    size="lg"
                    className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 font-semibold px-8"
                  >
                    {isUpgrading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>Upgrade Now</>
                    )}
                  </Button>
                  <p className="text-[10px] text-muted-foreground">Secure payment via Stripe</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

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
