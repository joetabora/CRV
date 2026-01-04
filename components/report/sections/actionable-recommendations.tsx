import { Report } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ActionableRecommendationsProps {
  report: Report
}

export function ActionableRecommendations({ report }: ActionableRecommendationsProps) {
  const primaryRec = report.recommendations.find(r => r.priority === 'primary')
  const secondaryRecs = report.recommendations.filter(r => r.priority === 'secondary').slice(0, 3)

  return (
    <Card className="print-avoid-break">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Recommendations</CardTitle>
        <p className="text-xs text-muted-foreground">Priority actions</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Primary Recommendation */}
        {primaryRec && (
          <div className="bg-primary/5 border-l-4 border-l-primary rounded-lg p-4 print-avoid-break">
            <Badge className="bg-primary text-primary-foreground text-[10px] mb-2">Primary</Badge>
            <h3 className="font-semibold mb-3">{primaryRec.title}</h3>
            <div className="grid md:grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1">Action</p>
                <p>{primaryRec.action}</p>
              </div>
              <div>
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1">Impact</p>
                <p>{primaryRec.expectedImpact}</p>
              </div>
            </div>
          </div>
        )}

        {/* Secondary Optimizations */}
        <div className="pt-4 border-t print-avoid-break">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Secondary</p>
          <div className="bg-muted/30 rounded-lg overflow-hidden text-xs">
            {secondaryRecs.map((rec, index) => (
              <div 
                key={rec.id} 
                className={`grid grid-cols-12 gap-3 py-3 px-3 ${index !== secondaryRecs.length - 1 ? 'border-b border-border/50' : ''}`}
              >
                <div className="col-span-1">
                  <span className="font-semibold text-muted-foreground">{index + 1}.</span>
                </div>
                <div className="col-span-3">
                  <p className="text-[10px] text-muted-foreground mb-0.5">Signal</p>
                  <p>{rec.signal}</p>
                </div>
                <div className="col-span-4">
                  <p className="text-[10px] text-muted-foreground mb-0.5">Action</p>
                  <p className="font-medium">{rec.action}</p>
                </div>
                <div className="col-span-4">
                  <p className="text-[10px] text-muted-foreground mb-0.5">Impact</p>
                  <p>{rec.expectedImpact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Implementation */}
        <div className="grid lg:grid-cols-2 gap-6 pt-4 border-t print-avoid-break">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Activation Steps</p>
            <ol className="space-y-1.5 text-xs">
              {report.monetizationSteps.slice(0, 4).map((step, index) => (
                <li key={index} className="flex gap-2">
                  <span className="text-muted-foreground shrink-0">{index + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Track</p>
            <div className="flex flex-wrap gap-1.5">
              {report.measurementMetrics.slice(0, 5).map((metric, index) => (
                <Badge key={index} variant="outline" className="text-[10px] font-normal px-1.5 py-0">{metric}</Badge>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">{report.reviewCadence}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
