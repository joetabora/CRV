"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, Loader2, Sparkles } from "lucide-react"

interface LockedSectionProps {
  /** Section title */
  title: string
  /** Brief description of what this section contains */
  description: string
  /** Report ID for checkout session */
  reportId: string
  /** Optional: custom icon (defaults to Lock) */
  icon?: React.ReactNode
}

/** Pro upgrade price */
const PRO_PRICE = "$29"

/**
 * LockedSection Component
 * 
 * Displays a gated section placeholder for Pro-only features.
 * Shows a brief description of the locked content with a Stripe checkout CTA.
 */
export function LockedSection({ 
  title, 
  description, 
  reportId,
  icon,
}: LockedSectionProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleUpgrade = async () => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reportId }),
      })

      const data = await response.json()

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url
      } else {
        console.error('No checkout URL returned')
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Checkout error:', error)
      setIsLoading(false)
    }
  }

  return (
    <Card className="print-avoid-break border-dashed bg-muted/20 no-print">
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
            <Sparkles className="h-3 w-3" />
            Pro Feature
          </span>
          
          {/* CTA Button */}
          <Button 
            variant="default" 
            size="sm"
            onClick={handleUpgrade}
            disabled={isLoading}
            className="mt-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Redirecting...
              </>
            ) : (
              <>
                Upgrade to Pro – {PRO_PRICE}
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
