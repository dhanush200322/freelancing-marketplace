import * as React from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { freelancers } from "@/data/mockData"
import { formatCurrency } from "@/lib/utils"
import { PortfolioCard } from "@/components/freelancers/PortfolioCard"
import { Button } from "@/components/ui/Button"
import { ArrowLeft, MapPin, Star, Heart, Clock, CheckCircle2, MessageSquare, Award } from "lucide-react"

export default async function FreelancerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const freelancer = freelancers.find(f => f.id === resolvedParams.id)
  
  if (!freelancer) {
    notFound()
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      {/* Profile Header (Hero) */}
      <div className="bg-white border-b border-[#e2e8f0] pt-12 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <Link href="/freelancers" className="inline-flex items-center text-sm font-medium text-[#475569] hover:text-[#0f766e] mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to freelancers
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left flex-1">
              <div className="relative shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={freelancer.avatar} 
                  alt={freelancer.name} 
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <span className={`absolute bottom-2 right-2 w-5 h-5 rounded-full border-4 border-white ${freelancer.availability === 'Available Now' ? 'bg-emerald-500' : 'bg-amber-500'}`} title={freelancer.availability}></span>
              </div>
              
              <div className="pt-2">
                <h1 className="text-3xl sm:text-4xl font-bold text-[#1e293b] tracking-tight mb-2">
                  {freelancer.name}
                </h1>
                <p className="text-lg text-[#0f766e] font-medium mb-4">{freelancer.title}</p>
                
                <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-3 text-sm text-[#475569]">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#94a3b8]" />
                    {freelancer.location}
                  </div>
                  <div className="flex items-center gap-1.5 text-[#f59e0b] font-medium">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{freelancer.rating}</span>
                    <span className="text-[#94a3b8] font-normal">({freelancer.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#94a3b8]" />
                    Responds {freelancer.responseTime.toLowerCase()}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 mt-4 md:mt-0">
              <Button variant="outline" className="w-full sm:w-auto bg-white">
                <Heart className="w-4 h-4 mr-2" />
                Save Freelancer
              </Button>
              <Link href={`/proposal/new?freelancer=${freelancer.id}`} className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto shadow-lg shadow-[#0f766e]/20 hover:shadow-xl hover:shadow-[#0f766e]/30 transition-all">
                  Invite to Project
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl mt-10">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Main Content */}
          <div className="flex-1 space-y-12">
            
            {/* About */}
            <section>
              <h2 className="text-2xl font-bold text-[#1e293b] mb-4">About Me</h2>
              <div className="prose prose-slate max-w-none text-[#475569] leading-relaxed">
                <p>{freelancer.bio}</p>
              </div>
            </section>
            
            {/* Skills */}
            <section>
              <h2 className="text-2xl font-bold text-[#1e293b] mb-4">Skills & Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {freelancer.skills.map(skill => (
                  <span key={skill} className="px-4 py-2 bg-white border border-[#e2e8f0] hover:border-[#0f766e]/30 rounded-lg text-sm font-medium text-[#475569] transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Portfolio */}
            {freelancer.portfolio && freelancer.portfolio.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-[#1e293b] mb-6">Portfolio</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {freelancer.portfolio.map(item => (
                    <PortfolioCard key={item.id} item={item} />
                  ))}
                </div>
              </section>
            )}

            {/* Reviews */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#1e293b]">Client Reviews</h2>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-[#f59e0b] fill-current" />
                  <span className="text-lg font-bold text-[#1e293b]">{freelancer.rating}</span>
                  <span className="text-[#64748b]">({freelancer.reviewCount})</span>
                </div>
              </div>
              
              {freelancer.reviews && freelancer.reviews.length > 0 ? (
                <div className="space-y-6">
                  {freelancer.reviews.map(review => (
                    <div key={review.id} className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={review.reviewerAvatar} alt={review.reviewerName} className="w-10 h-10 rounded-full" />
                          <div>
                            <p className="font-bold text-[#1e293b]">{review.reviewerName}</p>
                            <p className="text-xs text-[#64748b]">{review.projectName}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-[#f59e0b]">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="font-bold text-sm">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-[#475569] text-sm leading-relaxed mb-3">&quot;{review.text}&quot;</p>
                      <p className="text-xs text-[#94a3b8]">{new Date(review.date).toLocaleDateString('en-US')}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 rounded-2xl border border-[#e2e8f0] text-center">
                  <MessageSquare className="w-10 h-10 text-[#cbd5e1] mx-auto mb-3" />
                  <p className="text-[#475569] font-medium">No reviews yet</p>
                </div>
              )}
            </section>

          </div>
          
          {/* Sidebar */}
          <div className="w-full lg:w-80 shrink-0 space-y-6">
            
            {/* Rate & Hire Box */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm">
              <div className="mb-6">
                <p className="text-sm font-medium text-[#64748b] uppercase tracking-wider mb-1">Hourly Rate</p>
                <div className="text-3xl font-bold text-[#1e293b]">
                  {formatCurrency(freelancer.hourlyRate)}<span className="text-lg text-[#64748b] font-normal">/hr</span>
                </div>
              </div>
              
              <Link href={`/proposal/new?freelancer=${freelancer.id}`} className="block w-full">
                <Button className="w-full py-6 text-lg shadow-lg shadow-[#0f766e]/20 hover:shadow-xl hover:shadow-[#0f766e]/30 transition-all">
                  Invite to Project
                </Button>
              </Link>
            </div>
            
            {/* Stats Box */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm space-y-6">
              <h3 className="font-bold text-[#1e293b] text-lg">Freelancer Stats</h3>
              
              <div className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-[#0f766e] mr-3 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-[#1e293b]">Completed Projects</p>
                  <p className="text-sm text-[#475569]">{freelancer.completedProjects}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Award className="w-5 h-5 text-[#0f766e] mr-3 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-[#1e293b]">Experience Level</p>
                  <p className="text-sm text-[#475569]">{freelancer.experienceLevel}</p>
                </div>
              </div>

              <div className="flex items-start">
                <MessageSquare className="w-5 h-5 text-[#0f766e] mr-3 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-[#1e293b]">Languages</p>
                  <p className="text-sm text-[#475569]">{freelancer.languages.join(", ")}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-[#e2e8f0]">
                <p className="text-xs text-[#64748b] text-center">
                  Member since {new Date(freelancer.memberSince).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}
