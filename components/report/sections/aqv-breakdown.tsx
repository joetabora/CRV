import { Report } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface AQVBreakdownProps {
  report: Report
}

function getScoreColor(score: number): string {
  if (score >= 80) return "text-emerald-600"
  if (score >= 60) return "text-foreground"
  return "text-amber-600"
}

function getScoreLabel(score: number): { label: string; variant: "success" | "secondary" | "outline" } {
  if (score >= 80) return { label: "Strong", variant: "success" }
  if (score >= 60) return { label: "Average", variant: "secondary" }
  return { label: "Below Avg", variant: "outline" }
}

export function AQVBreakdown({ report }: AQVBreakdownProps) {
  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">AQV™ Component Breakdown</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Weighted composite of audience quality signals
          </p>
        </div>
        <div className="text-right">
          <div className="text-5xl font-bold tabular-nums">{report.aqvScore}</div>
          <p className="text-xs text-muted-foreground mt-1">Composite Score</p>
        </div>
      </div>

      {/* Why This Matters Callout */}
      <Card className="bg-muted/50 border-none">
        <CardContent className="pt-4 pb-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Why This Matters</p>
          <p className="text-sm">
            AQV™ quantifies creator value for brand partnerships by measuring what sponsors actually pay for: 
            engaged audiences, consistent viewership, monetization efficiency, and brand safety. 
            Use this score as the primary filter for partnership decisions.
          </p>
        </CardContent>
      </Card>

      {/* Component Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {report.aqvComponents.map((component) => {
          const scoreInfo = getScoreLabel(component.score)
          return (
            <Card key={component.name}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-medium">{component.name}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">Weight: {component.weight}%</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-3xl font-bold tabular-nums ${getScoreColor(component.score)}`}>
                      {component.score}
                    </span>
                    <div className="mt-1">
                      <Badge variant={scoreInfo.variant} className="text-xs">{scoreInfo.label}</Badge>
                    </div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-3">
                  <div 
                    className={`h-full rounded-full transition-all ${
                      component.score >= 80 ? 'bg-emerald-500' : 
                      component.score >= 60 ? 'bg-primary' : 
                      'bg-amber-500'
                    }`}
                    style={{ width: `${component.score}%` }}
                  />
                </div>
                
                <p className="text-sm text-muted-foreground">{component.interpretation}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Separator />

      {/* Weighted Contribution Table */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Score Contribution</h3>
        <div className="space-y-2">
          {report.aqvComponents.map((component) => {
            const contribution = (component.score * component.weight / 100).toFixed(1)
            return (
              <div key={component.name} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium w-44">{component.name}</span>
                  <span className="text-sm text-muted-foreground">{component.score} × {component.weight}%</span>
                </div>
                <span className="text-sm font-medium tabular-nums">+{contribution}</span>
              </div>
            )
          })}
          <div className="flex items-center justify-between pt-3 border-t">
            <span className="text-sm font-semibold">Total AQV™ Score</span>
            <span className="text-lg font-bold tabular-nums">{report.aqvScore}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
