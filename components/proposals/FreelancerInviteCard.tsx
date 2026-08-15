import * as React from "react"
import { Freelancer } from "@/types"
import { Star, MapPin, CheckCircle2 } from "lucide-react"
import Image from "next/image"

interface FreelancerInviteCardProps {
  freelancer: Freelancer;
}

export function FreelancerInviteCard({ freelancer }: FreelancerInviteCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 lg:p-8 shadow-sm h-full flex flex-col">
      <div className="mb-6 pb-6 border-b border-[#e2e8f0]">
        <h2 className="text-sm font-bold text-[#64748b] uppercase tracking-wider mb-2">Inviting to Project</h2>
        <div className="flex items-start gap-4 mt-4">
          <Image 
            src={freelancer.avatar} 
            alt={freelancer.name} 
            width={64} 
            height={64} 
            className="rounded-full border border-[#e2e8f0]" 
          />
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-[#1e293b]">{freelancer.name}</h1>
            <p className="text-sm font-medium text-[#0f766e]">{freelancer.title}</p>
          </div>
        </div>
      </div>

      <div className="space-y-6 flex-1">
        <div>
          <h3 className="font-bold text-[#1e293b] mb-2">Freelancer Profile</h3>
          <div className="grid gap-3">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[#f59e0b] fill-current" />
              <span className="text-sm font-bold text-[#1e293b]">{freelancer.rating} <span className="font-normal text-[#64748b]">({freelancer.reviewCount} reviews)</span></span>
            </div>
            
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#94a3b8]" />
              <span className="text-sm text-[#475569]">{freelancer.location}</span>
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#94a3b8]" />
              <span className="text-sm text-[#475569]">{freelancer.completedProjects} Completed Projects</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-[#1e293b] mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {freelancer.skills.map((skill) => (
              <span key={skill} className="px-2.5 py-1 bg-[#f1f5f9] border border-[#e2e8f0] text-[#475569] text-xs rounded-md font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-[#e2e8f0] bg-[#f8fafc] -mx-6 lg:-mx-8 -mb-6 lg:-mb-8 px-6 lg:px-8 py-6 rounded-b-2xl">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-[#64748b]">Hourly Rate</span>
          <span className="text-xl font-bold text-[#1e293b]">${freelancer.hourlyRate}/hr</span>
        </div>
      </div>
    </div>
  )
}
