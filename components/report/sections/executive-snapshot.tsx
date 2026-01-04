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
    <Card className="print-avoid-break">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Executive Snapshot</CardTitle>
        <p className="text-xs text-muted-foreground">
          {report.creator.name} · {report.creator.handle} · {report.creator.category}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* KPI Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {/* AQV Score */}
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">AQV™ Score</p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold tabular-nums tracking-tight">{report.aqvScore}</span>
              <span className="text-sm text-muted-foreground">/100</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{aqvTier.label}</Badge>
              <span className="text-[10px] text-muted-foreground">{aqvTier.percentile}</span>
            </div>
          </div>

          {/* Audience Tier */}
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">Audience Tier</p>
            <span className="text-4xl font-bold tracking-tight">{report.audienceTier.split(' ')[1]}</span>
            <p className="text-[10px] text-muted-foreground mt-2">Engaged mid-core</p>
          </div>

          {/* Monetization */}
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">Monetization</p>
            <span className="text-4xl font-bold tabular-nums tracking-tight">{report.efficiencyRating}</span>
            <div className="mt-2">
              <Badge variant={monetizationStatus.variant} className="text-[10px] px-1.5 py-0">{monetizationStatus.status}</Badge>
            </div>
          </div>

          {/* Brand Risk */}
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">Brand Risk</p>
            <span className="text-4xl font-bold tracking-tight">{report.brandRisk}</span>
            <div className="mt-2">
              <Badge variant={report.brandRisk === 'Low' ? 'success' : report.brandRisk === 'Medium' ? 'warning' : 'destructive'} className="text-[10px] px-1.5 py-0">
                {report.brandRiskScore}
              </Badge>
            </div>
          </div>

          {/* Est. Value */}
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">Est. Monthly</p>
            <div className="flex items-baseline">
              <span className="text-sm text-muted-foreground">$</span>
              <span className="text-4xl font-bold tabular-nums tracking-tight">{(report.sponsorshipValue / 1000).toFixed(0)}K</span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">
              ${(report.sponsorshipValueLow / 1000).toFixed(0)}K–${(report.sponsorshipValueHigh / 1000).toFixed(0)}K range
            </p>
          </div>
        </div>

        {/* Interpretation + Signals */}
        <div className="grid lg:grid-cols-3 gap-4 pt-4 border-t print-avoid-break">
          <div className="lg:col-span-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Interpretation</p>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {aqvTier.label}-tier target with {aqvTier.percentile.toLowerCase()} audience quality. 
              Monetization efficiency indicates revenue upside. Brand safety supports premium partnerships.
            </p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Key Signals</p>
            <ul className="space-y-1">
              {report.brandInsights.slice(0, 3).map((insight, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                  <span className="shrink-0">→</span>
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
