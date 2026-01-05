import { Report, PlatformContribution } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getPlatformDisplayName, getPlatformColor } from "@/core/aqvAggregate"

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

function getDominantPlatform(contributions: PlatformContribution[]): PlatformContribution | null {
  if (contributions.length === 0) return null
  return contributions.reduce((max, c) => c.contributionPercent > max.contributionPercent ? c : max)
}

interface PlatformContributionBarProps {
  contributions: PlatformContribution[]
}

function PlatformContributionBar({ contributions }: PlatformContributionBarProps) {
  if (contributions.length === 0) return null
  
  const dominant = getDominantPlatform(contributions)
  
  return (
    <div className="pt-4 border-t print-avoid-break">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        Platform Contribution Analysis
      </p>
      
      {/* Segmented Bar */}
      <div className="h-8 rounded-lg overflow-hidden flex mb-3">
        {contributions
          .sort((a, b) => b.contributionPercent - a.contributionPercent)
          .map((contribution) => (
            <div
              key={contribution.platform}
              className="flex items-center justify-center relative group transition-all"
              style={{
                width: `${contribution.contributionPercent}%`,
                backgroundColor: getPlatformColor(contribution.platform),
                minWidth: contribution.contributionPercent > 5 ? 'auto' : '24px',
              }}
            >
              {contribution.contributionPercent >= 15 && (
                <span className="text-[11px] font-semibold text-white drop-shadow-sm">
                  {getPlatformDisplayName(contribution.platform)}
                </span>
              )}
            </div>
          ))}
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-3">
        {contributions
          .sort((a, b) => b.contributionPercent - a.contributionPercent)
          .map((contribution) => (
            <div key={contribution.platform} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-sm" 
                style={{ backgroundColor: getPlatformColor(contribution.platform) }}
              />
              <span className="text-xs">
                <span className="font-medium">{getPlatformDisplayName(contribution.platform)}</span>
                <span className="text-muted-foreground ml-1">{contribution.contributionPercent.toFixed(1)}%</span>
              </span>
            </div>
          ))}
      </div>
      
      {/* Interpretation */}
      {dominant && (
        <p className="text-[11px] text-muted-foreground">
          {getPlatformDisplayName(dominant.platform)} is the dominant platform, 
          contributing {dominant.contributionPercent.toFixed(1)}% of the composite AQV score.
        </p>
      )}
    </div>
  )
}

export function AQVBreakdown({ report }: AQVBreakdownProps) {
  return (
    <Card className="print-avoid-break">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">AQV™ Breakdown</CardTitle>
            <p className="text-xs text-muted-foreground">Weighted audience quality composite</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold tabular-nums tracking-tight">{report.aqvScore}</div>
            <p className="text-[10px] text-muted-foreground">Composite</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Component Cards */}
        <div className="grid md:grid-cols-2 gap-3">
          {report.aqvComponents.map((component) => {
            const scoreInfo = getScoreLabel(component.score)
            return (
              <div key={component.name} className="bg-muted/30 rounded-lg p-4 print-avoid-break">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-sm font-medium">{component.name}</h4>
                    <p className="text-[10px] text-muted-foreground">Weight: {component.weight}%</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-2xl font-bold tabular-nums ${getScoreColor(component.score)}`}>
                      {component.score}
                    </span>
                    <div className="mt-0.5">
                      <Badge variant={scoreInfo.variant} className="text-[10px] px-1.5 py-0">{scoreInfo.label}</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-2">
                  <div 
                    className={`h-full rounded-full ${
                      component.score >= 80 ? 'bg-emerald-500' : 
                      component.score >= 60 ? 'bg-primary' : 
                      'bg-amber-500'
                    }`}
                    style={{ width: `${component.score}%` }}
                  />
                </div>
                
                <p className="text-[11px] text-muted-foreground">{component.interpretation}</p>
              </div>
            )
          })}
        </div>

        {/* Platform Contribution (only if multi-platform data exists) */}
        {report.aggregatedAQV && report.aggregatedAQV.platformContributions.length > 1 && (
          <PlatformContributionBar contributions={report.aggregatedAQV.platformContributions} />
        )}

        {/* Score Contribution */}
        <div className="pt-4 border-t print-avoid-break">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Score Contribution</p>
          <div className="bg-muted/30 rounded-lg overflow-hidden text-xs">
            {report.aqvComponents.map((component, index) => {
              const contribution = (component.score * component.weight / 100).toFixed(1)
              return (
                <div 
                  key={component.name} 
                  className={`flex items-center justify-between py-2 px-3 ${
                    index !== report.aqvComponents.length - 1 ? 'border-b border-border/50' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-medium w-40">{component.name}</span>
                    <span className="text-muted-foreground">{component.score} × {component.weight}%</span>
                  </div>
                  <span className="font-medium tabular-nums">+{contribution}</span>
                </div>
              )
            })}
            <div className="flex items-center justify-between py-2 px-3 bg-muted/50 border-t font-semibold">
              <span>Total</span>
              <span className="tabular-nums">{report.aqvScore}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
