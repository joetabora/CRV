import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { upgradeReportToPro } from '@/lib/mock-data'

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
})

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const searchParams = request.nextUrl.searchParams
  const sessionId = searchParams.get('session_id')
  const reportId = params.id

  if (!sessionId) {
    // No session ID, redirect back to report
    return NextResponse.redirect(new URL(`/reports/${reportId}`, request.url))
  }

  try {
    // Verify the Stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status === 'paid') {
      // Payment successful - upgrade the report
      upgradeReportToPro(reportId)
      
      // Redirect to report with success flag
      return NextResponse.redirect(
        new URL(`/reports/${reportId}?upgraded=true`, request.url)
      )
    } else {
      // Payment not completed
      return NextResponse.redirect(
        new URL(`/reports/${reportId}?error=payment_incomplete`, request.url)
      )
    }
  } catch (error) {
    console.error('Stripe session verification error:', error)
    return NextResponse.redirect(
      new URL(`/reports/${reportId}?error=verification_failed`, request.url)
    )
  }
}

