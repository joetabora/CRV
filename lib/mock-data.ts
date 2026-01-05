import { Report, ReportSummary, PlatformAQV, Platform } from './types'
import { aggregateAQV } from '@/core/aqvAggregate'

// Individual platform mock data - used to construct reports based on provided platforms
const PLATFORM_AQV_DATA: Record<Platform, PlatformAQV> = {
  twitch: {
    platform: 'twitch',
    audienceQuality: 80,
    engagementEfficiency: 85,
    monetizationReadiness: 72,
    growthSignal: 68,
    brandRisk: 88,
    confidence: 0.95,
  },
  youtube: {
    platform: 'youtube',
    audienceQuality: 75,
    engagementEfficiency: 70,
    monetizationReadiness: 82,
    growthSignal: 72,
    brandRisk: 90,
    confidence: 0.85,
  },
  tiktok: {
    platform: 'tiktok',
    audienceQuality: 70,
    engagementEfficiency: 78,
    monetizationReadiness: 65,
    growthSignal: 82,
    brandRisk: 75,
    confidence: 0.80,
  },
  kick: {
    platform: 'kick',
    audienceQuality: 65,
    engagementEfficiency: 72,
    monetizationReadiness: 58,
    growthSignal: 70,
    brandRisk: 68,
    confidence: 0.70,
  },
}

/**
 * Builds platform AQV data array for only the specified platforms.
 * Returns undefined if no valid platforms provided.
 */
function buildPlatformAQVData(platforms: Platform[]): PlatformAQV[] | undefined {
  if (!platforms || platforms.length === 0) return undefined
  
  const validPlatforms = platforms.filter(p => p in PLATFORM_AQV_DATA)
  if (validPlatforms.length === 0) return undefined
  
  return validPlatforms.map(p => PLATFORM_AQV_DATA[p])
}

// Default single-platform data for base mock report
const mockSinglePlatformData = buildPlatformAQVData(['twitch'])!
const mockSinglePlatformAggregated = aggregateAQV(mockSinglePlatformData)

// In-memory store for generated reports (persists during session)
const generatedReportsStore: Map<string, Report> = new Map()

