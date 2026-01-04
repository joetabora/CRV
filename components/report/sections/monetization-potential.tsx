import { Report } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import { DollarSign, TrendingUp, BarChart3 } from "lucide-react"

interface MonetizationPotentialProps {
  report: Report
}

export function MonetizationPotential({ report }: MonetizationPotentialProps) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Monetization & Revenue Potential</h2>
        <p className="text-muted-foreground mt-1">
          Estimated sponsorship value and monetization efficiency metrics
        </p>
      </div>

      {/* Value and Chart */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Est. Monthly Sponsorship Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-4">
              {formatCurrency(report.sponsorshipValue)}
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Based on 60-day average audience metrics</li>
              <li>• Reflects blended CPM across sponsor categories</li>
              <li>• Assumes {report.placementCapacity.low}-{report.placementCapacity.high} placements per month</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Estimated Range
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Low</span>
                  <span className="font-medium">{formatCurrency(report.sponsorshipValueLow)}</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-muted-foreground/30 rounded-full" style={{ width: '50%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">High</span>
                  <span className="font-medium">{formatCurrency(report.sponsorshipValueHigh)}</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Range based on market conditions and brand fit
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Efficiency Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">CPM Range</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${report.cpmRange.low}–{report.cpmRange.high}</div>
            <p className="text-xs text-muted-foreground mt-1">Per 1,000 impressions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Placement Capacity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{report.placementCapacity.low}–{report.placementCapacity.high}</div>
            <p className="text-xs text-muted-foreground mt-1">Placements per month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Efficiency Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{report.efficiencyRating}</div>
            <p className="text-xs text-muted-foreground mt-1">Revenue per viewer</p>
          </CardContent>
        </Card>
      </div>

      {/* Format Fit Table */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-base">Sponsorship Format Fit</CardTitle>
          <CardDescription>Recommended formats based on creator style and audience</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Format</TableHead>
                <TableHead className="text-center">Fit</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {report.sponsorshipFormats.map((format) => (
                <TableRow key={format.format}>
                  <TableCell className="font-medium">{format.format}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={
                      format.fit === 'High' ? 'success' : 
                      format.fit === 'Medium' ? 'secondary' : 
                      'outline'
                    }>
                      {format.fit}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{format.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Upside Scenarios */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Upside Scenarios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {report.upsideScenarios.map((scenario, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-muted-foreground">•</span>
                <span>{scenario}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

