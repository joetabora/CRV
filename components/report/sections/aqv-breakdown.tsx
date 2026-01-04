import { Report } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface AQVBreakdownProps {
  report: Report
}

export function AQVBreakdown({ report }: AQVBreakdownProps) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight">AQV™ Component Breakdown</h2>
        <p className="text-muted-foreground mt-1">
          Detailed analysis of the Audience Quality Value score components
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Total Score */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Total AQV Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold text-center py-4">{report.aqvScore}</div>
            <p className="text-sm text-muted-foreground text-center">Out of 100</p>
            <p className="text-sm text-center mt-4">
              Strong overall performance across all components with particular strength in engagement.
            </p>
          </CardContent>
        </Card>

        {/* Radar Chart Placeholder */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Component Performance</CardTitle>
            <CardDescription>Visual breakdown by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted/50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="grid grid-cols-2 gap-4 p-4">
                  {report.aqvComponents.map((component) => (
                    <div key={component.name} className="text-left">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{component.name}</span>
                        <span className="text-sm font-bold">{component.score}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${component.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Chart visualization placeholder
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Component Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Component Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Component</TableHead>
                <TableHead className="text-center">Score</TableHead>
                <TableHead className="text-center">Weight</TableHead>
                <TableHead>Interpretation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {report.aqvComponents.map((component) => (
                <TableRow key={component.name}>
                  <TableCell className="font-medium">{component.name}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={
                      component.score >= 80 ? 'success' : 
                      component.score >= 60 ? 'secondary' : 
                      'outline'
                    }>
                      {component.score}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center text-muted-foreground">
                    {component.weight}%
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {component.interpretation}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