export const mockReport: Report = {
  id: 'rpt_001',
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-01-15'),
  
  creator: {
    id: 'cr_001',
    name: 'StreamerPro',
    handle: '@streamerpro',
    platform: 'twitch',
    category: 'Gaming',
    avatarUrl: undefined,
  },
  
  // Access level - default to free
  accessLevel: 'free',
  
  // Executive Snapshot
  aqvScore: 78,
  audienceTier: 'Tier B',
  sponsorshipValue: 45000,
  sponsorshipValueLow: 30000,
  sponsorshipValueHigh: 60000,
  brandRisk: 'Low',
  brandRiskScore: 85,
  
  // AQV Breakdown
  aqvComponents: [
    {
      name: 'Engagement',
      score: 85,
      weight: 30,
      interpretation: 'High chat activity and viewer interaction rates',
    },
    {
      name: 'Retention',
      score: 82,
      weight: 25,
      interpretation: 'Strong average watch time and return viewer rates',
    },
    {
      name: 'Monetization Efficiency',
      score: 72,
      weight: 25,
      interpretation: 'Good CPM rates with room for optimization',
    },
    {
      name: 'Stability/Risk',
      score: 75,
      weight: 20,
      interpretation: 'Low brand risk with consistent streaming schedule',
    },
  ],
  
  // Monetization
  cpmRange: { low: 8, high: 12 },
  placementCapacity: { low: 4, high: 6 },
  efficiencyRating: 72,
  sponsorshipFormats: [
    {
      format: 'Stream Integration',
      fit: 'High',
      notes: 'Natural integration during gameplay; high viewer retention',
    },
    {
      format: 'Product Placement',
      fit: 'Medium',
      notes: 'Works well with gaming peripherals and software',
    },
    {
      format: 'Branded Content',
      fit: 'High',
      notes: 'Strong storytelling ability; audience trusts recommendations',
    },
    {
      format: 'Sponsored Events',
      fit: 'Medium',
      notes: 'Good for seasonal campaigns; requires advance planning',
    },
  ],
  upsideScenarios: [
    'Increase placement frequency to 6-8 per month could raise monthly value to $60K+',
    'Premium brand partnerships (tech, gaming) could command CPMs of $15-20',
    'Longer-form branded content segments (5-10 min) enable higher-value deals',
  ],
  
  // Peer Benchmarking
  peerCohort: {
    platform: 'Twitch',
    viewershipRange: '5K–15K avg',
    contentType: 'Gaming',
    geography: 'North America',
    dataSource: '60-day rolling',
  },
  peerComparisons: [
    {
      metric: 'AQV Score',
      creatorValue: 78,
      peerMedian: 72,
      peerLower: 65,
      peerUpper: 82,
      percentile: 75,
    },
    {
      metric: 'Engagement Rate',
      creatorValue: 2.1,
      peerMedian: 1.8,
      peerLower: 1.2,
      peerUpper: 2.4,
      percentile: 78,
    },
    {
      metric: 'Chat Density',
      creatorValue: 45,
      peerMedian: 37,
      peerLower: 25,
      peerUpper: 52,
      percentile: 80,
    },
    {
      metric: 'Avg Watch Time (min)',
      creatorValue: 42,
      peerMedian: 38,
      peerLower: 28,
      peerUpper: 48,
      percentile: 72,
    },
  ],
  positioningSummary: 'This creator performs above the peer median across all key metrics, positioning them in the upper quartile of their cohort. With an AQV score of 78, they rank in the 75th percentile, demonstrating strong engagement, retention, and monetization efficiency relative to similar creators.',
  
  // Recommendations
  recommendations: [
    {
      id: 'rec_001',
      priority: 'primary',
      title: 'Increase Placement Frequency',
      action: 'Scale from 4-6 placements per month to 6-8 placements. Focus on premium brand partnerships in gaming and tech categories.',
      expectedImpact: 'Monthly sponsorship value could increase from $45K to $60K+ (33% increase). Improved efficiency rating and higher CPM potential.',
    },
    {
      id: 'rec_002',
      priority: 'secondary',
      title: 'Optimize VOD Discoverability',
      signal: 'VOD discoverability is limited',
      action: 'Optimize titles, tags, and thumbnails',
      expectedImpact: 'Increase long-tail viewership',
    },
    {
      id: 'rec_003',
      priority: 'secondary',
      title: 'Stabilize Streaming Schedule',
      signal: 'Schedule variance affects reach',
      action: 'Maintain consistent streaming schedule',
      expectedImpact: 'Improve audience predictability',
    },
    {
      id: 'rec_004',
      priority: 'secondary',
      title: 'Develop Longer-Form Segments',
      signal: 'Longer-form content performs well',
      action: 'Develop 5-10 min branded segments',
      expectedImpact: 'Enable premium CPM rates',
    },
  ],
  monetizationSteps: [
    'Identify 2-3 premium brand categories aligned with audience (gaming hardware, software, energy drinks)',
    'Develop pitch deck highlighting engagement metrics, retention rates, and brand safety record',
    'Pilot 2-3 placements with existing partners to test premium pricing and longer-form content',
    'Scale successful placements and expand to new premium brand categories based on performance data',
  ],
  measurementMetrics: [
    'Monthly sponsorship revenue',
    'Placement frequency',
    'CPM rates',
    'Engagement rates',
    'Audience retention',
    'Brand partnership satisfaction',
  ],
  reviewCadence: 'Monthly performance reviews to track progress against recommendations. Quarterly deep-dive analysis to reassess AQV score and peer positioning.',
  
  // Brand insights
  brandInsights: [
    'High retention streams (120–180 min avg)',
    'Chat engagement 2.1× category average',
    'Brand-safe collaborations with mid-core games',
  ],
  primaryUpside: 'Upsell longer-form sponsor segments; premium bundles for seasonal game launches.',
  primaryConstraint: 'Limited VOD discoverability; reduce schedule variance to stabilize reach.',
  
  // Methodology
  confidenceLevel: 'Moderate-High',
  dataCompleteness: 92,
  lastDataUpdate: new Date('2024-01-14'),
  
  // Platform data - single platform by default (Twitch only)
  platformAQVData: mockSinglePlatformData,
  aggregatedAQV: mockSinglePlatformAggregated,
}

export const mockReportsList: ReportSummary[] = [
  {
    id: 'rpt_001',
    creatorName: 'StreamerPro',
    platform: 'Twitch',
    aqvScore: 78,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'rpt_002',
    creatorName: 'GameMaster',
    platform: 'Twitch',
    aqvScore: 82,
    createdAt: new Date('2024-01-12'),
  },
  {
    id: 'rpt_003',
    creatorName: 'ContentKing',
    platform: 'Twitch',
    aqvScore: 65,
    createdAt: new Date('2024-01-10'),
  },
]

