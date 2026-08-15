"use client"

import * as React from "react"
import Link from "next/link"
import { projects } from "@/data/mockData"
import { formatCurrency } from "@/lib/utils"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Clock, MoreHorizontal } from "lucide-react"

export function ActiveProjects() {
  const activeProjects = projects.filter(p => p.status === "Open" || p.status === "In Progress").slice(0, 3)

  return (
    <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-[#e2e8f0] flex justify-between items-center bg-[#f8fafc]/50">
        <h3 className="font-bold text-[#1e293b]">Active Projects</h3>
        <Link href="/dashboard/projects" className="text-sm font-medium text-[#0f766e] hover:text-[#0d9488]">
          View All
        </Link>
      </div>
      
      {activeProjects.length > 0 ? (
        <div className="divide-y divide-[#e2e8f0]">
          {activeProjects.map((project) => (
            <div key={project.id} className="p-6 hover:bg-[#f8fafc] transition-colors flex flex-col sm:flex-row gap-4 sm:items-center justify-between group">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-bold text-[#1e293b] truncate max-w-[200px] sm:max-w-xs">{project.title}</h4>
                  <Badge className={
                    project.status === "Open" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" :
                    "bg-blue-100 text-blue-700 hover:bg-blue-100"
                  }>{project.status}</Badge>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#64748b]">
                  <span className="flex items-center text-[#1e293b]">
                    {formatCurrency(project.budgetMin)} - {formatCurrency(project.budgetMax)}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1" />
                    Due {new Date(project.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <span>{project.proposals} Proposals</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Link href={`/projects/${project.id}`}>
                  <Button variant="outline" size="sm" className="bg-white">
                    View
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" className="px-2 text-[#94a3b8] hover:text-[#1e293b]">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center text-[#64748b]">
          <p>No active projects found.</p>
        </div>
      )}
    </div>
  )
}
