"use client"

import * as React from "react"
import { Project } from "@/types"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { formatCurrency } from "@/lib/utils"
import { Clock, Users, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isSaved, setIsSaved] = React.useState(false)

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsSaved(!isSaved)
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 hover:border-[#0f766e]/30 transition-all duration-300 group">
      <div className="p-5 sm:p-6 flex-1 flex flex-col relative">
        {/* Save Button */}
        <button 
          onClick={toggleSave}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-[#94a3b8] hover:text-[#f43f5e] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0f766e]"
          aria-label={isSaved ? "Remove from saved projects" : "Save project"}
        >
          <Heart className={`h-5 w-5 transition-colors ${isSaved ? "fill-[#f43f5e] text-[#f43f5e]" : ""}`} />
        </button>

        <div className="flex flex-wrap gap-2 items-center pr-10 mb-4">
          <Badge variant="secondary" className="bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]">{project.category}</Badge>
          <Badge variant="outline" className="border-[#0f766e]/20 text-[#0f766e] bg-[#ccfbf1]/30">{project.experienceLevel}</Badge>
        </div>
        
        <h3 className="text-xl font-bold text-[#1e293b] mb-2 group-hover:text-[#0f766e] transition-colors">
          <Link href={`/projects/${project.id}`}>{project.title}</Link>
        </h3>
        
        <span className="text-xs font-medium text-[#64748b] flex items-center mb-4">
          <Clock className="mr-1 h-3.5 w-3.5" />
          Posted {new Date(project.postedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </span>
        
        <p className="text-sm text-[#475569] mb-6 flex-1">
          {project.shortDescription}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.skills.slice(0, 4).map((skill) => (
            <span key={skill} className="text-xs font-medium text-[#475569] bg-[#f8fafc] px-2.5 py-1 rounded-md border border-[#e2e8f0]">
              {skill}
            </span>
          ))}
          {project.skills.length > 4 && (
            <span className="text-xs font-medium text-[#475569] bg-[#f8fafc] px-2.5 py-1 rounded-md border border-[#e2e8f0]">
              +{project.skills.length - 4}
            </span>
          )}
        </div>
      </div>
      
      <div className="px-5 sm:px-6 py-4 border-t border-[#e2e8f0] bg-[#f8fafc]/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Image src={project.clientAvatar} alt={project.clientName} width={32} height={32} className="rounded-full border border-[#e2e8f0]" />
            <div className="flex flex-col">
              <span className="text-xs font-medium text-[#1e293b] truncate max-w-[120px] sm:max-w-[150px]">{project.clientName}</span>
              {project.clientCompany && (
                <span className="text-[10px] text-[#64748b] truncate max-w-[120px] sm:max-w-[150px]">{project.clientCompany}</span>
              )}
            </div>
          </div>
          <div className="flex items-center text-xs font-medium text-[#64748b]">
            <Users className="w-3.5 h-3.5 mr-1" />
            {project.proposals} proposals
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-slate-200/60">
          <div>
            <p className="text-[10px] text-[#64748b] font-medium uppercase tracking-wider mb-0.5">Budget</p>
            <p className="text-base font-bold text-[#1e293b]">
              {formatCurrency(project.budgetMin)} - {formatCurrency(project.budgetMax)}
            </p>
          </div>
          <Link href={`/projects/${project.id}`}>
            <Button size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
              View Project
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
