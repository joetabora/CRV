"use client"

import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LogOut, Plus } from "lucide-react"

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center gap-2 mr-8">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">CRV</span>
            </div>
            <span className="font-semibold hidden sm:inline-block">Creator Valuation Reports</span>
          </Link>
        </div>
        
        <nav className="flex items-center gap-6 text-sm">
          <Link 
            href="/dashboard" 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Dashboard
          </Link>
          <Link 
            href="/reports/new" 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            New Report
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <Link href="/reports/new">
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Generate Report</span>
            </Button>
          </Link>
          
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">
                {session?.user?.name?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => signOut({ callbackUrl: "/login" })}
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

