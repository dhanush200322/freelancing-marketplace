import * as React from "react"
import { notFound } from "next/navigation"
import { freelancers } from "@/data/mockData"
import { FreelancerInviteCard } from "@/components/proposals/FreelancerInviteCard"
import { InviteForm } from "@/components/proposals/InviteForm"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function InviteFreelancerPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ freelancer?: string }> 
}) {
  const resolvedParams = await searchParams
  const freelancerId = resolvedParams.freelancer

  if (!freelancerId) {
    notFound()
  }

  const freelancer = freelancers.find(f => f.id === freelancerId)

  if (!freelancer) {
    notFound()
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen py-12 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-8">
          <Link href={`/freelancers/${freelancer.id}`} className="inline-flex items-center text-sm font-medium text-[#475569] hover:text-[#0f766e] transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to freelancer profile
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Freelancer Summary */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24">
            <FreelancerInviteCard freelancer={freelancer} />
          </div>

          {/* Right Column: Invite Form */}
          <div className="lg:col-span-7 xl:col-span-8">
            <InviteForm freelancer={freelancer} />
          </div>

        </div>
      </div>
    </div>
  )
}
