/**
 * Cross-platform AQV Aggregation Module
 * 
 * Aggregates Audience Quality Value scores across multiple platforms
 * using confidence-weighted averaging with renormalized platform weights.
 */

export type Platform = "twitch" | "youtube" | "tiktok" | "kick"

export interface PlatformAQV {
  platform: Platform
  audienceQuality: number
  engagementEfficiency: number
  monetizationReadiness: number
  growthSignal: number
  brandRisk: number
  confidence: number // 0–1
}

export interface AggregatedAQV {
  aqvScore: number
  dimensions: {
    audienceQuality: number
    engagementEfficiency: number
    monetizationReadiness: number
    growthSignal: number
    brandRisk: number
  }
  platformContributions: PlatformContribution[]
}

export interface PlatformContribution {
  platform: Platform
  weight: number
  confidence: number
  contributionPercent: number
}

// Default platform weights (must sum to 1.0)
const DEFAULT_PLATFORM_WEIGHTS: Record<Platform, number> = {
  youtube: 0.40,
  twitch: 0.35,
  tiktok: 0.20,
  kick: 0.05,
}

// AQV dimension weights for final score calculation (must sum to 1.0)
const AQV_DIMENSION_WEIGHTS = {
  audienceQuality: 0.25,
  engagementEfficiency: 0.25,
  monetizationReadiness: 0.20,
  growthSignal: 0.15,
  brandRisk: 0.15,
}

/**
 * Clamps a value between min and max
 */
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

/**
 * Validates a PlatformAQV object
 * Returns true if the data is valid and usable
 */
function isValidPlatformAQV(data: PlatformAQV): boolean {
  const dimensions = [
    data.audienceQuality,
    data.engagementEfficiency,
    data.monetizationReadiness,
    data.growthSignal,
    data.brandRisk,
  ]

  // Check all dimensions are valid numbers in range
  const dimensionsValid = dimensions.every(
    (d) => typeof d === "number" && !isNaN(d) && d >= 0 && d <= 100
  )

  // Check confidence is valid
  const confidenceValid =
    typeof data.confidence === "number" &&
    !isNaN(data.confidence) &&
    data.confidence >= 0 &&
    data.confidence <= 1

  return dimensionsValid && confidenceValid
}

/**
 * Computes effective weights for each platform
 * Renormalizes when platforms are missing and applies confidence multiplier
 */
function computeEffectiveWeights(
  platforms: PlatformAQV[]
): Map<Platform, number> {
  // Calculate sum of base weights for available platforms
  const baseWeightSum = platforms.reduce(
    (sum, p) => sum + DEFAULT_PLATFORM_WEIGHTS[p.platform],
    0
  )

  const effectiveWeights = new Map<Platform, number>()

  // Renormalize and apply confidence
  platforms.forEach((p) => {
    const renormalizedWeight = DEFAULT_PLATFORM_WEIGHTS[p.platform] / baseWeightSum
    const effectiveWeight = renormalizedWeight * p.confidence
    effectiveWeights.set(p.platform, effectiveWeight)
  })

  // Renormalize effective weights to sum to 1.0
  const effectiveSum = Array.from(effectiveWeights.values()).reduce(
    (sum, w) => sum + w,
    0
  )

  if (effectiveSum > 0) {
    effectiveWeights.forEach((weight, platform) => {
      effectiveWeights.set(platform, weight / effectiveSum)
    })
  }

  return effectiveWeights
}

/**
 * Aggregates a single AQV dimension across platforms
 */
function aggregateDimension(
  platforms: PlatformAQV[],
  effectiveWeights: Map<Platform, number>,
  getDimension: (p: PlatformAQV) => number
): number {
  let weightedSum = 0

  platforms.forEach((p) => {
    const weight = effectiveWeights.get(p.platform) ?? 0
    weightedSum += getDimension(p) * weight
  })

  return clamp(Math.round(weightedSum * 10) / 10, 0, 100)
}

/**
 * Computes platform contribution percentages based on their influence on final score
 */
