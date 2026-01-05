"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Header } from "@/components/layout/header"
import { Loader2, Sparkles } from "lucide-react"
import { generateNewReport } from "@/lib/mock-data"

export default function NewReportPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [creatorUrl, setCreatorUrl] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    // Simulate report generation delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate report with ONLY the provided platform URL
    const report = generateNewReport(creatorUrl)
    
    // Redirect to the generated report
    router.push(`/reports/${report.id}`)
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="container py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Generate New Report</h1>
            <p className="text-muted-foreground mt-1">
              Enter a Twitch creator URL or username to generate a valuation report
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Creator Valuation
              </CardTitle>
              <CardDescription>
                Our AQV™ algorithm analyzes audience quality, engagement, and monetization potential
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="creatorUrl">Twitch URL or Username</Label>
                  <Input
                    id="creatorUrl"
                    name="creatorUrl"
                    type="text"
                    placeholder="https://twitch.tv/username or @username"
                    value={creatorUrl}
                    onChange={(e) => setCreatorUrl(e.target.value)}
                    required
                    className="text-base"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter the full URL or just the username (e.g., @streamerpro)
                  </p>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <h4 className="text-sm font-medium">What's included in the report:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• AQV™ Score with component breakdown</li>
                    <li>• Estimated sponsorship value range</li>
                    <li>• Peer benchmarking and positioning</li>
                    <li>• Monetization opportunities</li>
                    <li>• Actionable recommendations</li>
                  </ul>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading || !creatorUrl}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Report...
                    </>
                  ) : (
                    "Generate Report"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <p className="text-xs text-muted-foreground text-center mt-6">
            Report generation typically takes 30-60 seconds. Data is sourced from public APIs.
          </p>
        </div>
      </main>
    </div>
  )
}

