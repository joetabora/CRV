import { Report } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ExecutiveSnapshotProps {
  report: Report
}

function getAQVTier(score: number): { label: string; percentile: string } {
  if (score >= 85) return { label: "Elite", percentile: "Top 5%" }
  if (score >= 75) return { label: "Strong", percentile: "Top 25%" }
  if (score >= 60) return { label: "Average", percentile: "Top 50%" }
  return { label: "Developing", percentile: "Bottom 50%" }
}

function getMonetizationReadiness(efficiency: number): { status: string; variant: "success" | "warning" | "secondary" } {
  if (efficiency >= 80) return { status: "Efficient", variant: "success" }
  if (efficiency >= 60) return { status: "Under-Monetized", variant: "warning" }
  return { status: "Early Stage", variant: "secondary" }
}

export function ExecutiveSnapshot({ report }: ExecutiveSnapshotProps) {
  const aqvTier = getAQVTier(report.aqvScore)
  const monetizationStatus = getMonetizationReadiness(report.efficiencyRating)

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">Executive Snapshot</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {report.creator.name} · {report.creator.handle} · {report.creator.category}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {/* KPI Cards Grid - Elevated */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {/* AQV Score */}
          <div className="bg-muted/50 rounded-lg p-5 min-h-[140px] flex flex-col">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">AQV™ Score</p>
            <div className="flex-1 flex items-center">
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold tabular-nums tracking-tight">{report.aqvScore}</span>
                  <span className="text-lg text-muted-foreground">/100</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Badge variant="secondary">{aqvTier.label}</Badge>
                  <span className="text-xs text-muted-foreground">{aqvTier.percentile}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Audience Tier */}
          <div className="bg-muted/50 rounded-lg p-5 min-h-[140px] flex flex-col">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Audience Tier</p>
            <div className="flex-1 flex items-center">
              <div>
                <span className="text-5xl font-bold tracking-tight">{report.audienceTier.split(' ')[1]}</span>
                <p className="text-xs text-muted-foreground mt-3">Engaged mid-core segment</p>
              </div>
            </div>
          </div>

          {/* Monetization Readiness */}
          <div className="bg-muted/50 rounded-lg p-5 min-h-[140px] flex flex-col">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Monetization</p>
            <div className="flex-1 flex items-center">
              <div>
                <span className="text-5xl font-bold tabular-nums tracking-tight">{report.efficiencyRating}</span>
                <div className="mt-3">
                  <Badge variant={monetizationStatus.variant}>{monetizationStatus.status}</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Brand Risk */}
          <div className="bg-muted/50 rounded-lg p-5 min-h-[140px] flex flex-col">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Brand Risk</p>
            <div className="flex-1 flex items-center">
              <div>
                <span className="text-5xl font-bold tracking-tight">{report.brandRisk}</span>
                <div className="mt-3">
                  <Badge variant={report.brandRisk === 'Low' ? 'success' : report.brandRisk === 'Medium' ? 'warning' : 'destructive'}>
                    Score: {report.brandRiskScore}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Sponsorship Value */}
          <div className="bg-muted/50 rounded-lg p-5 min-h-[140px] flex flex-col">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Est. Monthly Value</p>
            <div className="flex-1 flex items-center">
              <div>
                <div className="flex items-baseline">
                  <span className="text-lg text-muted-foreground">$</span>
                  <span className="text-5xl font-bold tabular-nums tracking-tight">{(report.sponsorshipValue / 1000).toFixed(0)}K</span>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Range: ${(report.sponsorshipValueLow / 1000).toFixed(0)}K–${(report.sponsorshipValueHigh / 1000).toFixed(0)}K
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Interpretation */}
        <div className="grid lg:grid-cols-3 gap-6 pt-4 border-t">
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Executive Interpretation</h3>
            <p className="text-sm leading-relaxed">
              {report.creator.name} represents a <span className="font-medium">{aqvTier.label.toLowerCase()}-tier acquisition target</span> with 
              demonstrated audience quality metrics in the {aqvTier.percentile.toLowerCase()} of comparable creators. 
              Current monetization efficiency suggests <span className="font-medium">meaningful revenue upside</span> through 
              optimized placement strategy. Brand safety profile supports premium partnership consideration.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Key Signals</h3>
            <ul className="space-y-2">
              {report.brandInsights.slice(0, 3).map((insight, i) => (
                <li key={i} className="text-sm flex items-start gap-2">
                  <span className="text-muted-foreground shrink-0">→</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
