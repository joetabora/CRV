import { Report } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface PeerBenchmarkingProps {
  report: Report
}

export function PeerBenchmarking({ report }: PeerBenchmarkingProps) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Peer Benchmarking & Relative Positioning</h2>
        <p className="text-muted-foreground mt-1">
          Performance comparison against similar creators in the cohort
        </p>
      </div>

      {/* Cohort Definition */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-base">Peer Cohort Definition</CardTitle>
          <CardDescription>Comparison group criteria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Platform</p>
              <p className="text-sm font-medium">{report.peerCohort.platform}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Viewership</p>
              <p className="text-sm font-medium">{report.peerCohort.viewershipRange}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Content</p>
              <p className="text-sm font-medium">{report.peerCohort.contentType}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Geography</p>
              <p className="text-sm font-medium">{report.peerCohort.geography}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Data</p>
              <p className="text-sm font-medium">{report.peerCohort.dataSource}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-base">AQV Score Comparison</CardTitle>
          <CardDescription>Creator position relative to peer quartiles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {report.peerComparisons.map((comparison) => (
              <div key={comparison.metric} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{comparison.metric}</span>
                  <span className="text-sm">
                    <Badge variant="outline">{comparison.percentile}th percentile</Badge>
                  </span>
                </div>
                <div className="relative h-8 bg-muted rounded-md overflow-hidden">
                  {/* Quartile ranges */}
                  <div 
                    className="absolute h-full bg-muted-foreground/10"
                    style={{ 
                      left: `${(comparison.peerLower / comparison.peerUpper) * 100 * 0.8}%`,
                      right: `${100 - 80}%`
                    }}
                  />
                  {/* Median marker */}
                  <div 
                    className="absolute top-0 h-full w-0.5 bg-muted-foreground/40"
                    style={{ left: `${(comparison.peerMedian / comparison.peerUpper) * 100 * 0.8}%` }}
                  />
                  {/* Creator marker */}
                  <div 
                    className="absolute top-1 h-6 w-1.5 bg-primary rounded-sm"
                    style={{ left: `${(comparison.creatorValue / comparison.peerUpper) * 100 * 0.8}%` }}
                  />
                  {/* Labels */}
                  <div className="absolute inset-0 flex items-center justify-between px-2 text-xs">
                    <span className="text-muted-foreground">{comparison.peerLower}</span>
                    <span className="font-medium text-primary">{comparison.creatorValue}</span>
                    <span className="text-muted-foreground">{comparison.peerUpper}</span>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Lower Quartile</span>
                  <span>Median: {comparison.peerMedian}</span>
                  <span>Upper Quartile</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-base">Key Metric Differentials</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead className="text-center">Creator</TableHead>
                <TableHead className="text-center">Peer Median</TableHead>
                <TableHead className="text-center">vs Median</TableHead>
                <TableHead className="text-center">Percentile</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {report.peerComparisons.map((comparison) => {
                const diff = ((comparison.creatorValue - comparison.peerMedian) / comparison.peerMedian * 100).toFixed(0)
                const isPositive = comparison.creatorValue > comparison.peerMedian
                return (
                  <TableRow key={comparison.metric}>
                    <TableCell className="font-medium">{comparison.metric}</TableCell>
                    <TableCell className="text-center font-medium">{comparison.creatorValue}</TableCell>
                    <TableCell className="text-center text-muted-foreground">{comparison.peerMedian}</TableCell>
                    <TableCell className="text-center">
                      <span className={isPositive ? 'text-emerald-600' : 'text-red-600'}>
                        {isPositive ? '+' : ''}{diff}%
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={comparison.percentile >= 75 ? 'success' : comparison.percentile >= 50 ? 'secondary' : 'outline'}>
                        {comparison.percentile}th
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Positioning Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Positioning Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">{report.positioningSummary}</p>
        </CardContent>
      </Card>
    </div>
  )
}

