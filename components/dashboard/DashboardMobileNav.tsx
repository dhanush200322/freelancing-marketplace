"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Briefcase, FileText, Heart, Activity } from "lucide-react"

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/projects", label: "Projects", icon: Briefcase },
  { href: "/dashboard/proposals", label: "Proposals", icon: FileText },
  { href: "/dashboard/saved", label: "Saved", icon: Heart },
  { href: "/dashboard/activity", label: "Activity", icon: Activity },
]

export function DashboardMobileNav() {
  const pathname = usePathname()

  return (
    <div className="bg-white border-b border-[#e2e8f0] overflow-x-auto scrollbar-hide">
      <nav className="flex items-center px-4 py-2 min-w-max">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors mr-2 ${
                isActive 
                  ? "bg-[#ccfbf1]/50 text-[#0f766e]" 
                  : "text-[#475569] hover:bg-[#f1f5f9] hover:text-[#1e293b]"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <item.icon className={`mr-2 h-4 w-4 ${isActive ? "text-[#0f766e]" : "text-[#94a3b8]"}`} />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
