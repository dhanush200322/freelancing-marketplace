import * as React from "react"
import { Project } from "@/types"
import { formatCurrency } from "@/lib/utils"
import { Clock, Calendar, Award, Users } from "lucide-react"
import Image from "next/image"

interface ProposalProjectSummaryProps {
  project: Project;
}

export function ProposalProjectSummary({ project }: ProposalProjectSummaryProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 lg:p-8 shadow-sm h-full flex flex-col">
      <div className="mb-6 pb-6 border-b border-[#e2e8f0]">
        <h2 className="text-sm font-bold text-[#64748b] uppercase tracking-wider mb-2">Applying to Project</h2>
        <h1 className="text-2xl lg:text-3xl font-bold text-[#1e293b]">{project.title}</h1>
      </div>

      <div className="space-y-6 flex-1">
        <div>
          <h3 className="font-bold text-[#1e293b] mb-2">About the Client</h3>
          <div className="flex items-center gap-3">
            <Image 
              src={project.clientAvatar} 
              alt={project.clientName} 
              width={40} 
              height={40} 
              className="rounded-full border border-[#e2e8f0]" 
            />
            <div>
              <p className="font-semibold text-[#1e293b] text-sm">{project.clientName}</p>
              {project.clientCompany && (
                <p className="text-xs text-[#475569]">{project.clientCompany}</p>
              )}
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-[#1e293b] mb-2">Project Details</h3>
          <div className="grid gap-3">
            <div className="flex items-start">
              <Clock className="w-4 h-4 text-[#94a3b8] mr-3 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-[#64748b]">Budget</p>
                <p className="text-sm font-semibold text-[#1e293b]">{formatCurrency(project.budgetMin)} - {formatCurrency(project.budgetMax)}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Award className="w-4 h-4 text-[#94a3b8] mr-3 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-[#64748b]">Experience Level</p>
                <p className="text-sm font-semibold text-[#1e293b]">{project.experienceLevel}</p>
              </div>
            </div>

            <div className="flex items-start">
              <Calendar className="w-4 h-4 text-[#94a3b8] mr-3 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-[#64748b]">Deadline</p>
                <p className="text-sm font-semibold text-[#1e293b]">
                  {new Date(project.deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Users className="w-4 h-4 text-[#94a3b8] mr-3 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-[#64748b]">Activity</p>
                <p className="text-sm font-semibold text-[#1e293b]">{project.proposals} proposals</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-[#1e293b] mb-2">Required Skills</h3>
          <div className="flex flex-wrap gap-2">
            {project.skills.map((skill) => (
              <span key={skill} className="px-2.5 py-1 bg-[#f1f5f9] border border-[#e2e8f0] text-[#475569] text-xs rounded-md font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-[#e2e8f0] bg-[#f8fafc] -mx-6 lg:-mx-8 -mb-6 lg:-mb-8 px-6 lg:px-8 py-6 rounded-b-2xl">
        <p className="text-sm text-[#475569] leading-relaxed line-clamp-4">
          <span className="font-semibold text-[#1e293b]">Description:</span> {project.shortDescription}
        </p>
      </div>
    </div>
  )
}
