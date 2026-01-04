import { Report } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"

interface MethodologyAppendixProps {
  report: Report
}

const signalCategories = [
  { name: "Engagement", weight: "30%", metrics: "Chat activity, viewer participation, poll engagement" },
  { name: "Retention", weight: "25%", metrics: "Avg watch time, return viewer rate, session depth" },
  { name: "Monetization Efficiency", weight: "25%", metrics: "Revenue per viewer, CPM performance, placement success" },
  { name: "Stability/Risk", weight: "20%", metrics: "Schedule consistency, content safety, audience volatility" },
]

const limitations = [
  "Historical data may not predict future performance",
  "Peer cohort matching is approximate",
  "Data completeness varies by platform",
  "Qualitative factors not fully captured",
]

export function MethodologyAppendix({ report }: MethodologyAppendixProps) {
  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Methodology</h2>
        <p className="text-sm text-muted-foreground mt-1">
          AQV™ scoring framework and data sources
        </p>
      </div>

      {/* Data Quality */}
      <div className="flex flex-wrap gap-6 text-sm">
        <div>
          <span className="text-muted-foreground">Confidence:</span>{" "}
          <Badge variant={
            report.confidenceLevel === 'High' ? 'success' :
            report.confidenceLevel === 'Moderate-High' ? 'secondary' :
            'outline'
          }>{report.confidenceLevel}</Badge>
        </div>
        <div>
          <span className="text-muted-foreground">Data Completeness:</span>{" "}
          <span className="font-medium">{report.dataCompleteness}%</span>
        </div>
        <div>
          <span className="text-muted-foreground">Last Updated:</span>{" "}
          <span className="font-medium">{format(report.lastDataUpdate, 'MMM d, yyyy')}</span>
        </div>
      </div>

      <Separator />

      {/* AQV Framework */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">AQV™ Signal Weights</h3>
        <div className="grid md:grid-cols-2 gap-3">
          {signalCategories.map((category) => (
            <div key={category.name} className="flex items-start justify-between p-3 border rounded-lg">
              <div>
                <p className="text-sm font-medium">{category.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{category.metrics}</p>
              </div>
              <span className="text-sm font-semibold tabular-nums">{category.weight}</span>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Scoring Process */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Scoring Process</h3>
          <ol className="space-y-2 text-sm">
            <li className="flex gap-3">
              <span className="text-muted-foreground">1.</span>
              <span>Raw metrics collected via platform APIs</span>
            </li>
            <li className="flex gap-3">
              <span className="text-muted-foreground">2.</span>
              <span>Normalized against peer cohort distribution</span>
            </li>
            <li className="flex gap-3">
              <span className="text-muted-foreground">3.</span>
              <span>Percentile ranking calculated per signal</span>
            </li>
            <li className="flex gap-3">
              <span className="text-muted-foreground">4.</span>
              <span>Weighted composite produces AQV score</span>
            </li>
          </ol>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Data Sources</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-3">
              <span className="text-muted-foreground">·</span>
              <span>Twitch API (public metrics)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-muted-foreground">·</span>
              <span>Third-party analytics providers</span>
            </li>
            <li className="flex gap-3">
              <span className="text-muted-foreground">·</span>
              <span>Industry benchmark databases</span>
            </li>
            <li className="flex gap-3">
              <span className="text-muted-foreground">·</span>
              <span>Historical sponsorship data</span>
            </li>
          </ul>
        </div>
      </div>

      <Separator />

      {/* Limitations */}
      <Card className="bg-muted/30 border-none">
        <CardContent className="pt-4 pb-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Limitations</h3>
          <ul className="grid md:grid-cols-2 gap-x-8 gap-y-1">
            {limitations.map((limitation, i) => (
              <li key={i} className="text-sm text-muted-foreground flex gap-2">
                <span>·</span>
                <span>{limitation}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Footer */}
      <p className="text-xs text-muted-foreground text-center pt-4">
        AQV™ is a proprietary methodology. Contact support@crv.io for methodology questions.
      </p>
    </div>
  )
}
