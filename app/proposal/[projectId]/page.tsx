import * as React from "react"
import { notFound } from "next/navigation"
import { projects } from "@/data/mockData"
import { ProposalProjectSummary } from "@/components/proposals/ProposalProjectSummary"
import { ProposalForm } from "@/components/proposals/ProposalForm"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function SubmitProposalPage({ params }: { params: Promise<{ projectId: string }> }) {
  const resolvedParams = await params
  const project = projects.find(p => p.id === resolvedParams.projectId)

  if (!project) {
    notFound()
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen py-12 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-8">
          <Link href={`/projects/${project.id}`} className="inline-flex items-center text-sm font-medium text-[#475569] hover:text-[#0f766e] transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to project details
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Project Summary */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24">
            <ProposalProjectSummary project={project} />
          </div>

          {/* Right Column: Proposal Form */}
          <div className="lg:col-span-7 xl:col-span-8">
            <ProposalForm project={project} />
          </div>

        </div>
      </div>
    </div>
  )
}
