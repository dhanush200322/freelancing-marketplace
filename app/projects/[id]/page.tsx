import * as React from "react"
import Image from "next/image"
import { notFound } from "next/navigation"
import Link from "next/link"
import { projects } from "@/data/mockData"
import { formatCurrency } from "@/lib/utils"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { ArrowLeft, MapPin, Clock, Calendar, Users, Award, Heart, Share2 } from "lucide-react"

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const project = projects.find(p => p.id === resolvedParams.id)
  
  if (!project) {
    notFound()
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      {/* Hero Section */}
      <div className="bg-white border-b border-[#e2e8f0] pt-12 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <Link href="/projects" className="inline-flex items-center text-sm font-medium text-[#475569] hover:text-[#0f766e] mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to projects
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary" className="bg-[#f1f5f9] text-[#475569]">{project.category}</Badge>
                <Badge className={
                  project.status === "Open" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" :
                  project.status === "In Progress" ? "bg-blue-100 text-blue-700 hover:bg-blue-100" :
                  "bg-slate-100 text-slate-700 hover:bg-slate-100"
                }>{project.status}</Badge>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e293b] mb-6 tracking-tight">
                {project.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-[#475569]">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Posted {new Date(project.postedAt).toLocaleDateString('en-US')}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Remote
                </div>
                <div className="flex items-center">
                  <Award className="w-4 h-4 mr-2" />
                  {project.experienceLevel} Level
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 shrink-0">
              <Button variant="outline" className="bg-white">
                <Heart className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" className="bg-white">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl mt-10">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Main Content */}
          <div className="flex-1 space-y-12">
            
            <section>
              <h2 className="text-2xl font-bold text-[#1e293b] mb-4">Project Description</h2>
              <div className="prose prose-slate max-w-none text-[#475569] leading-relaxed">
                {project.description.split('\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-[#1e293b] mb-4">Skills & Expertise Required</h2>
              <div className="flex flex-wrap gap-2">
                {project.skills.map(skill => (
                  <span key={skill} className="px-4 py-2 bg-white border border-[#e2e8f0] rounded-lg text-sm font-medium text-[#475569]">
                    {skill}
                  </span>
                ))}
              </div>
            </section>

          </div>
          
          {/* Sidebar */}
          <div className="w-full lg:w-80 shrink-0 space-y-6">
            
            {/* CTA Box */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm">
              <div className="mb-6">
                <p className="text-sm font-medium text-[#64748b] uppercase tracking-wider mb-1">Budget</p>
                <div className="text-3xl font-bold text-[#1e293b]">
                  {formatCurrency(project.budgetMin)} <span className="text-xl text-[#94a3b8] font-normal">-</span> {formatCurrency(project.budgetMax)}
                </div>
              </div>
              
              <Link href={`/proposal/${project.id}`} className="block w-full">
                <Button className="w-full py-6 text-lg shadow-lg shadow-[#0f766e]/20 hover:shadow-xl hover:shadow-[#0f766e]/30 transition-all">
                  Submit a Proposal
                </Button>
              </Link>
              <p className="text-xs text-center text-[#64748b] mt-4">
                You will be able to review your proposal before submission.
              </p>
            </div>
            
            {/* Project Details Box */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm space-y-6">
              <h3 className="font-bold text-[#1e293b] text-lg">Project Details</h3>
              
              <div className="flex items-start">
                <Calendar className="w-5 h-5 text-[#94a3b8] mr-3 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-[#1e293b]">Deadline</p>
                  <p className="text-sm text-[#475569]">{new Date(project.deadline).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Award className="w-5 h-5 text-[#94a3b8] mr-3 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-[#1e293b]">Experience Level</p>
                  <p className="text-sm text-[#475569]">{project.experienceLevel}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Users className="w-5 h-5 text-[#94a3b8] mr-3 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-[#1e293b]">Proposals Submitted</p>
                  <p className="text-sm text-[#475569]">{project.proposals} proposals</p>
                </div>
              </div>
            </div>
            
            {/* Client Box */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm">
              <h3 className="font-bold text-[#1e293b] text-lg mb-6">About the Client</h3>
              <div className="flex items-center gap-4 mb-4">
                <Image src={project.clientAvatar} alt={project.clientName} width={56} height={56} className="rounded-full border border-[#e2e8f0]" />
                <div>
                  <p className="font-bold text-[#1e293b]">{project.clientName}</p>
                  {project.clientCompany && (
                    <p className="text-sm text-[#475569]">{project.clientCompany}</p>
                  )}
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}
