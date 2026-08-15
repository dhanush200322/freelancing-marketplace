"use client"

import * as React from "react"
import { StatsCard } from "@/components/dashboard/StatsCard"
import { QuickActions } from "@/components/dashboard/QuickActions"
import { ActiveProjects } from "@/components/dashboard/ActiveProjects"
import { RecentProposals } from "@/components/dashboard/RecentProposals"
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline"
import { Briefcase, FileText, CheckCircle2, Heart } from "lucide-react"
import { projects, proposals, savedProjects, savedFreelancers, activities } from "@/data/mockData"

export default function DashboardOverviewPage() {
  
  // Calculate mock stats based on our data
  const activeProjectsCount = projects.filter(p => p.status === "Open" || p.status === "In Progress").length
  const completedProjects = projects.filter(p => p.status === "Completed").length
  
  const totalProposals = proposals.length
  
  const totalSaved = savedProjects.length + savedFreelancers.length

  const stats = [
    { label: "Active Projects", value: activeProjectsCount, icon: Briefcase, description: "Currently open or in progress" },
    { label: "Total Proposals", value: totalProposals, icon: FileText, description: "Proposals submitted or received" },
    { label: "Completed Work", value: completedProjects, icon: CheckCircle2, description: "Successfully finished projects" },
    { label: "Saved Items", value: totalSaved, icon: Heart, description: "Freelancers and projects saved" }
  ]

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-10">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#1e293b] mb-2">Good morning, Demo User</h1>
        <p className="text-[#64748b] text-lg">Here&apos;s what&apos;s happening across your marketplace activity.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatsCard key={stat.label} {...stat} index={idx} />
        ))}
      </div>

      {/* Quick Actions */}
      <section>
        <h2 className="text-xl font-bold text-[#1e293b] mb-4">Quick Actions</h2>
        <QuickActions />
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-8">
          <ActiveProjects />
          <RecentProposals />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-5 xl:col-span-4">
          <ActivityTimeline activities={activities.slice(0, 5)} />
        </div>
        
      </div>
    </div>
  )
}
