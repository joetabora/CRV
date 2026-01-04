import { Report } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Lightbulb, ArrowRight, CheckCircle2, BarChart } from "lucide-react"

interface ActionableRecommendationsProps {
  report: Report
}

export function ActionableRecommendations({ report }: ActionableRecommendationsProps) {
  const primaryRec = report.recommendations.find(r => r.priority === 'primary')
  const secondaryRecs = report.recommendations.filter(r => r.priority === 'secondary')

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Actionable Recommendations</h2>
        <p className="text-muted-foreground mt-1">
          Strategic guidance for optimizing creator value
        </p>
      </div>

      {/* Primary Recommendation */}
      {primaryRec && (
        <Card className="mb-8 border-primary/50 bg-primary/5">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-primary text-primary-foreground">PRIORITY</Badge>
            </div>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5" />
              {primaryRec.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">What to Do</h4>
              <p className="text-sm">{primaryRec.action}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Expected Impact</h4>
              <p className="text-sm">{primaryRec.expectedImpact}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Secondary Recommendations */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Secondary Optimization Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {secondaryRecs.map((rec) => (
              <div key={rec.id} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                <ArrowRight className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                <div className="space-y-2 flex-1">
                  <h4 className="text-sm font-medium">{rec.title}</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Signal: </span>
                      <span>{rec.signal}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Action: </span>
                      <span>{rec.action}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Impact: </span>
                      <span>{rec.expectedImpact}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monetization Steps */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-base">Monetization Activation Steps</CardTitle>
          <CardDescription>Sequential steps to increase sponsorship value</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {report.monetizationSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground text-sm font-medium shrink-0">
                  {index + 1}
                </div>
                <p className="text-sm pt-1">{step}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Measurement Loop */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            Measurement & Review Loop
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Key Metrics to Track</h4>
            <div className="flex flex-wrap gap-2">
              {report.measurementMetrics.map((metric, index) => (
                <div key={index} className="flex items-center gap-1.5 text-sm bg-muted px-3 py-1.5 rounded-md">
                  <CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground" />
                  {metric}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Review Cadence</h4>
            <p className="text-sm">{report.reviewCadence}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

