"use client"

import { Report } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getPlatformDisplayName, getPlatformColor } from "@/core/aqvAggregate"
import { LockedSection } from "@/components/report/locked-section"

interface PlatformContributionProps {
  report: Report
}

/**
 * Platform Contribution Component
 * 
 * Displays the weighted contribution of each platform to the composite AQV score.
 * Shows a segmented bar visualization with platform labels and percentages.
 * 
 * Only renders when multiple platforms are present.
 * PRO FEATURE: Gated for free users.
 */
export function PlatformContribution({ report }: PlatformContributionProps) {
  // Only show for multi-platform reports
  if (
    !report.aggregatedAQV?.platformContributions ||
    report.aggregatedAQV.platformContributions.length < 2
  ) {
    return null
  }

  // Gate for Pro users only
  if (report.accessLevel === 'free') {
    return (
      <LockedSection
        title="Platform Contribution Analysis"
        description="See how each platform contributes to the composite AQV score with weighted breakdowns and visual analysis."
      />
    )
  }

  const contributions = report.aggregatedAQV.platformContributions
  
  // Find dominant platform
  const dominant = contributions.reduce((max, c) =>
    c.contributionPercent > max.contributionPercent ? c : max
  )

  return (
    <Card className="print-avoid-break">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Platform Contribution</CardTitle>
        <p className="text-xs text-muted-foreground">
          Weighted contribution of each platform to the composite AQV score
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Segmented Bar Visualization */}
        <div className="space-y-2">
          <div className="flex h-8 rounded-md overflow-hidden border">
            {contributions.map((c) => (
              <div
                key={c.platform}
                className="relative flex items-center justify-center transition-all"
                style={{
                  width: `${c.contributionPercent}%`,
                  backgroundColor: getPlatformColor(c.platform),
                  minWidth: c.contributionPercent > 5 ? undefined : "40px",
                }}
              >
                {c.contributionPercent >= 15 && (
                  <span
                    className="text-xs font-semibold"
                    style={{
                      color: c.platform === "tiktok" ? "#fff" : "#fff",
                    }}
                  >
                    {Math.round(c.contributionPercent)}%
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Platform Legend */}
          <div className="flex flex-wrap gap-4">
            {contributions.map((c) => (
              <div key={c.platform} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: getPlatformColor(c.platform) }}
                />
                <span className="text-sm font-medium">
                  {getPlatformDisplayName(c.platform)}
                </span>
                <span className="text-sm text-muted-foreground tabular-nums">
                  {c.contributionPercent.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Contribution Table */}
        <div className="border rounded-md overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-3 py-2 font-medium">Platform</th>
                <th className="text-right px-3 py-2 font-medium">Weight</th>
                <th className="text-right px-3 py-2 font-medium">Confidence</th>
                <th className="text-right px-3 py-2 font-medium">Contribution</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {contributions.map((c) => (
                <tr key={c.platform} className="hover:bg-muted/30">
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-sm"
                        style={{ backgroundColor: getPlatformColor(c.platform) }}
                      />
                      <span className="font-medium">
                        {getPlatformDisplayName(c.platform)}
                      </span>
                    </div>
                  </td>
                  <td className="text-right px-3 py-2 tabular-nums text-muted-foreground">
                    {(c.weight * 100).toFixed(1)}%
                  </td>
                  <td className="text-right px-3 py-2 tabular-nums text-muted-foreground">
                    {(c.confidence * 100).toFixed(0)}%
                  </td>
                  <td className="text-right px-3 py-2 tabular-nums font-semibold">
                    {c.contributionPercent.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Interpretation */}
        <p className="text-xs text-muted-foreground">
          <strong>{getPlatformDisplayName(dominant.platform)}</strong> contributes{" "}
          <strong>{dominant.contributionPercent.toFixed(1)}%</strong> to the
          composite AQV score, making it the dominant platform in this creator&apos;s
          cross-platform presence.
        </p>
      </CardContent>
    </Card>
  )
}