/**
 * Detects platform from URL or identifier string.
 * Returns the detected platform or undefined if not recognized.
 */
function detectPlatformFromUrl(url: string): Platform | undefined {
  const lowered = url.toLowerCase()
  if (lowered.includes('twitch.tv') || lowered.includes('twitch')) return 'twitch'
  if (lowered.includes('youtube.com') || lowered.includes('youtu.be') || lowered.includes('youtube')) return 'youtube'
  if (lowered.includes('tiktok.com') || lowered.includes('tiktok')) return 'tiktok'
  if (lowered.includes('kick.com') || lowered.includes('kick')) return 'kick'
  return undefined
}

export function getReportById(id: string): Report | null {
  // Check generated reports store first
  if (generatedReportsStore.has(id)) {
    return generatedReportsStore.get(id)!
  }
  
  // rpt_001 is the demo report (single-platform Twitch)
  if (id === 'rpt_001') {
    return mockReport
  }
  
  // For unknown IDs, return a single-platform (Twitch) report
  const singlePlatformData = buildPlatformAQVData(['twitch'])
  const singlePlatformAggregated = singlePlatformData ? aggregateAQV(singlePlatformData) : undefined
  
  return {
    ...mockReport,
    id,
    creator: {
      ...mockReport.creator,
      name: `Creator ${id}`,
      handle: `@creator_${id}`,
      platform: 'twitch',
    },
    platformAQVData: singlePlatformData,
    aggregatedAQV: singlePlatformAggregated,
  }
}

export interface GenerateReportInput {
  /** Primary platform URL or identifier (required) */
  primaryUrl: string
  /** Additional platform URLs (optional, for multi-platform reports) */
  additionalUrls?: string[]
}

/**
 * Generates a new report based on provided platform URLs.
 * ONLY includes platforms that are explicitly provided.
 */
export function generateNewReport(input: GenerateReportInput | string): Report {
  const newId = `rpt_${Date.now()}`
  
  // Handle legacy string input (single URL)
  const normalizedInput: GenerateReportInput = typeof input === 'string' 
    ? { primaryUrl: input, additionalUrls: [] }
    : input
  
  // Detect platforms from provided URLs only
  const detectedPlatforms: Platform[] = []
  
  const primaryPlatform = detectPlatformFromUrl(normalizedInput.primaryUrl)
  if (primaryPlatform) {
    detectedPlatforms.push(primaryPlatform)
  }
  
  // Add additional platforms if provided
  if (normalizedInput.additionalUrls && normalizedInput.additionalUrls.length > 0) {
    for (const url of normalizedInput.additionalUrls) {
      const platform = detectPlatformFromUrl(url)
      if (platform && !detectedPlatforms.includes(platform)) {
        detectedPlatforms.push(platform)
      }
    }
  }
  
  // Default to twitch if no platform detected
  const platforms = detectedPlatforms.length > 0 ? detectedPlatforms : ['twitch'] as Platform[]
  const primaryCreatorPlatform = platforms[0]
  
  // Build platform data ONLY for explicitly provided platforms
  const platformAQVData = buildPlatformAQVData(platforms)
  const aggregatedAQV = platformAQVData ? aggregateAQV(platformAQVData) : undefined
  
  // Extract handle from URL
  const handle = normalizedInput.primaryUrl.includes('@') 
    ? normalizedInput.primaryUrl 
    : `@${normalizedInput.primaryUrl.split('/').pop()}`
  
  // All reports default to Free
  // Pro access is granted separately (e.g., by account tier, payment, or manual override)
  const accessLevel = 'free' as const
  
  const report: Report = {
    ...mockReport,
    id: newId,
    createdAt: new Date(),
    updatedAt: new Date(),
    accessLevel,
    creator: {
      ...mockReport.creator,
      id: `cr_${Date.now()}`,
      name: 'New Creator',
      handle,
      platform: primaryCreatorPlatform,
    },
    peerCohort: {
      ...mockReport.peerCohort,
      platform: primaryCreatorPlatform.charAt(0).toUpperCase() + primaryCreatorPlatform.slice(1),
    },
    // ONLY include platforms that were explicitly provided
    platformAQVData,
    aggregatedAQV,
  }
  
  // Store the report so it can be retrieved by getReportById
  generatedReportsStore.set(newId, report)
  
  return report
}

