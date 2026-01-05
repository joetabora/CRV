"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Sparkles, Check, ArrowRight } from "lucide-react"

interface LockedSectionProps {
  /** Section title */
  title: string
  /** Brief description of what this section contains */
  description: string
  /** Report ID for checkout session */
  reportId: string
  /** Optional: feature bullets to display */
  features?: string[]
  /** Optional: custom icon (defaults to section-appropriate icon) */
  icon?: React.ReactNode
}

/** Pro upgrade price */
const PRO_PRICE = "$29"

/** Default features if none provided */
const DEFAULT_FEATURES = [
  "Detailed analytics breakdown",
  "Actionable insights",
  "Data-driven recommendations",
]

/**
 * LockedSection Component
 * 
 * Displays a premium upgrade card for Pro-only features.
 * Includes feature bullets, pricing, and Stripe checkout CTA.
 */
export function LockedSection({ 
  title, 
  description, 
  reportId,
  features = DEFAULT_FEATURES,
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
    <Card className="print-avoid-break border-2 border-dashed border-violet-200 bg-gradient-to-br from-violet-50/50 to-indigo-50/50 no-print overflow-hidden">
      <CardContent className="py-8 px-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Left: Content */}
          <div className="flex-1">
            {/* Pro Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-xs font-medium mb-4">
              <Sparkles className="h-3 w-3" />
              Pro Feature
            </div>
            
            {/* Title & Description */}
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {description}
            </p>
            
            {/* Feature List */}
            <ul className="space-y-2">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Right: CTA */}
          <div className="flex flex-col items-center gap-3 md:min-w-[180px] w-full md:w-auto">
            <div className="text-center">
              <p className="text-2xl font-bold">{PRO_PRICE}</p>
              <p className="text-[11px] text-muted-foreground">one-time • instant access</p>
            </div>
            
            <Button 
              onClick={handleUpgrade}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  Unlock Section
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
            
            <p className="text-[10px] text-muted-foreground text-center">
              Unlocks all Pro features
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
