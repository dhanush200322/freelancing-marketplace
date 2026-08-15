"use client"

import * as React from "react"
import { projects } from "@/data/mockData"
import { ProjectCard } from "@/components/projects/ProjectCard"
import { EmptyState } from "@/components/dashboard/EmptyState"
import { Briefcase, Search, Filter } from "lucide-react"

export default function DashboardProjectsPage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("All")

  // Filter projects (assuming demo user owns all mock projects for this demo)
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "All" || project.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1e293b] mb-2">My Projects</h1>
          <p className="text-[#64748b]">Manage your posted projects and track their progress.</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-[#e2e8f0] shadow-sm mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8]" />
          <input 
            type="text" 
            placeholder="Search projects..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e2e8f0] focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] transition-colors"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 md:w-auto">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-48 pl-9 pr-4 py-3 rounded-xl border border-[#e2e8f0] bg-white text-[#475569] appearance-none focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e]"
            >
              <option value="All">All Statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <EmptyState 
          icon={Briefcase}
          title="No projects found"
          description="You haven't posted any projects matching these filters yet."
          primaryAction={{
            label: "Post a Project",
            href: "/proposal/new"
          }}
          secondaryAction={{
            label: "Clear Filters",
            href: "/dashboard/projects"
          }}
        />
      )}

    </div>
  )
}
