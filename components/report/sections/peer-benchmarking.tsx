import { Report } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LockedSection } from "@/components/report/locked-section"
import { Users } from "lucide-react"

interface PeerBenchmarkingProps {
  report: Report
}

function getPositionVerdict(percentile: number): { verdict: string; description: string; variant: "success" | "secondary" | "outline" } {
  if (percentile >= 75) return { verdict: "Above Peers", description: "Outperforms comparable creators", variant: "success" }
  if (percentile >= 50) return { verdict: "At Peers", description: "Performs at cohort median", variant: "secondary" }
  return { verdict: "Below Peers", description: "Room for improvement vs cohort", variant: "outline" }
}

export function PeerBenchmarking({ report }: PeerBenchmarkingProps) {
  // Gate for Pro users only
  if (report.accessLevel === 'free') {
    return (
      <LockedSection
        title="Peer Benchmarking"
        description="Compare this creator against a curated cohort of similar creators. See percentile rankings, metric differentials, and positioning analysis."
        icon={<Users className="h-6 w-6 text-muted-foreground" />}
      />
    )
  }

  const avgPercentile = Math.round(report.peerComparisons.reduce((sum, c) => sum + c.percentile, 0) / report.peerComparisons.length)
  const verdict = getPositionVerdict(avgPercentile)

  return (
    <Card className="print-avoid-break">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Peer Benchmarking</CardTitle>
        <p className="text-xs text-muted-foreground">Position within comparable cohort</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* POSITIONING VERDICT - Primary Takeaway */}
        <div className="bg-muted/50 rounded-lg p-5 text-center">
          <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-3">Positioning Verdict</p>
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-5xl font-bold tabular-nums tracking-tight">{avgPercentile}<span className="text-xl">th</span></span>
            <Badge variant={verdict.variant} className="text-xs">{verdict.verdict}</Badge>
          </div>
          <p className="text-xs text-muted-foreground">{verdict.description}</p>
        </div>

        {/* Cohort Definition - Compact */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
          <span><span className="font-medium text-foreground">{report.peerCohort.platform}</span> · {report.peerCohort.viewershipRange}</span>
          <span>{report.peerCohort.contentType} · {report.peerCohort.geography}</span>
          <span>{report.peerCohort.dataSource}</span>
        </div>

        {/* Metric Comparisons - De-emphasized */}
        <div className="pt-4 border-t print-avoid-break">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Metrics vs Peers</p>
          
          <div className="space-y-3">
            {report.peerComparisons.map((comparison) => {
              const vsMedian = ((comparison.creatorValue - comparison.peerMedian) / comparison.peerMedian * 100).toFixed(0)
              const isPositive = comparison.creatorValue >= comparison.peerMedian
              
              return (
                <div key={comparison.metric} className="flex items-center gap-3">
                  {/* Metric */}
                  <span className="text-xs font-medium w-28 shrink-0">{comparison.metric}</span>
                  
                  {/* Bar */}
                  <div className="flex-1 relative h-2 bg-muted rounded-full">
                    <div 
                      className="absolute h-full bg-muted-foreground/20 rounded-full"
                      style={{ 
                        left: `${(comparison.peerLower / comparison.peerUpper) * 100}%`,
                        width: `${((comparison.peerUpper - comparison.peerLower) / comparison.peerUpper) * 100}%`
                      }}
                    />
                    <div 
                      className={`absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 border-white shadow-sm ${
                        comparison.percentile >= 75 ? 'bg-emerald-500' : 
                        comparison.percentile >= 50 ? 'bg-primary' : 
                        'bg-amber-500'
                      }`}
                      style={{ left: `${Math.min((comparison.creatorValue / comparison.peerUpper) * 100, 98)}%` }}
                    />
                  </div>
                  
                  {/* Values */}
                  <div className="text-right w-20 shrink-0">
                    <span className="text-xs font-semibold tabular-nums">{comparison.creatorValue}</span>
                    <span className={`text-[10px] tabular-nums ml-1 ${isPositive ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {isPositive ? '+' : ''}{vsMedian}%
                    </span>
                  </div>
                  
                  {/* Percentile */}
                  <Badge variant={comparison.percentile >= 75 ? 'success' : comparison.percentile >= 50 ? 'secondary' : 'outline'} className="text-[10px] px-1.5 py-0 w-14 justify-center shrink-0">
                    {comparison.percentile}th
                  </Badge>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
