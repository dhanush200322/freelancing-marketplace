"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { proposals } from "@/data/mockData"
import { ProposalStatusBadge } from "@/components/proposals/ProposalStatusBadge"
import { EmptyState } from "@/components/dashboard/EmptyState"
import { FileText, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { formatCurrency } from "@/lib/utils"

export default function DashboardProposalsPage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("All")

  const filteredProposals = proposals.filter((proposal) => {
    const matchesSearch = proposal.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          proposal.freelancerName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "All" || proposal.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1e293b] mb-2">Proposals</h1>
          <p className="text-[#64748b]">Review proposals from freelancers or manage your submitted proposals.</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-[#e2e8f0] shadow-sm mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8]" />
          <input 
            type="text" 
            placeholder="Search proposals by project or freelancer..." 
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
              <option value="Submitted">Submitted</option>
              <option value="Under Review">Under Review</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {filteredProposals.length > 0 ? (
        <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
                  <th className="py-4 px-6 font-bold text-[#1e293b] text-sm">Freelancer</th>
                  <th className="py-4 px-6 font-bold text-[#1e293b] text-sm">Project</th>
                  <th className="py-4 px-6 font-bold text-[#1e293b] text-sm">Budget</th>
                  <th className="py-4 px-6 font-bold text-[#1e293b] text-sm">Delivery</th>
                  <th className="py-4 px-6 font-bold text-[#1e293b] text-sm">Status</th>
                  <th className="py-4 px-6 font-bold text-[#1e293b] text-sm text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0]">
                {filteredProposals.map((proposal) => (
                  <tr key={proposal.id} className="hover:bg-[#f8fafc] transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        {proposal.freelancerAvatar && (
                          <Image src={proposal.freelancerAvatar} alt={proposal.freelancerName} width={32} height={32} className="rounded-full" />
                        )}
                        <span className="font-medium text-[#1e293b]">{proposal.freelancerName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-[#475569] text-sm truncate max-w-[200px]">{proposal.projectTitle}</td>
                    <td className="py-4 px-6 text-[#1e293b] font-medium">{formatCurrency(proposal.proposedBudget)}</td>
                    <td className="py-4 px-6 text-[#475569] text-sm">{proposal.estimatedDays} days</td>
                    <td className="py-4 px-6">
                      <ProposalStatusBadge status={proposal.status} />
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link href={`/proposal/${proposal.projectId}`}>
                        <Button variant="outline" size="sm" className="bg-white">View</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden divide-y divide-[#e2e8f0]">
            {filteredProposals.map((proposal) => (
              <div key={proposal.id} className="p-4 sm:p-6 space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-3">
                    {proposal.freelancerAvatar && (
                      <Image src={proposal.freelancerAvatar} alt={proposal.freelancerName} width={40} height={40} className="rounded-full" />
                    )}
                    <div>
                      <p className="font-medium text-[#1e293b]">{proposal.freelancerName}</p>
                      <p className="text-sm text-[#64748b] truncate max-w-[200px]">{proposal.projectTitle}</p>
                    </div>
                  </div>
                  <ProposalStatusBadge status={proposal.status} />
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm bg-[#f8fafc] p-3 rounded-xl border border-[#e2e8f0]">
                  <div>
                    <p className="text-xs text-[#94a3b8] mb-0.5">Budget</p>
                    <p className="font-bold text-[#1e293b]">{formatCurrency(proposal.proposedBudget)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#94a3b8] mb-0.5">Delivery</p>
                    <p className="font-medium text-[#475569]">{proposal.estimatedDays} days</p>
                  </div>
                </div>
                
                <Link href={`/proposal/${proposal.projectId}`} className="block w-full">
                  <Button variant="outline" className="w-full bg-white">View Details</Button>
                </Link>
              </div>
            ))}
          </div>

        </div>
      ) : (
        <EmptyState 
          icon={FileText}
          title="No proposals found"
          description="There are no proposals matching your current filters."
          secondaryAction={{
            label: "Clear Filters",
            href: "/dashboard/proposals"
          }}
        />
      )}

    </div>
  )
}
