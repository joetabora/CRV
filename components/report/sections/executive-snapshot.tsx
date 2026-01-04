import { Report } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

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
    <div className="space-y-8">
      {/* Section Header */}
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Executive Snapshot</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {report.creator.name} · {report.creator.handle} · {report.creator.category}
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* AQV Score */}
        <Card className="col-span-1">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">AQV™ Score</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold tabular-nums">{report.aqvScore}</span>
                <span className="text-sm text-muted-foreground">/100</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="font-medium">{aqvTier.label}</Badge>
                <span className="text-xs text-muted-foreground">{aqvTier.percentile}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Audience Tier */}
        <Card className="col-span-1">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Audience Tier</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">{report.audienceTier.split(' ')[1]}</span>
              </div>
              <p className="text-xs text-muted-foreground">Engaged mid-core segment</p>
            </div>
          </CardContent>
        </Card>

        {/* Monetization Readiness */}
        <Card className="col-span-1">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Monetization</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold tabular-nums">{report.efficiencyRating}</span>
              </div>
              <Badge variant={monetizationStatus.variant}>{monetizationStatus.status}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Brand Risk */}
        <Card className="col-span-1">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Brand Risk</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">{report.brandRisk}</span>
              </div>
              <Badge variant={report.brandRisk === 'Low' ? 'success' : report.brandRisk === 'Medium' ? 'warning' : 'destructive'}>
                Score: {report.brandRiskScore}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Sponsorship Value */}
        <Card className="col-span-1">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Est. Monthly Value</p>
              <div className="flex items-baseline gap-1">
                <span className="text-sm text-muted-foreground">$</span>
                <span className="text-4xl font-bold tabular-nums">{(report.sponsorshipValue / 1000).toFixed(0)}K</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Range: ${(report.sponsorshipValueLow / 1000).toFixed(0)}K–${(report.sponsorshipValueHigh / 1000).toFixed(0)}K
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* Executive Interpretation */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Executive Interpretation</h3>
          <p className="text-sm leading-relaxed">
            {report.creator.name} represents a <span className="font-medium">{aqvTier.label.toLowerCase()}-tier acquisition target</span> with 
            demonstrated audience quality metrics in the {aqvTier.percentile.toLowerCase()} of comparable creators. 
            Current monetization efficiency suggests <span className="font-medium">meaningful revenue upside</span> through 
            optimized placement strategy. Brand safety profile supports premium partnership consideration.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Key Signals</h3>
          <ul className="space-y-2">
            {report.brandInsights.slice(0, 3).map((insight, i) => (
              <li key={i} className="text-sm flex items-start gap-2">
                <span className="text-muted-foreground mt-1">→</span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
