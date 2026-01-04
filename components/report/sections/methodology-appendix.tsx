import { Report } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Info, AlertTriangle } from "lucide-react"

interface MethodologyAppendixProps {
  report: Report
}

export function MethodologyAppendix({ report }: MethodologyAppendixProps) {
  const signalCategories = [
    {
      name: "Engagement",
      weight: "30%",
      description: "Measures chat activity, viewer participation, and interaction rates. Includes metrics such as messages per viewer, emote usage, and active participation in polls or events."
    },
    {
      name: "Retention",
      weight: "25%",
      description: "Evaluates average watch time, return viewer frequency, and audience loyalty. Tracks how long viewers stay engaged and how often they return to the creator's content."
    },
    {
      name: "Monetization Efficiency",
      weight: "25%",
      description: "Assesses revenue per viewer and CPM performance relative to audience size. Measures how effectively a creator monetizes their audience through sponsorships and partnerships."
    },
    {
      name: "Stability/Risk",
      weight: "20%",
      description: "Combines streaming consistency, content safety, and audience stability. Evaluates brand risk through content moderation, schedule reliability, and audience behavior patterns."
    }
  ]

  const limitations = [
    "AQV scores are based on historical data and may not predict future performance. Market conditions, platform changes, and creator decisions can impact scores over time.",
    "Peer cohort definitions may not capture all relevant factors. Creators with unique content styles or emerging categories may not have perfect peer matches.",
    "Data quality and completeness vary by platform and creator. Missing or incomplete data may affect score accuracy, and confidence levels are provided to indicate data reliability.",
    "AQV is one tool for evaluating creator value and should be used alongside qualitative factors, brand fit, and strategic considerations when making partnership decisions."
  ]

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight">AQV™ Methodology & Data Sources</h2>
        <p className="text-muted-foreground mt-1">
          Technical documentation on scoring methodology and data sources
        </p>
      </div>

      {/* Confidence Badge */}
      <div className="flex items-center gap-4 mb-8 p-4 bg-muted/50 rounded-lg">
        <div>
          <p className="text-sm font-medium">Report Confidence</p>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant={
              report.confidenceLevel === 'High' ? 'success' :
              report.confidenceLevel === 'Moderate-High' ? 'secondary' :
              'outline'
            }>
              {report.confidenceLevel}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {report.dataCompleteness}% data completeness
            </span>
          </div>
        </div>
        <div className="ml-auto text-right">
          <p className="text-sm font-medium">Last Data Update</p>
          <p className="text-sm text-muted-foreground">{format(report.lastDataUpdate, 'MMM d, yyyy')}</p>
        </div>
      </div>

      {/* AQV Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Info className="h-4 w-4" />
            AQV Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">
            The Audience Quality Value (AQV) score is a composite metric designed to assess creator value for brand partnerships. 
            AQV combines multiple signal categories—engagement, retention, monetization efficiency, and stability/risk—into a single 
            normalized score ranging from 0 to 100. The score reflects a creator's ability to deliver value to brand partners through 
            audience quality, content consistency, and brand safety. AQV is calculated using a weighted algorithm that accounts for 
            industry benchmarks and peer comparisons, providing a standardized measure of creator performance relative to their cohort.
          </p>
        </CardContent>
      </Card>

      {/* Signal Categories */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-base">Signal Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead className="text-center">Weight</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {signalCategories.map((category) => (
                <TableRow key={category.name}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="text-center">{category.weight}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{category.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Scoring & Normalization */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-base">Scoring & Normalization</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Each signal category is scored on a 0-100 scale using percentile ranking relative to the creator's peer cohort. 
            Raw metrics are normalized to account for platform differences, content type variations, and audience size effects. 
            The weighted combination of normalized scores produces the final AQV score. Normalization ensures that creators 
            across different platforms, genres, and audience sizes can be fairly compared. The scoring algorithm uses industry 
            benchmarks and historical data to establish percentile thresholds, ensuring scores reflect meaningful performance 
            differences rather than statistical noise.
          </p>
        </CardContent>
      </Card>

      {/* Peer Benchmarking Method */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-base">Peer Benchmarking Method</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Peer cohorts are defined by platform, viewership range, content type, and geography. Creators are matched to cohorts 
            based on their primary characteristics, ensuring fair comparison within similar contexts. Benchmarking uses 60-day 
            rolling averages to smooth out short-term fluctuations while capturing recent performance trends. Percentile rankings 
            are calculated relative to the defined peer group, with quartiles (25th, 50th, 75th percentiles) used to contextualize 
            performance. The peer benchmarking method ensures that AQV scores reflect relative performance within a creator's 
            competitive set, rather than absolute metrics that may be influenced by factors outside the creator's control.
          </p>
        </CardContent>
      </Card>

      {/* Limitations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Limitations & Safeguards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {limitations.map((limitation, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-muted-foreground/50 mt-0.5">•</span>
                <span>{limitation}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Data Sources Footer */}
      <div className="mt-8 p-4 bg-muted/30 rounded-lg">
        <p className="text-xs text-muted-foreground text-center">
          Data Sources: Twitch API, creator-provided metrics, industry benchmarks. 
          Last updated: {format(report.lastDataUpdate, 'MMMM d, yyyy')}. 
          For questions about methodology, contact support@crv.io
        </p>
      </div>
    </div>
  )
}

