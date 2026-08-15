"use client"

import * as React from "react"
import { activities } from "@/data/mockData"
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline"
import { Filter } from "lucide-react"
import { EmptyState } from "@/components/dashboard/EmptyState"
import { Activity } from "lucide-react"

export default function DashboardActivityPage() {
  const [typeFilter, setTypeFilter] = React.useState("All")

  const filteredActivities = activities.filter((activity) => {
    if (typeFilter === "All") return true
    if (typeFilter === "Projects") return activity.relatedType === "Project"
    if (typeFilter === "Proposals") return activity.relatedType === "Proposal" || activity.type.includes("Proposal")
    if (typeFilter === "Freelancers") return activity.relatedType === "Freelancer"
    return true
  })

  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1e293b] mb-2">Activity History</h1>
          <p className="text-[#64748b]">A complete log of your interactions on WorkMarket.</p>
        </div>
        
        <div className="relative w-full sm:w-auto">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full sm:w-48 pl-9 pr-4 py-2 rounded-xl border border-[#e2e8f0] bg-white text-[#475569] appearance-none focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e]"
          >
            <option value="All">All Activity</option>
            <option value="Projects">Projects</option>
            <option value="Proposals">Proposals</option>
            <option value="Freelancers">Freelancers</option>
          </select>
        </div>
      </div>

      {filteredActivities.length > 0 ? (
        <ActivityTimeline activities={filteredActivities} />
      ) : (
        <EmptyState 
          icon={Activity}
          title="No activity found"
          description="There is no activity matching your current filter."
          secondaryAction={{
            label: "Clear Filters",
            href: "/dashboard/activity"
          }}
        />
      )}

    </div>
  )
}
