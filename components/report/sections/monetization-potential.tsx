import { Report } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface MonetizationPotentialProps {
  report: Report
}

function getEfficiencyStatus(rating: number): { label: string; variant: "success" | "warning" | "secondary" } {
  if (rating >= 80) return { label: "Efficient", variant: "success" }
  if (rating >= 60) return { label: "Under-Monetized", variant: "warning" }
  return { label: "Early Stage", variant: "secondary" }
}

export function MonetizationPotential({ report }: MonetizationPotentialProps) {
  const efficiencyStatus = getEfficiencyStatus(report.efficiencyRating)
  
  return (
    <Card className="print-avoid-break">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Monetization & Revenue</CardTitle>
        <p className="text-xs text-muted-foreground">Sponsorship capacity analysis</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Primary Values */}
        <div className="grid lg:grid-cols-2 gap-3">
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">Est. Monthly Value</p>
            <div className="flex items-baseline">
              <span className="text-sm text-muted-foreground">$</span>
              <span className="text-5xl font-bold tabular-nums tracking-tight">{(report.sponsorshipValue / 1000).toFixed(0)}K</span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">
              ${(report.sponsorshipValueLow / 1000).toFixed(0)}K conservative · ${(report.sponsorshipValueHigh / 1000).toFixed(0)}K optimistic
            </p>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">Efficiency Rating</p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold tabular-nums tracking-tight">{report.efficiencyRating}</span>
              <Badge variant={efficiencyStatus.variant} className="text-[10px] px-1.5 py-0">{efficiencyStatus.label}</Badge>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">Revenue optimization potential</p>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-3 gap-3 print-avoid-break">
          <div className="bg-muted/30 rounded-lg p-3">
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1">CPM Range</p>
            <p className="text-xl font-bold tabular-nums">${report.cpmRange.low}–{report.cpmRange.high}</p>
          </div>
          <div className="bg-muted/30 rounded-lg p-3">
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1">Placements/Mo</p>
            <p className="text-xl font-bold tabular-nums">{report.placementCapacity.low}–{report.placementCapacity.high}</p>
          </div>
          <div className="bg-muted/30 rounded-lg p-3">
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1">Rev/Viewer</p>
            <p className="text-xl font-bold tabular-nums">{report.efficiencyRating}</p>
          </div>
        </div>

        {/* Callouts */}
        <div className="grid lg:grid-cols-2 gap-3 print-avoid-break">
          <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-lg p-4 border border-emerald-100 dark:border-emerald-900">
            <p className="text-[10px] font-semibold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider mb-2">
              What Brands Pay For
            </p>
            <ul className="space-y-1">
              {report.brandInsights.map((insight, i) => (
                <li key={i} className="text-xs flex items-start gap-1.5">
                  <span className="text-emerald-600 dark:text-emerald-500 shrink-0">✓</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-4 border border-amber-100 dark:border-amber-900">
            <p className="text-[10px] font-semibold text-amber-800 dark:text-amber-400 uppercase tracking-wider mb-2">
              Revenue Left on Table
            </p>
            <ul className="space-y-1">
              <li className="text-xs flex items-start gap-1.5">
                <span className="text-amber-600 dark:text-amber-500 shrink-0">→</span>
                <span>Below placement capacity ceiling</span>
              </li>
              <li className="text-xs flex items-start gap-1.5">
                <span className="text-amber-600 dark:text-amber-500 shrink-0">→</span>
                <span>Premium categories under-penetrated</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Format Fit */}
        <div className="pt-4 border-t print-avoid-break">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Format Fit</p>
          <div className="bg-muted/30 rounded-lg overflow-hidden text-xs">
            {report.sponsorshipFormats.map((format, index) => (
              <div 
                key={format.format} 
                className={`flex items-center gap-3 py-2 px-3 ${
                  index !== report.sponsorshipFormats.length - 1 ? 'border-b border-border/50' : ''
                }`}
              >
                <span className="font-medium w-32">{format.format}</span>
                <Badge variant={
                  format.fit === 'High' ? 'success' : 
                  format.fit === 'Medium' ? 'secondary' : 
                  'outline'
                } className="text-[10px] px-1.5 py-0 w-16 justify-center">
                  {format.fit}
                </Badge>
                <span className="text-muted-foreground">{format.notes}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
