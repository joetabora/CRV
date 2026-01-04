import { Report } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">Monetization & Revenue Potential</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Sponsorship capacity and efficiency analysis
        </p>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {/* Primary Value Display */}
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-muted/50 rounded-lg p-6">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Estimated Monthly Sponsorship Value</p>
            <div className="flex items-baseline mb-2">
              <span className="text-lg text-muted-foreground">$</span>
              <span className="text-6xl font-bold tabular-nums tracking-tight">{(report.sponsorshipValue / 1000).toFixed(0)}K</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Conservative: ${(report.sponsorshipValueLow / 1000).toFixed(0)}K · Optimistic: ${(report.sponsorshipValueHigh / 1000).toFixed(0)}K
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-6">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Monetization Efficiency</p>
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-6xl font-bold tabular-nums tracking-tight">{report.efficiencyRating}</span>
              <Badge variant={efficiencyStatus.variant} className="text-xs">{efficiencyStatus.label}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{efficiencyStatus.description}</p>
          </div>
        </div>

        {/* Efficiency Metrics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-muted/30 rounded-lg p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">CPM Range</p>
            <p className="text-2xl font-bold tabular-nums">${report.cpmRange.low}–{report.cpmRange.high}</p>
            <p className="text-xs text-muted-foreground mt-1">Per 1K impressions</p>
          </div>
          <div className="bg-muted/30 rounded-lg p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Placement Capacity</p>
            <p className="text-2xl font-bold tabular-nums">{report.placementCapacity.low}–{report.placementCapacity.high}</p>
            <p className="text-xs text-muted-foreground mt-1">Placements / month</p>
          </div>
          <div className="bg-muted/30 rounded-lg p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Revenue / Viewer</p>
            <p className="text-2xl font-bold tabular-nums">{report.efficiencyRating}</p>
            <p className="text-xs text-muted-foreground mt-1">Efficiency index</p>
          </div>
        </div>

        {/* Insight Callouts */}
        <div className="grid lg:grid-cols-2 gap-4">
          {/* What Brands Are Paying For */}
          <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-lg p-5 border border-emerald-100 dark:border-emerald-900">
            <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider mb-3">
              What Brands Are Paying For
            </p>
            <ul className="space-y-2">
              {report.brandInsights.map((insight, i) => (
                <li key={i} className="text-sm flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-500 shrink-0">✓</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Revenue Left on Table */}
          <div className="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-5 border border-amber-100 dark:border-amber-900">
            <p className="text-xs font-semibold text-amber-800 dark:text-amber-400 uppercase tracking-wider mb-3">
              Where Revenue Is Being Left on the Table
            </p>
            <ul className="space-y-2">
              <li className="text-sm flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-500 shrink-0">→</span>
                <span>Placement frequency below capacity ceiling</span>
              </li>
              <li className="text-sm flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-500 shrink-0">→</span>
                <span>Premium brand categories under-penetrated</span>
              </li>
              <li className="text-sm flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-500 shrink-0">→</span>
                <span>{report.primaryConstraint}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Format Fit Table */}
        <div className="pt-4 border-t">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Sponsorship Format Fit</h3>
          <div className="bg-muted/30 rounded-lg overflow-hidden">
            {report.sponsorshipFormats.map((format, index) => (
              <div 
                key={format.format} 
                className={`flex items-center justify-between py-3 px-4 ${
                  index !== report.sponsorshipFormats.length - 1 ? 'border-b border-border/50' : ''
                }`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <span className="text-sm font-medium w-36">{format.format}</span>
                  <Badge variant={
                    format.fit === 'High' ? 'success' : 
                    format.fit === 'Medium' ? 'secondary' : 
                    'outline'
                  } className="text-xs w-20 justify-center">
                    {format.fit}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{format.notes}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
