import { Report } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

interface MethodologyAppendixProps {
  report: Report
}

const signalCategories = [
  { name: "Engagement", weight: "30%" },
  { name: "Retention", weight: "25%" },
  { name: "Monetization", weight: "25%" },
  { name: "Stability/Risk", weight: "20%" },
]

export function MethodologyAppendix({ report }: MethodologyAppendixProps) {
  return (
    <Card className="bg-muted/20 border-muted print-avoid-break">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-base text-muted-foreground font-medium">Methodology</CardTitle>
          <Badge variant="outline" className="text-[10px] font-normal px-1.5 py-0">Appendix</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Data Quality */}
        <div className="flex flex-wrap gap-3 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">Confidence:</span>
            <Badge variant={
              report.confidenceLevel === 'High' ? 'success' :
              report.confidenceLevel === 'Moderate-High' ? 'secondary' :
              'outline'
            } className="text-[10px] px-1.5 py-0">{report.confidenceLevel}</Badge>
          </div>
          <span className="text-muted-foreground">
            Data: <span className="text-foreground">{report.dataCompleteness}%</span> complete
          </span>
          <span className="text-muted-foreground">
            Updated: <span className="text-foreground">{format(report.lastDataUpdate, 'MMM d, yyyy')}</span>
          </span>
        </div>

        {/* Signal Weights */}
        <div className="flex gap-2 pt-2 border-t border-border/50">
          <span className="text-[10px] text-muted-foreground shrink-0">AQV™ Weights:</span>
          <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[11px]">
            {signalCategories.map((cat) => (
              <span key={cat.name}>
                <span className="text-muted-foreground">{cat.name}</span>{" "}
                <span className="font-medium tabular-nums">{cat.weight}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Process + Sources */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/50 text-[11px]">
          <div>
            <p className="text-[10px] text-muted-foreground mb-1">Process</p>
            <p className="text-muted-foreground">API collection → Peer normalization → Percentile ranking → Weighted composite</p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground mb-1">Sources</p>
            <p className="text-muted-foreground">Twitch API · Third-party analytics · Industry benchmarks</p>
          </div>
        </div>

        {/* Limitations */}
        <div className="pt-2 border-t border-border/50">
          <p className="text-[10px] text-muted-foreground">
            Limitations: Historical data · Approximate peer matching · Variable data completeness · Qualitative factors excluded
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
