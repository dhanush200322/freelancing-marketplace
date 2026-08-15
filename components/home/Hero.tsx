"use client"

import * as React from "react"
import { motion, Variants, useReducedMotion } from "framer-motion"
import { Search, Star, CheckCircle2, ShieldCheck, Clock, FileText } from "lucide-react"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring",
      damping: 25,
      stiffness: 100,
    } 
  }
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

// Sub-components for the nodes to avoid duplication

const ClientNode = () => (
  <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-4 w-full lg:w-[220px] relative group">
    <div className="flex items-center gap-3 mb-3">
      <div className="relative">
        <div className="w-10 h-10 rounded-full bg-[#0f766e] text-white flex items-center justify-center font-bold text-sm">
          AS
        </div>
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
      </div>
      <div>
        <h4 className="font-bold text-[#1e293b] text-sm flex items-center gap-1">
          ACME Studio
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
        </h4>
        <p className="text-[10px] text-[#64748b] font-medium uppercase tracking-wider">Client</p>
      </div>
    </div>
    <p className="text-xs font-semibold text-[#1e293b] mb-1">Looking for a React Developer</p>
    <div className="flex justify-between items-center mt-3">
      <span className="text-xs font-bold text-[#0f766e] bg-teal-50 px-2 py-1 rounded-md">$2.5k – $4k</span>
      <span className="text-[10px] text-[#94a3b8] flex items-center gap-1">
        <Clock className="w-3 h-3" />
        8m ago
      </span>
    </div>

    {/* Tooltip */}
    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1e293b] text-white text-[10px] font-medium px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
      Verified Client
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1e293b] rotate-45"></div>
    </div>
  </div>
)

const ProjectNode = () => (
  <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl shadow-teal-900/10 border border-[#0f766e]/20 p-5 w-full lg:w-[280px] relative group">
    <div className="absolute -top-3 -right-3">
      <span className="flex h-6 w-6">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-6 w-6 bg-emerald-500 border-2 border-white items-center justify-center">
          <FileText className="w-3 h-3 text-white" />
        </span>
      </span>
    </div>
    
    <div className="flex justify-between items-start mb-3">
      <span className="text-[10px] font-bold px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full uppercase tracking-wider">Open</span>
      <span className="text-sm font-bold text-[#1e293b]">$3,200</span>
    </div>
    <h3 className="font-bold text-[#1e293b] text-sm mb-3">Build a SaaS Dashboard</h3>
    
    <div className="flex flex-wrap gap-1.5 mb-4">
      {['React', 'Next.js', 'TypeScript', 'Tailwind'].map(skill => (
        <span key={skill} className="text-[10px] bg-slate-100 text-[#475569] px-2 py-0.5 rounded border border-slate-200">
          {skill}
        </span>
      ))}
    </div>

    <div className="flex justify-between items-center pt-3 border-t border-slate-100">
      <span className="text-xs font-semibold text-[#0f766e]">8 Proposals</span>
      <Button size="sm" className="h-7 text-[10px] px-3 shadow-sm shadow-[#0f766e]/20" suppressHydrationWarning>Apply Now</Button>
    </div>

    {/* Tooltip */}
    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1e293b] text-white text-[10px] font-medium px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
      8 freelancers have already applied
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1e293b] rotate-45"></div>
    </div>
  </div>
)

const FreelancerNode = () => (
  <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-4 w-full lg:w-[250px] relative group">
    <div className="flex gap-3 mb-3">
      <Image src="https://i.pravatar.cc/150?u=elena" alt="Elena R." width={48} height={48} className="rounded-full object-cover border-2 border-white shadow-sm" />
      <div>
        <h3 className="font-bold text-[#1e293b] text-sm">Elena Rodriguez</h3>
        <p className="text-[11px] text-[#0f766e] font-medium">Senior React Developer</p>
      </div>
    </div>
    
    <div className="flex items-center gap-4 mb-3">
      <div className="flex items-center gap-1 text-[#f59e0b]">
        <Star className="w-3.5 h-3.5 fill-current" />
        <span className="text-xs font-bold text-[#1e293b]">4.9</span>
      </div>
      <div className="flex items-center gap-1 text-emerald-600">
        <CheckCircle2 className="w-3.5 h-3.5" />
        <span className="text-xs font-bold text-[#1e293b]">98%</span>
      </div>
      <div className="text-xs font-bold text-[#475569] ml-auto">$45/hr</div>
    </div>

    <div className="bg-emerald-50 rounded-lg p-2 text-center">
      <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide flex items-center justify-center gap-1">
        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
        Available Now
      </span>
    </div>

    {/* Tooltip */}
    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1e293b] text-white text-[10px] font-medium px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
      Available for new projects
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1e293b] rotate-45"></div>
    </div>
  </div>
)

