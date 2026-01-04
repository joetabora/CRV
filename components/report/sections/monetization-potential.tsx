import { Report } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface MonetizationPotentialProps {
  report: Report
}

function getEfficiencyStatus(rating: number): { label: string; description: string; variant: "success" | "warning" | "secondary" } {
  if (rating >= 80) return { label: "Efficient", description: "Operating near optimal monetization", variant: "success" }
  if (rating >= 60) return { label: "Under-Monetized", description: "Significant revenue upside exists", variant: "warning" }
  return { label: "Early Stage", description: "Monetization infrastructure developing", variant: "secondary" }
}

export function MonetizationPotential({ report }: MonetizationPotentialProps) {
  const efficiencyStatus = getEfficiencyStatus(report.efficiencyRating)
  
  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Monetization & Revenue Potential</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Sponsorship capacity and efficiency analysis
        </p>
      </div>

      {/* Primary Value Display */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Estimated Monthly Sponsorship Value</p>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-sm text-muted-foreground">$</span>
              <span className="text-5xl font-bold tabular-nums">{(report.sponsorshipValue / 1000).toFixed(0)}K</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>Conservative: ${(report.sponsorshipValueLow / 1000).toFixed(0)}K</span>
              <span>·</span>
              <span>Optimistic: ${(report.sponsorshipValueHigh / 1000).toFixed(0)}K</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Monetization Efficiency</p>
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-5xl font-bold tabular-nums">{report.efficiencyRating}</span>
              <Badge variant={efficiencyStatus.variant} className="text-xs">{efficiencyStatus.label}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{efficiencyStatus.description}</p>
          </CardContent>
        </Card>
      </div>

      {/* Efficiency Metrics */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">CPM Range</p>
          <p className="text-2xl font-bold tabular-nums">${report.cpmRange.low}–{report.cpmRange.high}</p>
          <p className="text-xs text-muted-foreground mt-1">Per 1K impressions</p>
        </div>
        <div className="p-4 border rounded-lg">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Placement Capacity</p>
          <p className="text-2xl font-bold tabular-nums">{report.placementCapacity.low}–{report.placementCapacity.high}</p>
          <p className="text-xs text-muted-foreground mt-1">Placements / month</p>
        </div>
        <div className="p-4 border rounded-lg">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Revenue / Viewer</p>
          <p className="text-2xl font-bold tabular-nums">{report.efficiencyRating}</p>
          <p className="text-xs text-muted-foreground mt-1">Efficiency index</p>
        </div>
      </div>

      <Separator />

      {/* Insight Callouts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* What Brands Are Paying For */}
        <Card className="bg-emerald-50/50 border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900">
          <CardContent className="pt-6">
            <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider mb-3">
              What Brands Are Paying For
            </p>
            <ul className="space-y-2">
              {report.brandInsights.map((insight, i) => (
                <li key={i} className="text-sm flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-500 mt-0.5">✓</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Revenue Left on Table */}
        <Card className="bg-amber-50/50 border-amber-100 dark:bg-amber-950/20 dark:border-amber-900">
          <CardContent className="pt-6">
            <p className="text-xs font-semibold text-amber-800 dark:text-amber-400 uppercase tracking-wider mb-3">
              Where Revenue Is Being Left on the Table
            </p>
            <ul className="space-y-2">
              <li className="text-sm flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-500 mt-0.5">→</span>
                <span>Placement frequency below capacity ceiling</span>
              </li>
              <li className="text-sm flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-500 mt-0.5">→</span>
                <span>Premium brand categories under-penetrated</span>
              </li>
              <li className="text-sm flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-500 mt-0.5">→</span>
                <span>{report.primaryConstraint}</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* Format Fit */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Sponsorship Format Fit</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {report.sponsorshipFormats.map((format) => (
            <div key={format.format} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{format.format}</span>
                <Badge variant={
                  format.fit === 'High' ? 'success' : 
                  format.fit === 'Medium' ? 'secondary' : 
                  'outline'
                } className="text-xs">
                  {format.fit}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{format.notes}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
