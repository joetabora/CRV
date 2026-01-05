import { Report, PlatformAQV, Platform } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getPlatformDisplayName, getPlatformColor } from "@/core/aqvAggregate"
import { LockedSection } from "@/components/report/locked-section"

interface PlatformBreakdownProps {
  report: Report
}

interface BaseSectionProps {
  platformData: PlatformAQV
  contributionPercent: number | null
  isMultiPlatform: boolean
}

function getScoreLabel(score: number): { label: string; variant: "success" | "secondary" | "outline" } {
  if (score >= 80) return { label: "Strong", variant: "success" }
  if (score >= 60) return { label: "Average", variant: "secondary" }
  return { label: "Developing", variant: "outline" }
}

function calculatePlatformAQV(platformData: PlatformAQV): number {
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

// Shared header component for all platforms
function PlatformHeader({ platformData, platformAQV }: { platformData: PlatformAQV; platformAQV: number }) {
  const scoreInfo = getScoreLabel(platformAQV)
  
  return (
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
  )
}

// Contribution badge for multi-platform reports
function ContributionBadge({ contributionPercent }: { contributionPercent: number }) {
  return (
    <div className="mb-4 p-2 bg-background/50 rounded border">
      <p className="text-[10px] text-muted-foreground">
        Contributes <span className="font-semibold text-foreground">{contributionPercent.toFixed(1)}%</span> to composite AQV
      </p>
    </div>
  )
}

// ============================================
// TWITCH SECTION
// ============================================
function TwitchSection({ platformData, contributionPercent, isMultiPlatform }: BaseSectionProps) {
  const platformAQV = calculatePlatformAQV(platformData)
  
  // Twitch-specific mock metrics (derived from AQV dimensions)
  const twitchMetrics = {
    avgViewers: Math.round(5000 + (platformData.audienceQuality / 100) * 10000),
    chatDensity: Math.round(30 + (platformData.engagementEfficiency / 100) * 40),
    streamHoursWeek: Math.round(15 + (platformData.monetizationReadiness / 100) * 25),
    subCount: Math.round(500 + (platformData.audienceQuality / 100) * 2000),
    returnViewerRate: Math.round(40 + (platformData.engagementEfficiency / 100) * 40),
  }

  return (
    <div className="bg-muted/30 rounded-lg p-4 print-avoid-break">
      <PlatformHeader platformData={platformData} platformAQV={platformAQV} />
      
      {isMultiPlatform && contributionPercent !== null && (
        <ContributionBadge contributionPercent={contributionPercent} />
      )}

      {/* Twitch-Specific Metrics */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-background/50 rounded p-2 text-center">
          <p className="text-[9px] text-muted-foreground mb-1">Avg Viewers</p>
          <p className="text-lg font-bold tabular-nums">{twitchMetrics.avgViewers.toLocaleString()}</p>
        </div>
        <div className="bg-background/50 rounded p-2 text-center">
          <p className="text-[9px] text-muted-foreground mb-1">Chat Density</p>
          <p className="text-lg font-bold tabular-nums">{twitchMetrics.chatDensity}/min</p>
        </div>
        <div className="bg-background/50 rounded p-2 text-center">
          <p className="text-[9px] text-muted-foreground mb-1">Stream Hours</p>
          <p className="text-lg font-bold tabular-nums">{twitchMetrics.streamHoursWeek}h/wk</p>
        </div>
      </div>

      {/* AQV Dimension Scores */}
      <div className="grid grid-cols-5 gap-1 mb-4 py-2 border-y">
        {[
          { label: "Audience", value: platformData.audienceQuality },
          { label: "Engage", value: platformData.engagementEfficiency },
          { label: "Monetize", value: platformData.monetizationReadiness },
          { label: "Growth", value: platformData.growthSignal },
          { label: "Safety", value: platformData.brandRisk },
        ].map((m) => (
          <div key={m.label} className="text-center">
            <p className="text-[8px] text-muted-foreground">{m.label}</p>
            <p className={`text-sm font-bold tabular-nums ${
              m.value >= 80 ? 'text-emerald-600' : m.value >= 60 ? 'text-foreground' : 'text-amber-600'
            }`}>{m.value}</p>
          </div>
        ))}
      </div>

      {/* Twitch Insights */}
      <div className="space-y-2">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Platform Strength
          </p>
          <p className="text-xs text-muted-foreground">
            Live engagement and real-time chat interaction drive audience quality
          </p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Twitch Optimization
          </p>
          <p className="text-xs text-muted-foreground">
            Expand VOD highlights and clip strategy to capture long-tail viewership
          </p>
        </div>
      </div>
    </div>
  )
}

// ============================================
// YOUTUBE SECTION
// ============================================
function YouTubeSection({ platformData, contributionPercent, isMultiPlatform }: BaseSectionProps) {
  const platformAQV = calculatePlatformAQV(platformData)
  
  // YouTube-specific mock metrics (derived from AQV dimensions)
  const youtubeMetrics = {
    subscribers: Math.round(50000 + (platformData.audienceQuality / 100) * 450000),
    avgViews: Math.round(10000 + (platformData.engagementEfficiency / 100) * 90000),
    uploadCadence: Math.round(2 + (platformData.monetizationReadiness / 100) * 6),
    shortsRatio: Math.round(10 + (platformData.growthSignal / 100) * 40),
    avgWatchTime: Math.round(3 + (platformData.engagementEfficiency / 100) * 9),
  }

  return (
    <div className="bg-muted/30 rounded-lg p-4 print-avoid-break">
      <PlatformHeader platformData={platformData} platformAQV={platformAQV} />
      
      {isMultiPlatform && contributionPercent !== null && (
        <ContributionBadge contributionPercent={contributionPercent} />
      )}

      {/* YouTube-Specific Metrics */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-background/50 rounded p-2 text-center">
          <p className="text-[9px] text-muted-foreground mb-1">Subscribers</p>
          <p className="text-lg font-bold tabular-nums">
            {youtubeMetrics.subscribers >= 1000000 
              ? `${(youtubeMetrics.subscribers / 1000000).toFixed(1)}M`
              : `${(youtubeMetrics.subscribers / 1000).toFixed(0)}K`
            }
          </p>
        </div>
        <div className="bg-background/50 rounded p-2 text-center">
          <p className="text-[9px] text-muted-foreground mb-1">Avg Views</p>
          <p className="text-lg font-bold tabular-nums">
            {youtubeMetrics.avgViews >= 1000000 
              ? `${(youtubeMetrics.avgViews / 1000000).toFixed(1)}M`
              : `${(youtubeMetrics.avgViews / 1000).toFixed(0)}K`
            }
          </p>
        </div>
        <div className="bg-background/50 rounded p-2 text-center">
          <p className="text-[9px] text-muted-foreground mb-1">Upload Cadence</p>
          <p className="text-lg font-bold tabular-nums">{youtubeMetrics.uploadCadence}/wk</p>
        </div>
      </div>

      {/* Secondary YouTube Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-background/50 rounded p-2">
          <p className="text-[9px] text-muted-foreground mb-1">Shorts Ratio</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-500 rounded-full" 
                style={{ width: `${youtubeMetrics.shortsRatio}%` }}
              />
            </div>
            <span className="text-xs font-medium tabular-nums">{youtubeMetrics.shortsRatio}%</span>
          </div>
        </div>
        <div className="bg-background/50 rounded p-2">
          <p className="text-[9px] text-muted-foreground mb-1">Avg Watch Time</p>
          <p className="text-sm font-bold tabular-nums">{youtubeMetrics.avgWatchTime} min</p>
        </div>
      </div>

      {/* AQV Dimension Scores */}
      <div className="grid grid-cols-5 gap-1 mb-4 py-2 border-y">
        {[
          { label: "Audience", value: platformData.audienceQuality },
          { label: "Engage", value: platformData.engagementEfficiency },
          { label: "Monetize", value: platformData.monetizationReadiness },
          { label: "Growth", value: platformData.growthSignal },
          { label: "Safety", value: platformData.brandRisk },
        ].map((m) => (
          <div key={m.label} className="text-center">
            <p className="text-[8px] text-muted-foreground">{m.label}</p>
            <p className={`text-sm font-bold tabular-nums ${
              m.value >= 80 ? 'text-emerald-600' : m.value >= 60 ? 'text-foreground' : 'text-amber-600'
            }`}>{m.value}</p>
          </div>
        ))}
      </div>

      {/* YouTube Insights */}
      <div className="space-y-2">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Platform Strength
          </p>
          <p className="text-xs text-muted-foreground">
            Strong discoverability and long-form content monetization via AdSense
          </p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            YouTube Optimization
          </p>
          <p className="text-xs text-muted-foreground">
            Increase Shorts output to boost growth signal; optimize thumbnails for CTR
          </p>
        </div>
      </div>
    </div>
  )
}

// ============================================
// TIKTOK SECTION
// ============================================
function TikTokSection({ platformData, contributionPercent, isMultiPlatform }: BaseSectionProps) {
  const platformAQV = calculatePlatformAQV(platformData)
  
  const tiktokMetrics = {
    followers: Math.round(100000 + (platformData.audienceQuality / 100) * 900000),
    avgViews: Math.round(50000 + (platformData.engagementEfficiency / 100) * 450000),
    postsPerWeek: Math.round(5 + (platformData.monetizationReadiness / 100) * 15),
    engagementRate: (2 + (platformData.engagementEfficiency / 100) * 8).toFixed(1),
  }

  return (
    <div className="bg-muted/30 rounded-lg p-4 print-avoid-break">
      <PlatformHeader platformData={platformData} platformAQV={platformAQV} />
      
      {isMultiPlatform && contributionPercent !== null && (
        <ContributionBadge contributionPercent={contributionPercent} />
      )}

      {/* TikTok-Specific Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-background/50 rounded p-2 text-center">
          <p className="text-[9px] text-muted-foreground mb-1">Followers</p>
          <p className="text-lg font-bold tabular-nums">
            {tiktokMetrics.followers >= 1000000 
              ? `${(tiktokMetrics.followers / 1000000).toFixed(1)}M`
              : `${(tiktokMetrics.followers / 1000).toFixed(0)}K`
            }
          </p>
        </div>
        <div className="bg-background/50 rounded p-2 text-center">
          <p className="text-[9px] text-muted-foreground mb-1">Avg Views</p>
          <p className="text-lg font-bold tabular-nums">
            {tiktokMetrics.avgViews >= 1000000 
              ? `${(tiktokMetrics.avgViews / 1000000).toFixed(1)}M`
              : `${(tiktokMetrics.avgViews / 1000).toFixed(0)}K`
            }
          </p>
        </div>
        <div className="bg-background/50 rounded p-2 text-center">
          <p className="text-[9px] text-muted-foreground mb-1">Posts/Week</p>
          <p className="text-lg font-bold tabular-nums">{tiktokMetrics.postsPerWeek}</p>
        </div>
        <div className="bg-background/50 rounded p-2 text-center">
          <p className="text-[9px] text-muted-foreground mb-1">Engagement</p>
          <p className="text-lg font-bold tabular-nums">{tiktokMetrics.engagementRate}%</p>
        </div>
      </div>

      {/* AQV Dimension Scores */}
      <div className="grid grid-cols-5 gap-1 mb-4 py-2 border-y">
        {[
          { label: "Audience", value: platformData.audienceQuality },
          { label: "Engage", value: platformData.engagementEfficiency },
          { label: "Monetize", value: platformData.monetizationReadiness },
          { label: "Growth", value: platformData.growthSignal },
          { label: "Safety", value: platformData.brandRisk },
        ].map((m) => (
          <div key={m.label} className="text-center">
            <p className="text-[8px] text-muted-foreground">{m.label}</p>
            <p className={`text-sm font-bold tabular-nums ${
              m.value >= 80 ? 'text-emerald-600' : m.value >= 60 ? 'text-foreground' : 'text-amber-600'
            }`}>{m.value}</p>
          </div>
        ))}
      </div>

      {/* TikTok Insights */}
      <div className="space-y-2">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Platform Strength
          </p>
          <p className="text-xs text-muted-foreground">
            High growth signal from viral mechanics and younger demographics
          </p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            TikTok Optimization
          </p>
          <p className="text-xs text-muted-foreground">
            Convert short-form viewers to longer engagement via cross-platform funnels
          </p>
        </div>
      </div>
    </div>
  )
}

// ============================================
// KICK SECTION
// ============================================
function KickSection({ platformData, contributionPercent, isMultiPlatform }: BaseSectionProps) {
  const platformAQV = calculatePlatformAQV(platformData)
  
  const kickMetrics = {
    followers: Math.round(10000 + (platformData.audienceQuality / 100) * 90000),
    avgViewers: Math.round(500 + (platformData.engagementEfficiency / 100) * 4500),
    streamHours: Math.round(10 + (platformData.monetizationReadiness / 100) * 20),
    chatActivity: Math.round(20 + (platformData.engagementEfficiency / 100) * 30),
  }

  return (
    <div className="bg-muted/30 rounded-lg p-4 print-avoid-break">
      <PlatformHeader platformData={platformData} platformAQV={platformAQV} />
      
      {isMultiPlatform && contributionPercent !== null && (
        <ContributionBadge contributionPercent={contributionPercent} />
      )}

      {/* Kick-Specific Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-background/50 rounded p-2 text-center">
          <p className="text-[9px] text-muted-foreground mb-1">Followers</p>
          <p className="text-lg font-bold tabular-nums">
            {kickMetrics.followers >= 1000 
              ? `${(kickMetrics.followers / 1000).toFixed(0)}K`
              : kickMetrics.followers
            }
          </p>
        </div>
        <div className="bg-background/50 rounded p-2 text-center">
          <p className="text-[9px] text-muted-foreground mb-1">Avg Viewers</p>
          <p className="text-lg font-bold tabular-nums">{kickMetrics.avgViewers.toLocaleString()}</p>
        </div>
        <div className="bg-background/50 rounded p-2 text-center">
          <p className="text-[9px] text-muted-foreground mb-1">Stream Hours</p>
          <p className="text-lg font-bold tabular-nums">{kickMetrics.streamHours}h/wk</p>
        </div>
        <div className="bg-background/50 rounded p-2 text-center">
          <p className="text-[9px] text-muted-foreground mb-1">Chat Activity</p>
          <p className="text-lg font-bold tabular-nums">{kickMetrics.chatActivity}/min</p>
        </div>
      </div>

      {/* AQV Dimension Scores */}
      <div className="grid grid-cols-5 gap-1 mb-4 py-2 border-y">
        {[
          { label: "Audience", value: platformData.audienceQuality },
          { label: "Engage", value: platformData.engagementEfficiency },
          { label: "Monetize", value: platformData.monetizationReadiness },
          { label: "Growth", value: platformData.growthSignal },
          { label: "Safety", value: platformData.brandRisk },
        ].map((m) => (
          <div key={m.label} className="text-center">
            <p className="text-[8px] text-muted-foreground">{m.label}</p>
            <p className={`text-sm font-bold tabular-nums ${
              m.value >= 80 ? 'text-emerald-600' : m.value >= 60 ? 'text-foreground' : 'text-amber-600'
            }`}>{m.value}</p>
          </div>
        ))}
      </div>

      {/* Kick Insights */}
      <div className="space-y-2">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Platform Strength
          </p>
          <p className="text-xs text-muted-foreground">
            Early-adopter audience with high engagement on emerging platform
          </p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Kick Optimization
          </p>
          <p className="text-xs text-muted-foreground">
            Establish brand presence and loyal community before market saturation
          </p>
        </div>
      </div>
    </div>
  )
}

// ============================================
// PLATFORM SECTION ROUTER
// ============================================
function PlatformSectionRouter(props: BaseSectionProps) {
  switch (props.platformData.platform) {
    case 'twitch':
      return <TwitchSection {...props} />
    case 'youtube':
      return <YouTubeSection {...props} />
    case 'tiktok':
      return <TikTokSection {...props} />
    case 'kick':
      return <KickSection {...props} />
    default:
      return <TwitchSection {...props} /> // Fallback
  }
}

// ============================================
// MAIN EXPORT
// ============================================
export function PlatformBreakdown({ report }: PlatformBreakdownProps) {
  if (!report.platformAQVData || report.platformAQVData.length === 0) {
    return null
  }

  const isFreeUser = report.accessLevel === 'free'
  
  // For free users, only show Twitch; other platforms are gated
  const visiblePlatforms = isFreeUser 
    ? report.platformAQVData.filter(p => p.platform === 'twitch')
    : report.platformAQVData
  
  // Platforms that are locked for free users
  const lockedPlatforms = isFreeUser
    ? report.platformAQVData.filter(p => p.platform !== 'twitch')
    : []

  const isMultiPlatform = report.platformAQVData.length > 1
  
  const contributionMap = new Map<Platform, number>()
  if (report.aggregatedAQV?.platformContributions) {
    report.aggregatedAQV.platformContributions.forEach((c) => {
      contributionMap.set(c.platform, c.contributionPercent)
    })
  }

  return (
    <div className="space-y-4">
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
          <div className={`grid gap-4 ${isMultiPlatform && !isFreeUser ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
            {visiblePlatforms.map((platformData) => (
              <PlatformSectionRouter
                key={platformData.platform}
                platformData={platformData}
                contributionPercent={contributionMap.get(platformData.platform) ?? null}
                isMultiPlatform={isMultiPlatform}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Show locked sections for non-Twitch platforms for free users */}
      {lockedPlatforms.map((platformData) => (
        <LockedSection
          key={platformData.platform}
          title={`${getPlatformDisplayName(platformData.platform)} Analysis`}
          description={`Unlock detailed ${getPlatformDisplayName(platformData.platform)} analytics including platform-specific metrics, AQV breakdown, and optimization recommendations.`}
          reportId={report.id}
        />
      ))}
    </div>
  )
}