const ProposalNode = () => (
  <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg shadow-[#0f766e]/10 border border-emerald-100 p-3 w-full lg:w-[200px] relative group">
    <div className="flex items-center gap-2 mb-2">
      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
        <FileText className="w-3 h-3" />
      </div>
      <h4 className="text-xs font-bold text-[#1e293b]">New Proposal</h4>
    </div>
    <p className="text-[10px] text-[#475569] mb-2 leading-tight">
      <span className="font-semibold text-[#1e293b]">Elena</span> submitted a proposal
    </p>
    <div className="flex items-center justify-between bg-slate-50 p-1.5 rounded border border-slate-100">
      <span className="text-xs font-bold text-[#0f766e]">$3,100</span>
      <span className="text-[10px] font-medium text-[#64748b]">4 days</span>
    </div>

    {/* Tooltip */}
    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1e293b] text-white text-[10px] font-medium px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
      Submitted 2 minutes ago
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1e293b] rotate-45"></div>
    </div>
  </div>
)

export function Hero() {
  const [searchValue, setSearchValue] = React.useState("")
  const router = useRouter()
  const prefersReducedMotion = useReducedMotion()

  const suggestions = [
    "React Developer",
    "UI/UX Designer",
    "Next.js Developer",
    "Mobile App Developer",
    "AI Automation",
    "Content Writer",
  ]

  // Map Coordinates for absolute positioning on Desktop
  const coords = {
    client: { x: 10, y: 20, cx: 120, cy: 70 },
    project: { x: 220, y: 140, cx: 360, cy: 220 },
    freelancer: { x: 0, y: 460, cx: 120, cy: 520 },
    proposal: { x: 280, y: 360, cx: 380, cy: 410 },
  }

  return (
    <section className="relative overflow-hidden pt-20 pb-20 lg:pt-32 lg:pb-32 bg-[#f8fafc]">
      {/* Subtle Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(15,118,110,0.03),transparent_70%)]" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)', backgroundSize: '32px 32px', opacity: 0.5 }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column - Content (5/12 on Desktop) */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="lg:col-span-5 max-w-2xl lg:max-w-none mx-auto lg:mx-0 w-full"
          >
            <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-[#1e293b] mb-6 leading-[1.15]">
              Find the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0f766e] to-emerald-500">right talent</span>.<br />
              Build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0f766e] to-emerald-500">remarkable</span>.
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-lg text-[#475569] mb-10 leading-relaxed max-w-xl font-medium">
              Connect with skilled freelancers, discover exciting projects, and turn great ideas into exceptional work.
            </motion.p>
            
            {/* Search UI */}
            <motion.div variants={fadeIn} className="mb-10">
              <form 
                onSubmit={(e) => {
                  e.preventDefault()
                  if (searchValue.trim()) {
                    router.push(`/projects?search=${encodeURIComponent(searchValue.trim())}`)
                  } else {
                    router.push(`/projects`)
                  }
                }} 
                className="relative flex items-center bg-white rounded-full shadow-lg border border-[#e2e8f0] p-2 focus-within:ring-2 focus-within:ring-[#0f766e] transition-all hover:shadow-xl"
              >
                <Search className="absolute left-6 h-5 w-5 text-[#94a3b8]" />
                <input
                  type="text"
                  placeholder="What are you looking to build?"
                  aria-label="Search projects or freelancers"
                  className="w-full pl-14 pr-4 py-3 bg-transparent text-[#1e293b] placeholder:text-[#94a3b8] focus:outline-none text-base sm:text-lg"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  suppressHydrationWarning
                />
                <Button type="submit" className="rounded-full px-8 py-4 h-auto hidden sm:flex shrink-0 shadow-md shadow-[#0f766e]/20" suppressHydrationWarning>
                  Search
                </Button>
              </form>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider mr-1">Popular:</span>
                {suggestions.map((suggestion) => (
                  <Link
                    key={suggestion}
                    href={`/projects?search=${encodeURIComponent(suggestion)}`}
                    className="text-xs px-3 py-1.5 rounded-full bg-white border border-[#e2e8f0] text-[#64748b] hover:border-[#0f766e] hover:text-[#0f766e] hover:shadow-sm transition-all"
                  >
                    {suggestion}
                  </Link>
                ))}
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center gap-4">
              <Link href="/freelancers" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base shadow-lg shadow-[#0f766e]/20 group" suppressHydrationWarning>
                  Find Freelancers
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Button>
              </Link>
              <Link href="/projects" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base bg-white border-[#e2e8f0] text-[#1e293b] hover:border-[#0f766e] hover:text-[#0f766e]" suppressHydrationWarning>
                  Explore Projects
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Right Column - Visual Composition Desktop (7/12) */}
          <div className="hidden lg:block lg:col-span-7 relative h-[600px] w-full select-none">
            
            <div className="absolute inset-0 max-w-[500px] mx-auto xl:mr-0 xl:ml-auto w-full h-[600px] scale-90 xl:scale-100 origin-center">
              
              {/* SVG Connections */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" aria-hidden="true">
                <defs>
                  <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#cbd5e1" />
                    <stop offset="100%" stopColor="#0f766e" stopOpacity="0.5" />
                  </linearGradient>
                </defs>

                {/* Client to Project */}
                <motion.line 
                  x1={coords.client.cx} y1={coords.client.cy} 
                  x2={coords.project.cx} y2={coords.project.cy} 
                  stroke="url(#lineGrad1)" strokeWidth="2" strokeDasharray="6 6"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />

                {/* Freelancer to Proposal */}
                <motion.line 
                  x1={coords.freelancer.cx} y1={coords.freelancer.cy} 
                  x2={coords.proposal.cx} y2={coords.proposal.cy} 
                  stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 6"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 1 }}
                />

                {/* Proposal to Project */}
                <motion.line 
                  x1={coords.proposal.cx} y1={coords.proposal.cy} 
                  x2={coords.project.cx} y2={coords.project.cy} 
                  stroke="#0f766e" strokeWidth="2" strokeDasharray="6 6"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 1.5 }}
                />
              </svg>

              {/* Animated Particles */}
              {!prefersReducedMotion && (
                <>
                  <motion.div
                    animate={{ 
                      x: [coords.client.cx, coords.project.cx],
                      y: [coords.client.cy, coords.project.cy],
                      opacity: [0, 1, 1, 0],
                      scale: [0.5, 1, 1, 0.5]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                    className="absolute w-2.5 h-2.5 bg-emerald-400 rounded-full shadow-[0_0_10px_3px_rgba(52,211,153,0.6)] z-10 -ml-1 -mt-1"
                  />
                  <motion.div
                    animate={{ 
                      x: [coords.freelancer.cx, coords.proposal.cx],
                      y: [coords.freelancer.cy, coords.proposal.cy],
                      opacity: [0, 1, 1, 0],
                      scale: [0.5, 1, 1, 0.5]
                    }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut", delay: 1 }}
                    className="absolute w-2 h-2 bg-[#0f766e] rounded-full shadow-[0_0_8px_2px_rgba(15,118,110,0.6)] z-10 -ml-1 -mt-1"
                  />
                  <motion.div
                    animate={{ 
                      x: [coords.proposal.cx, coords.project.cx],
                      y: [coords.proposal.cy, coords.project.cy],
                      opacity: [0, 1, 1, 0],
                      scale: [0.5, 1, 1, 0.5]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3, ease: "easeInOut", delay: 2 }}
                    className="absolute w-3 h-3 bg-teal-400 rounded-full shadow-[0_0_12px_4px_rgba(45,212,191,0.7)] z-10 -ml-1.5 -mt-1.5"
                  />
                </>
              )}

              {/* Node 1: Client */}
              <motion.div 
                className="absolute z-20"
                style={{ top: coords.client.y, left: coords.client.x }}
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, type: "spring" }}
                whileHover={prefersReducedMotion ? {} : { scale: 1.05, zIndex: 50 }}
              >
                <ClientNode />
              </motion.div>

              {/* Node 2: Project */}
              <motion.div 
                className="absolute z-20"
                style={{ top: coords.project.y, left: coords.project.x }}
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, type: "spring" }}
                whileHover={prefersReducedMotion ? {} : { scale: 1.05, zIndex: 50 }}
              >
                <ProjectNode />
              </motion.div>

              {/* Node 3: Freelancer */}
              <motion.div 
                className="absolute z-20"
                style={{ top: coords.freelancer.y, left: coords.freelancer.x }}
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, type: "spring" }}
                whileHover={prefersReducedMotion ? {} : { scale: 1.05, zIndex: 50 }}
              >
                <FreelancerNode />
              </motion.div>

              {/* Node 4: Proposal */}
              <motion.div 
                className="absolute z-30"
                style={{ top: coords.proposal.y, left: coords.proposal.x }}
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8, type: "spring" }}
                whileHover={prefersReducedMotion ? {} : { scale: 1.05, zIndex: 50 }}
              >
                <ProposalNode />
              </motion.div>

            </div>
          </div>

          {/* Mobile Stacked Flow (Visible <= 1024px) */}
          <div className="lg:hidden w-full mt-8 max-w-sm mx-auto relative pt-4 pb-8">
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-slate-200 via-[#0f766e] to-slate-200 z-0 opacity-50" aria-hidden="true" />
            
            <div className="flex flex-col gap-8 relative z-10">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <ClientNode />
              </motion.div>
              
              <div className="h-6 w-6 rounded-full bg-slate-100 border-2 border-slate-200 mx-auto flex items-center justify-center shadow-sm">
                <div className="w-2 h-2 rounded-full bg-slate-400" />
              </div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <ProjectNode />
              </motion.div>
              
              <div className="h-6 w-6 rounded-full bg-slate-100 border-2 border-[#0f766e] mx-auto flex items-center justify-center shadow-sm">
                <div className="w-2 h-2 rounded-full bg-[#0f766e] animate-pulse" />
              </div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                <FreelancerNode />
              </motion.div>

              <div className="h-6 w-6 rounded-full bg-emerald-50 border-2 border-emerald-500 mx-auto flex items-center justify-center shadow-sm">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                <ProposalNode />
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
