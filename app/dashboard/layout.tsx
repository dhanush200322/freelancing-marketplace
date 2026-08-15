import * as React from "react"
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"
import { DashboardMobileNav } from "@/components/dashboard/DashboardMobileNav"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#f8fafc] min-h-[calc(100vh-64px)] flex flex-col md:flex-row">
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <DashboardMobileNav />
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 shrink-0 bg-white border-r border-[#e2e8f0] min-h-[calc(100vh-64px)] sticky top-16">
        <DashboardSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-x-hidden">
        {children}
      </div>
    </div>
  )
}
