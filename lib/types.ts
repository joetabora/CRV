import type { PlatformAQV, AggregatedAQV, PlatformContribution, Platform } from '@/core/aqvAggregate'

export type { PlatformAQV, AggregatedAQV, PlatformContribution, Platform }

export interface Creator {
  id: string
  name: string
  handle: string
  platform: 'twitch' | 'youtube' | 'tiktok' | 'kick'
  category: string
  avatarUrl?: string
}

export interface AQVComponent {
  name: string
  score: number
  weight: number
  interpretation: string
}

export interface SponsorshipFormatFit {
  format: string
  fit: 'High' | 'Medium' | 'Low'
  notes: string
}

export interface PeerComparison {
  metric: string
  creatorValue: number
  peerMedian: number
  peerLower: number
  peerUpper: number
  percentile: number
}

export interface Recommendation {
  id: string
  priority: 'primary' | 'secondary'
  title: string
  signal?: string
  action: string
  expectedImpact: string
}

export interface Report {
  id: string
  createdAt: Date
  updatedAt: Date
  creator: Creator
  
  // Executive Snapshot
  aqvScore: number
  audienceTier: string
  sponsorshipValue: number
  sponsorshipValueLow: number
  sponsorshipValueHigh: number
  brandRisk: 'Low' | 'Medium' | 'High'
  brandRiskScore: number
  
  // AQV Breakdown
  aqvComponents: AQVComponent[]
  
  // Monetization
  cpmRange: { low: number; high: number }
  placementCapacity: { low: number; high: number }
  efficiencyRating: number
  sponsorshipFormats: SponsorshipFormatFit[]
  upsideScenarios: string[]
  
  // Peer Benchmarking
  peerCohort: {
    platform: string
    viewershipRange: string
    contentType: string
    geography: string
    dataSource: string
  }
  peerComparisons: PeerComparison[]
  positioningSummary: string
  
  // Recommendations
  recommendations: Recommendation[]
  monetizationSteps: string[]
  measurementMetrics: string[]
  reviewCadence: string
  
  // What brands are buying
  brandInsights: string[]
  primaryUpside: string
  primaryConstraint: string
  
  // Methodology
  confidenceLevel: 'High' | 'Moderate-High' | 'Moderate' | 'Low'
  dataCompleteness: number
  lastDataUpdate: Date
  
  // Cross-platform aggregation (optional, for multi-platform creators)
  platformAQVData?: PlatformAQV[]
  aggregatedAQV?: AggregatedAQV
}

export interface ReportSummary {
  id: string
  creatorName: string
  platform: string
  aqvScore: number
  createdAt: Date
}