function computePlatformContributions(
  platforms: PlatformAQV[],
  effectiveWeights: Map<Platform, number>,
  aggregatedDimensions: AggregatedAQV["dimensions"]
): PlatformContribution[] {
  // Calculate each platform's contribution to the final score
  const contributions: { platform: Platform; contribution: number; confidence: number; weight: number }[] = []

  platforms.forEach((p) => {
    const weight = effectiveWeights.get(p.platform) ?? 0
    
    // Calculate this platform's weighted contribution to each dimension
    const dimensionContributions =
      p.audienceQuality * AQV_DIMENSION_WEIGHTS.audienceQuality +
      p.engagementEfficiency * AQV_DIMENSION_WEIGHTS.engagementEfficiency +
      p.monetizationReadiness * AQV_DIMENSION_WEIGHTS.monetizationReadiness +
      p.growthSignal * AQV_DIMENSION_WEIGHTS.growthSignal +
      p.brandRisk * AQV_DIMENSION_WEIGHTS.brandRisk

    contributions.push({
      platform: p.platform,
      contribution: dimensionContributions * weight,
      confidence: p.confidence,
      weight,
    })
  })

  // Normalize to percentages
  const totalContribution = contributions.reduce((sum, c) => sum + c.contribution, 0)

  return contributions.map((c) => ({
    platform: c.platform,
    weight: Math.round(c.weight * 1000) / 1000,
    confidence: c.confidence,
    contributionPercent:
      totalContribution > 0
        ? Math.round((c.contribution / totalContribution) * 1000) / 10
        : 0,
  }))
}

/**
 * Main aggregation function
 * 
 * Aggregates AQV scores from multiple platforms into a single composite score.
 * 
 * @param platformData - Array of PlatformAQV objects
 * @returns AggregatedAQV with composite score, dimensions, and platform contributions
 */
export function aggregateAQV(platformData: PlatformAQV[]): AggregatedAQV {
  // Filter to valid platforms only
  const validPlatforms = platformData.filter(isValidPlatformAQV)

  // Handle empty input
  if (validPlatforms.length === 0) {
    return {
      aqvScore: 0,
      dimensions: {
        audienceQuality: 0,
        engagementEfficiency: 0,
        monetizationReadiness: 0,
        growthSignal: 0,
        brandRisk: 0,
      },
      platformContributions: [],
    }
  }

  // Compute effective weights with confidence and renormalization
  const effectiveWeights = computeEffectiveWeights(validPlatforms)

  // Aggregate each dimension independently
  const dimensions = {
    audienceQuality: aggregateDimension(
      validPlatforms,
      effectiveWeights,
      (p) => p.audienceQuality
    ),
    engagementEfficiency: aggregateDimension(
      validPlatforms,
      effectiveWeights,
      (p) => p.engagementEfficiency
    ),
    monetizationReadiness: aggregateDimension(
      validPlatforms,
      effectiveWeights,
      (p) => p.monetizationReadiness
    ),
    growthSignal: aggregateDimension(
      validPlatforms,
      effectiveWeights,
      (p) => p.growthSignal
    ),
    brandRisk: aggregateDimension(
      validPlatforms,
      effectiveWeights,
      (p) => p.brandRisk
    ),
  }

  // Calculate final AQV score using dimension weights
  const aqvScore = clamp(
    Math.round(
      (dimensions.audienceQuality * AQV_DIMENSION_WEIGHTS.audienceQuality +
        dimensions.engagementEfficiency * AQV_DIMENSION_WEIGHTS.engagementEfficiency +
        dimensions.monetizationReadiness * AQV_DIMENSION_WEIGHTS.monetizationReadiness +
        dimensions.growthSignal * AQV_DIMENSION_WEIGHTS.growthSignal +
        dimensions.brandRisk * AQV_DIMENSION_WEIGHTS.brandRisk) *
        10
    ) / 10,
    0,
    100
  )

  // Compute platform contributions
  const platformContributions = computePlatformContributions(
    validPlatforms,
    effectiveWeights,
    dimensions
  )

  return {
    aqvScore,
    dimensions,
    platformContributions,
  }
}

/**
 * Helper to get platform display name
 */
export function getPlatformDisplayName(platform: Platform): string {
  const names: Record<Platform, string> = {
    twitch: "Twitch",
    youtube: "YouTube",
    tiktok: "TikTok",
    kick: "Kick",
  }
  return names[platform]
}

/**
 * Helper to get platform color for UI
 */
export function getPlatformColor(platform: Platform): string {
  const colors: Record<Platform, string> = {
    twitch: "#9146FF",
    youtube: "#FF0000",
    tiktok: "#000000",
    kick: "#53FC18",
  }
  return colors[platform]
}


