import { Report } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">AQV™ Component Breakdown</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Weighted composite of audience quality signals
            </p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold tabular-nums tracking-tight">{report.aqvScore}</div>
            <p className="text-xs text-muted-foreground mt-1">Composite Score</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {/* Why This Matters */}
        <div className="bg-muted/50 rounded-lg p-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Why This Matters</p>
          <p className="text-sm">
            AQV™ quantifies creator value for brand partnerships by measuring what sponsors actually pay for: 
            engaged audiences, consistent viewership, monetization efficiency, and brand safety. 
            Use this score as the primary filter for partnership decisions.
          </p>
        </div>

        {/* Component Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {report.aqvComponents.map((component) => {
            const scoreInfo = getScoreLabel(component.score)
            return (
              <div key={component.name} className="bg-muted/30 rounded-lg p-5">
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
                <div className="h-2 bg-muted rounded-full overflow-hidden mb-3">
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
              </div>
            )
          })}
        </div>

        {/* Weighted Contribution Table */}
        <div className="pt-4 border-t">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Score Contribution</h3>
          <div className="bg-muted/30 rounded-lg overflow-hidden">
            {report.aqvComponents.map((component, index) => {
              const contribution = (component.score * component.weight / 100).toFixed(1)
              return (
                <div 
                  key={component.name} 
                  className={`flex items-center justify-between py-3 px-4 ${
                    index !== report.aqvComponents.length - 1 ? 'border-b border-border/50' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium w-44">{component.name}</span>
                    <span className="text-sm text-muted-foreground">{component.score} × {component.weight}%</span>
                  </div>
                  <span className="text-sm font-medium tabular-nums">+{contribution}</span>
                </div>
              )
            })}
            <div className="flex items-center justify-between py-3 px-4 bg-muted/50 border-t">
              <span className="text-sm font-semibold">Total AQV™ Score</span>
              <span className="text-lg font-bold tabular-nums">{report.aqvScore}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
