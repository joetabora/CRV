"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"

interface LockedSectionProps {
  /** Section title */
  title: string
  /** Brief description of what this section contains */
  description: string
  /** Optional: custom icon (defaults to Lock) */
  icon?: React.ReactNode
  /** Optional: callback when upgrade button is clicked */
  onUpgrade?: () => void
}

/**
 * LockedSection Component
 * 
 * Displays a gated section placeholder for Pro-only features.
 * Shows a brief description of the locked content with an upgrade CTA.
 */
export function LockedSection({ 
  title, 
  description, 
  icon,
  onUpgrade 
}: LockedSectionProps) {
  const handleUpgrade = () => {
    if (onUpgrade) {
      onUpgrade()
    } else {
      // Default behavior: could link to pricing page
      console.log('Upgrade clicked')
    }
  }

  return (
    <Card className="print-avoid-break border-dashed bg-muted/20">
      <CardContent className="py-8">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Lock Icon */}
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
            {icon || <Lock className="h-6 w-6 text-muted-foreground" />}
          </div>
          
          {/* Title */}
          <div className="space-y-1">
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              {description}
            </p>
          </div>
          
          {/* Pro Badge */}
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
            <Lock className="h-3 w-3" />
            Pro Feature
          </span>
          
          {/* CTA Button */}
          <Button 
            variant="default" 
            size="sm"
            onClick={handleUpgrade}
            className="mt-2"
          >
            Upgrade to Pro
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

