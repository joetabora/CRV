# CRV – Creator Valuation Reports

Enterprise-grade analytics web application for generating professional creator valuation reports.

## Overview

CRV provides institutional-quality valuation reports for Twitch creators, featuring:

- **AQV™ Score**: Composite metric measuring audience quality value
- **Monetization Analysis**: Sponsorship value estimates and CPM ranges
- **Peer Benchmarking**: Performance comparison against similar creators
- **Actionable Recommendations**: Strategic guidance for optimization

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Authentication**: NextAuth.js
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/joetabora/CRV.git
cd CVR

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your NEXTAUTH_SECRET

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Environment Variables

Create a `.env.local` file with:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

Generate a secret with:
```bash
openssl rand -base64 32
```

## Project Structure

```
├── app/
│   ├── api/
│   │   └── auth/          # NextAuth API routes
│   ├── dashboard/         # Dashboard page
│   ├── login/             # Login page
│   ├── reports/
│   │   ├── new/           # Report generation
│   │   └── [id]/          # Report view
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home redirect
├── components/
│   ├── layout/            # Layout components
│   ├── report/            # Report components
│   │   └── sections/      # Report section components
│   └── ui/                # shadcn/ui components
├── lib/
│   ├── auth.ts            # NextAuth configuration
│   ├── mock-data.ts       # Mock report data
│   ├── types.ts           # TypeScript types
│   └── utils.ts           # Utility functions
└── middleware.ts          # Auth middleware
```

## Features

### Authentication
- Credentials-based authentication
- Protected routes via middleware
- Session management with JWT

### Dashboard
- List of generated reports
- Quick stats overview
- Report management

### Report Generation
- Input Twitch URL or username
- Mock data generation (production would use real APIs)

### Report View
- **Executive Snapshot**: KPI cards, brand insights
- **AQV™ Breakdown**: Component scores, visualization
- **Monetization Potential**: Value estimates, format fit
- **Peer Benchmarking**: Quartile comparisons
- **Actionable Recommendations**: Priority actions
- **Methodology Appendix**: Technical documentation

### PDF Export
- Print-optimized layout
- Browser print to PDF
- (Production: Puppeteer/Playwright integration)

## Design Principles

Following enterprise SaaS patterns inspired by:
- Stripe Dashboard
- Vercel Analytics
- Linear.app
- OpenAI platform

Key principles:
- Institutional, trustworthy aesthetic
- Minimal, high-signal UI
- Executive-ready reports
- Zero visual clutter

## Deployment

Deploy to Vercel:

```bash
npm run build
vercel deploy
```

Or connect your GitHub repository to Vercel for automatic deployments.

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

## License

Private and confidential. All rights reserved.

