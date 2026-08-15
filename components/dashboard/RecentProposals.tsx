"use client"

import * as React from "react"
import Link from "next/link"
import { proposals } from "@/data/mockData"
import { ProposalStatusBadge } from "@/components/proposals/ProposalStatusBadge"
import { Button } from "@/components/ui/Button"
import Image from "next/image"

export function RecentProposals() {
  const recentProposals = proposals.slice(0, 3)

  return (
    <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-[#e2e8f0] flex justify-between items-center bg-[#f8fafc]/50">
        <h3 className="font-bold text-[#1e293b]">Recent Proposals</h3>
        <Link href="/dashboard/proposals" className="text-sm font-medium text-[#0f766e] hover:text-[#0d9488]">
          View All
        </Link>
      </div>
      
      {recentProposals.length > 0 ? (
        <div className="divide-y divide-[#e2e8f0]">
          {recentProposals.map((proposal) => (
            <div key={proposal.id} className="p-6 hover:bg-[#f8fafc] transition-colors flex flex-col sm:flex-row gap-4 sm:items-center justify-between group">
              <div className="flex items-start gap-4 flex-1">
                {proposal.freelancerAvatar && (
                  <Image 
                    src={proposal.freelancerAvatar} 
                    alt={proposal.freelancerName} 
                    width={40} 
                    height={40} 
                    className="rounded-full border border-[#e2e8f0] hidden sm:block mt-1" 
                  />
                )}
                <div>
                  <h4 className="font-bold text-[#1e293b] truncate max-w-[200px] sm:max-w-xs">{proposal.projectTitle}</h4>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
                    <span className="text-xs font-medium text-[#475569]">{proposal.freelancerName}</span>
                    <span className="text-xs font-bold text-[#1e293b]">${proposal.proposedBudget.toLocaleString()}</span>
                    <span className="text-xs text-[#64748b]">{proposal.estimatedDays} days</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <ProposalStatusBadge status={proposal.status} />
                <Link href={`/proposal/${proposal.projectId}`} className="hidden sm:block">
                  <Button variant="outline" size="sm" className="bg-white">
                    Details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center text-[#64748b]">
          <p>No recent proposals found.</p>
        </div>
      )}
    </div>
  )
}
