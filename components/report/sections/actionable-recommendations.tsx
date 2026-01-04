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
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">Actionable Recommendations</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Priority actions to optimize creator value
        </p>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {/* Primary Recommendation */}
        {primaryRec && (
          <div className="bg-primary/5 border-l-4 border-l-primary rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <Badge className="bg-primary text-primary-foreground">Primary Recommendation</Badge>
            </div>
            
            <h3 className="text-lg font-semibold mb-4">{primaryRec.title}</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Action Required</p>
                <p className="text-sm">{primaryRec.action}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Expected Impact</p>
                <p className="text-sm">{primaryRec.expectedImpact}</p>
              </div>
            </div>
          </div>
        )}

        {/* Secondary Optimizations */}
        <div className="pt-4 border-t">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Secondary Optimizations</h3>
          
          <div className="bg-muted/30 rounded-lg overflow-hidden">
            {secondaryRecs.map((rec, index) => (
              <div 
                key={rec.id} 
                className={`p-4 ${index !== secondaryRecs.length - 1 ? 'border-b border-border/50' : ''}`}
              >
                <div className="grid md:grid-cols-12 gap-4">
                  {/* Index */}
                  <div className="md:col-span-1 flex items-start">
                    <span className="text-sm font-semibold text-muted-foreground">{index + 1}.</span>
                  </div>
                  
                  {/* Signal */}
                  <div className="md:col-span-3">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Signal</p>
                    <p className="text-sm">{rec.signal}</p>
                  </div>
                  
                  {/* Action */}
                  <div className="md:col-span-4">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Action</p>
                    <p className="text-sm font-medium">{rec.action}</p>
                  </div>
                  
                  {/* Impact */}
                  <div className="md:col-span-4">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Expected Impact</p>
                    <p className="text-sm">{rec.expectedImpact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Implementation Roadmap */}
        <div className="grid lg:grid-cols-2 gap-8 pt-4 border-t">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Activation Sequence</h3>
            <div className="space-y-3">
              {report.monetizationSteps.map((step, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-xs font-medium">{index + 1}</span>
                  </div>
                  <p className="text-sm pt-0.5">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Measurement Framework</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Key Metrics</p>
                <div className="flex flex-wrap gap-2">
                  {report.measurementMetrics.slice(0, 6).map((metric, index) => (
                    <Badge key={index} variant="outline" className="font-normal">{metric}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Review Cadence</p>
                <p className="text-sm">{report.reviewCadence}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
