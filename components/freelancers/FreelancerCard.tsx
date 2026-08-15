"use client"

import * as React from "react"
import Link from "next/link"
import { Freelancer } from "@/types"
import { Heart, Star, MapPin, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { formatCurrency } from "@/lib/utils"

interface FreelancerCardProps {
  freelancer: Freelancer
}

export function FreelancerCard({ freelancer }: FreelancerCardProps) {
  const [isSaved, setIsSaved] = React.useState(false)

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsSaved(!isSaved)
  }

  return (
    <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 hover:shadow-xl hover:shadow-teal-900/5 hover:border-[#0f766e]/30 transition-all duration-300 flex flex-col h-full group">
      
      <div className="flex items-start justify-between mb-4">
        <div className="flex gap-4">
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={freelancer.avatar} 
              alt={freelancer.name} 
              className="w-16 h-16 rounded-full object-cover border border-[#e2e8f0]"
            />
            <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${freelancer.availability === 'Available Now' ? 'bg-emerald-500' : 'bg-amber-500'}`} title={freelancer.availability}></span>
          </div>
          
          <div>
            <Link href={`/freelancers/${freelancer.id}`} className="hover:text-[#0f766e] transition-colors">
              <h3 className="text-lg font-bold text-[#1e293b]">{freelancer.name}</h3>
            </Link>
            <p className="text-sm font-medium text-[#0f766e]">{freelancer.title}</p>
            
            <div className="flex items-center gap-3 mt-1.5 text-xs text-[#64748b]">
              <div className="flex items-center gap-1 text-[#f59e0b] font-medium">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{freelancer.rating}</span>
                <span className="text-[#94a3b8] font-normal">({freelancer.reviewCount})</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {freelancer.location.split(",")[0]}
              </div>
            </div>
          </div>
        </div>
        
        <button 
          onClick={handleSave}
          className={`p-2 rounded-full transition-colors ${isSaved ? 'bg-rose-50 text-rose-500' : 'text-[#94a3b8] hover:bg-[#f8fafc] hover:text-[#0f766e]'}`}
          aria-label={isSaved ? "Unsave freelancer" : "Save freelancer"}
        >
          <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
        </button>
      </div>

      <p className="text-[#475569] text-sm mb-4 line-clamp-2 leading-relaxed">
        {freelancer.bio}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {freelancer.skills.slice(0, 4).map(skill => (
          <span key={skill} className="px-2 py-1 bg-[#f8fafc] border border-[#e2e8f0] rounded-md text-xs font-medium text-[#475569]">
            {skill}
          </span>
        ))}
        {freelancer.skills.length > 4 && (
          <span className="px-2 py-1 bg-[#f8fafc] border border-[#e2e8f0] rounded-md text-xs font-medium text-[#94a3b8]">
            +{freelancer.skills.length - 4}
          </span>
        )}
      </div>

      <div className="mt-auto pt-4 border-t border-[#e2e8f0] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-xs text-[#64748b] mb-0.5">Rate</p>
            <p className="text-sm font-bold text-[#1e293b]">{formatCurrency(freelancer.hourlyRate)}/hr</p>
          </div>
          <div>
            <p className="text-xs text-[#64748b] mb-0.5">Projects</p>
            <p className="text-sm font-bold text-[#1e293b] flex items-center gap-1">
              <Briefcase className="w-3 h-3 text-[#94a3b8]" />
              {freelancer.completedProjects}
            </p>
          </div>
        </div>
        
        <Link href={`/freelancers/${freelancer.id}`}>
          <Button size="sm" variant="outline" className="group-hover:bg-[#0f766e] group-hover:text-white group-hover:border-[#0f766e] transition-colors">
            View Profile
          </Button>
        </Link>
      </div>
      
    </div>
  )
}
