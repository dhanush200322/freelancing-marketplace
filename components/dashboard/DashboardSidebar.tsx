"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Briefcase, FileText, Heart, Activity } from "lucide-react"

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/projects", label: "My Projects", icon: Briefcase },
  { href: "/dashboard/proposals", label: "Proposals", icon: FileText },
  { href: "/dashboard/saved", label: "Saved Items", icon: Heart },
  { href: "/dashboard/activity", label: "Activity", icon: Activity },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="py-8 px-4 h-full flex flex-col">
      <div className="mb-8 px-4">
        <h2 className="text-xs font-bold text-[#64748b] uppercase tracking-wider">Dashboard</h2>
      </div>
      
      <nav className="space-y-1 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                isActive 
                  ? "bg-[#ccfbf1]/50 text-[#0f766e]" 
                  : "text-[#475569] hover:bg-[#f1f5f9] hover:text-[#1e293b]"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <item.icon className={`mr-3 h-5 w-5 ${isActive ? "text-[#0f766e]" : "text-[#94a3b8]"}`} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="mt-8 pt-8 border-t border-[#e2e8f0] px-4">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://i.pravatar.cc/150?u=demo" alt="Demo User" className="w-10 h-10 rounded-full border border-[#e2e8f0]" />
          <div>
            <p className="text-sm font-bold text-[#1e293b]">Demo User</p>
            <p className="text-xs text-[#64748b]">Client & Freelancer</p>
          </div>
        </div>
      </div>
    </div>
  )
}
