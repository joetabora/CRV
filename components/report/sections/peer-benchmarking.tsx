import { Report } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PeerBenchmarkingProps {
  report: Report
}

function getPositionLabel(percentile: number): { label: string; variant: "success" | "secondary" | "outline" } {
  if (percentile >= 75) return { label: "Above Peers", variant: "success" }
  if (percentile >= 50) return { label: "At Peers", variant: "secondary" }
  return { label: "Below Peers", variant: "outline" }
}

function getOverallPosition(comparisons: Report['peerComparisons']): string {
  const avgPercentile = comparisons.reduce((sum, c) => sum + c.percentile, 0) / comparisons.length
  if (avgPercentile >= 75) return "a top-quartile performer"
  if (avgPercentile >= 50) return "an average performer"
  return "a developing performer"
}

export function PeerBenchmarking({ report }: PeerBenchmarkingProps) {
  const overallPosition = getOverallPosition(report.peerComparisons)
  const avgPercentile = Math.round(report.peerComparisons.reduce((sum, c) => sum + c.percentile, 0) / report.peerComparisons.length)

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">Peer Benchmarking</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Relative positioning within comparable creator cohort
        </p>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {/* Cohort Definition - Compact */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm bg-muted/30 rounded-lg p-4">
          <div>
            <span className="text-muted-foreground">Platform:</span>{" "}
            <span className="font-medium">{report.peerCohort.platform}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Viewership:</span>{" "}
            <span className="font-medium">{report.peerCohort.viewershipRange}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Content:</span>{" "}
            <span className="font-medium">{report.peerCohort.contentType}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Region:</span>{" "}
            <span className="font-medium">{report.peerCohort.geography}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Period:</span>{" "}
            <span className="font-medium">{report.peerCohort.dataSource}</span>
          </div>
        </div>

        {/* Positioning Statement */}
        <div className="bg-muted/50 rounded-lg p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Positioning</p>
              <p className="text-sm">
                This creator profiles as <span className="font-semibold">{overallPosition}</span> relative to peers.
              </p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold tabular-nums">{avgPercentile}<span className="text-lg">th</span></p>
              <p className="text-xs text-muted-foreground">Avg Percentile</p>
            </div>
          </div>
        </div>

        {/* Metric Comparisons - Table Style */}
        <div className="pt-4 border-t">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Key Metrics vs Peers</h3>
          
          <div className="bg-muted/30 rounded-lg overflow-hidden">
            {report.peerComparisons.map((comparison, index) => {
              const position = getPositionLabel(comparison.percentile)
              const vsMedian = ((comparison.creatorValue - comparison.peerMedian) / comparison.peerMedian * 100).toFixed(0)
              const isPositive = comparison.creatorValue >= comparison.peerMedian
              
              return (
                <div 
                  key={comparison.metric} 
                  className={`grid grid-cols-12 gap-4 items-center py-4 px-4 ${
                    index !== report.peerComparisons.length - 1 ? 'border-b border-border/50' : ''
                  }`}
                >
                  {/* Metric Name */}
                  <div className="col-span-3">
                    <p className="text-sm font-medium">{comparison.metric}</p>
                  </div>
                  
                  {/* Visual Bar */}
                  <div className="col-span-5">
                    <div className="relative h-2 bg-muted rounded-full">
                      {/* Peer Range */}
                      <div 
                        className="absolute h-full bg-muted-foreground/20 rounded-full"
                        style={{ 
                          left: `${(comparison.peerLower / comparison.peerUpper) * 100}%`,
                          width: `${((comparison.peerUpper - comparison.peerLower) / comparison.peerUpper) * 100}%`
                        }}
                      />
                      {/* Creator Position */}
                      <div 
                        className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white shadow-sm ${
                          comparison.percentile >= 75 ? 'bg-emerald-500' : 
                          comparison.percentile >= 50 ? 'bg-primary' : 
                          'bg-amber-500'
                        }`}
                        style={{ left: `${Math.min((comparison.creatorValue / comparison.peerUpper) * 100, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{comparison.peerLower}</span>
                      <span>{comparison.peerUpper}</span>
                    </div>
                  </div>
                  
                  {/* Creator Value */}
                  <div className="col-span-2 text-right">
                    <p className="text-sm font-semibold tabular-nums">{comparison.creatorValue}</p>
                    <p className={`text-xs tabular-nums ${isPositive ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {isPositive ? '+' : ''}{vsMedian}% vs median
                    </p>
                  </div>
                  
                  {/* Position Badge */}
                  <div className="col-span-2 text-right">
                    <Badge variant={position.variant} className="text-xs">
                      {comparison.percentile}th pctl
                    </Badge>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Summary */}
        <div className="pt-4 border-t">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Summary</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {report.positioningSummary}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
