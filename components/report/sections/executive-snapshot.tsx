import { Report } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import { TrendingUp, Users, DollarSign, Shield, Target, AlertCircle } from "lucide-react"

interface ExecutiveSnapshotProps {
  report: Report
}

export function ExecutiveSnapshot({ report }: ExecutiveSnapshotProps) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Executive Snapshot</h2>
        <p className="text-muted-foreground mt-1">
          {report.creator.name} • {report.creator.handle} • {report.creator.category}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              AQV™ Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{report.aqvScore}</div>
            <p className="text-xs text-muted-foreground mt-1">Out of 100</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="h-4 w-4" />
              Audience Tier
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{report.audienceTier}</div>
            <p className="text-xs text-muted-foreground mt-1">Engaged mid-core</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Sponsorship Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatCurrency(report.sponsorshipValue)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Est. monthly
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Brand Risk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">{report.brandRisk}</span>
              <Badge variant={report.brandRisk === 'Low' ? 'success' : report.brandRisk === 'Medium' ? 'warning' : 'destructive'}>
                {report.brandRiskScore}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Clean content</p>
          </CardContent>
        </Card>
      </div>

      {/* Insights Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="h-4 w-4" />
              What Brands Are Buying
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {report.brandInsights.map((insight, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-muted-foreground">•</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Monetization & Constraints</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Primary Upside</h4>
              <p className="text-sm">{report.primaryUpside}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                Primary Constraint
              </h4>
              <p className="text-sm">{report.primaryConstraint}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

