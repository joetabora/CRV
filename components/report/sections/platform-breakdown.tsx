import { Report, PlatformAQV, Platform } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getPlatformDisplayName, getPlatformColor } from "@/core/aqvAggregate"

interface PlatformBreakdownProps {
  report: Report
}

// Platform-specific recommendations based on platform characteristics
const PLATFORM_RECOMMENDATIONS: Record<Platform, { strength: string; opportunity: string }> = {
  twitch: {
    strength: "Live engagement and real-time chat interaction drive high audience quality scores",
    opportunity: "Expand VOD content strategy to capture long-tail viewership",
  },
  youtube: {
    strength: "Strong discoverability and long-form content monetization potential",
    opportunity: "Increase upload frequency to maintain audience retention momentum",
  },
  tiktok: {
    strength: "High growth signal from viral content mechanics and younger demographics",
    opportunity: "Convert short-form viewers to longer engagement through cross-platform funnels",
  },
  kick: {
    strength: "Early-adopter audience with high engagement in emerging platform",
    opportunity: "Establish brand presence before market saturation",
  },
}

function getScoreLabel(score: number): { label: string; variant: "success" | "secondary" | "outline" } {
  if (score >= 80) return { label: "Strong", variant: "success" }
  if (score >= 60) return { label: "Average", variant: "secondary" }
  return { label: "Developing", variant: "outline" }
}

function calculatePlatformAQV(platformData: PlatformAQV): number {
  // Use same weights as core aggregation
  const weights = {
    audienceQuality: 0.25,
    engagementEfficiency: 0.25,
    monetizationReadiness: 0.20,
    growthSignal: 0.15,
    brandRisk: 0.15,
  }
  
  return Math.round(
    platformData.audienceQuality * weights.audienceQuality +
    platformData.engagementEfficiency * weights.engagementEfficiency +
    platformData.monetizationReadiness * weights.monetizationReadiness +
    platformData.growthSignal * weights.growthSignal +
    platformData.brandRisk * weights.brandRisk
  )
}

interface PlatformSectionProps {
  platformData: PlatformAQV
  contributionPercent: number | null
  isMultiPlatform: boolean
}

function PlatformSection({ platformData, contributionPercent, isMultiPlatform }: PlatformSectionProps) {
  const platformAQV = calculatePlatformAQV(platformData)
  const scoreInfo = getScoreLabel(platformAQV)
  const recommendations = PLATFORM_RECOMMENDATIONS[platformData.platform]
  
  const metrics = [
    { label: "Audience Quality", value: platformData.audienceQuality },
    { label: "Engagement Efficiency", value: platformData.engagementEfficiency },
    { label: "Monetization Readiness", value: platformData.monetizationReadiness },
    { label: "Growth Signal", value: platformData.growthSignal },
    { label: "Brand Safety", value: platformData.brandRisk },
  ]

  return (
    <div className="bg-muted/30 rounded-lg p-4 print-avoid-break">
      {/* Platform Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
            style={{ backgroundColor: getPlatformColor(platformData.platform) }}
          >
            {getPlatformDisplayName(platformData.platform).charAt(0)}
          </div>
          <div>
            <h4 className="font-semibold">{getPlatformDisplayName(platformData.platform)}</h4>
            <p className="text-[10px] text-muted-foreground">
              Confidence: {(platformData.confidence * 100).toFixed(0)}%
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold tabular-nums">{platformAQV}</span>
            <span className="text-sm text-muted-foreground">/100</span>
          </div>
          <Badge variant={scoreInfo.variant} className="text-[10px] px-1.5 py-0 mt-1">
            {scoreInfo.label}
          </Badge>
        </div>
      </div>

      {/* Contribution (only for multi-platform) */}
      {isMultiPlatform && contributionPercent !== null && (
        <div className="mb-4 p-2 bg-background/50 rounded border">
          <p className="text-[10px] text-muted-foreground">
            Contributes <span className="font-semibold text-foreground">{contributionPercent.toFixed(1)}%</span> to composite AQV
          </p>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        {metrics.map((metric) => {
          const metricScore = getScoreLabel(metric.value)
          return (
            <div key={metric.label} className="text-center">
              <p className="text-[9px] text-muted-foreground mb-1 truncate">{metric.label}</p>
              <p className={`text-lg font-bold tabular-nums ${
                metric.value >= 80 ? 'text-emerald-600' : 
                metric.value >= 60 ? 'text-foreground' : 
                'text-amber-600'
              }`}>
                {metric.value}
              </p>
            </div>
          )
        })}
      </div>

      {/* Platform Insights */}
      <div className="space-y-2 pt-3 border-t">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Platform Strength
          </p>
          <p className="text-xs text-muted-foreground">{recommendations.strength}</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Optimization Opportunity
          </p>
          <p className="text-xs text-muted-foreground">{recommendations.opportunity}</p>
        </div>
      </div>
    </div>
  )
}

export function PlatformBreakdown({ report }: PlatformBreakdownProps) {
  // Only render if platform data exists
  if (!report.platformAQVData || report.platformAQVData.length === 0) {
    return null
  }

  const isMultiPlatform = report.platformAQVData.length > 1
  
  // Build contribution map for quick lookup
  const contributionMap = new Map<Platform, number>()
  if (report.aggregatedAQV?.platformContributions) {
    report.aggregatedAQV.platformContributions.forEach((c) => {
      contributionMap.set(c.platform, c.contributionPercent)
    })
  }

  return (
    <Card className="print-avoid-break">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Platform-Specific Analysis</CardTitle>
            <p className="text-xs text-muted-foreground">
              {isMultiPlatform 
                ? `${report.platformAQVData.length} platforms analyzed independently`
                : "Single platform analysis"
              }
            </p>
          </div>
          {isMultiPlatform && (
            <Badge variant="secondary" className="text-[10px]">
              Cross-Platform
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className={`grid gap-4 ${isMultiPlatform ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
          {report.platformAQVData.map((platformData) => (
            <PlatformSection
              key={platformData.platform}
              platformData={platformData}
              contributionPercent={contributionMap.get(platformData.platform) ?? null}
              isMultiPlatform={isMultiPlatform}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

