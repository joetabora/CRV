import { Report } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
    <Card className="bg-muted/20 border-muted">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg text-muted-foreground">Methodology</CardTitle>
          <Badge variant="outline" className="text-xs font-normal">Appendix</Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          AQV™ scoring framework and data sources
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Data Quality */}
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Confidence:</span>
            <Badge variant={
              report.confidenceLevel === 'High' ? 'success' :
              report.confidenceLevel === 'Moderate-High' ? 'secondary' :
              'outline'
            } className="text-xs">{report.confidenceLevel}</Badge>
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

        {/* AQV Framework */}
        <div className="pt-4 border-t border-border/50">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">AQV™ Signal Weights</h3>
          <div className="grid grid-cols-2 gap-2">
            {signalCategories.map((category) => (
              <div key={category.name} className="flex items-start justify-between p-2 bg-background/50 rounded text-xs">
                <div>
                  <p className="font-medium">{category.name}</p>
                  <p className="text-muted-foreground">{category.metrics}</p>
                </div>
                <span className="font-semibold tabular-nums shrink-0 ml-2">{category.weight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scoring Process & Data Sources */}
        <div className="grid lg:grid-cols-2 gap-6 pt-4 border-t border-border/50">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Scoring Process</h3>
            <ol className="space-y-1 text-xs text-muted-foreground">
              <li className="flex gap-2">
                <span>1.</span>
                <span>Raw metrics collected via platform APIs</span>
              </li>
              <li className="flex gap-2">
                <span>2.</span>
                <span>Normalized against peer cohort distribution</span>
              </li>
              <li className="flex gap-2">
                <span>3.</span>
                <span>Percentile ranking calculated per signal</span>
              </li>
              <li className="flex gap-2">
                <span>4.</span>
                <span>Weighted composite produces AQV score</span>
              </li>
            </ol>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Data Sources</h3>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li className="flex gap-2">
                <span>·</span>
                <span>Twitch API (public metrics)</span>
              </li>
              <li className="flex gap-2">
                <span>·</span>
                <span>Third-party analytics providers</span>
              </li>
              <li className="flex gap-2">
                <span>·</span>
                <span>Industry benchmark databases</span>
              </li>
              <li className="flex gap-2">
                <span>·</span>
                <span>Historical sponsorship data</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Limitations */}
        <div className="pt-4 border-t border-border/50">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Limitations</h3>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {limitations.map((limitation, i) => (
              <span key={i} className="text-xs text-muted-foreground">· {limitation}</span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-muted-foreground text-center pt-4 border-t border-border/50">
          AQV™ is a proprietary methodology · support@crv.io
        </p>
      </CardContent>
    </Card>
  )
}
