"use client"

import * as React from "react"
import { motion, Variants } from "framer-motion"
import { Search, Star, CheckCircle2 } from "lucide-react"
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

export function Hero() {
  const [searchValue, setSearchValue] = React.useState("")
  const router = useRouter()

  const suggestions = [
    "React Developer",
    "UI/UX Designer",
    "AI Automation",
    "Content Writer",
    "Digital Marketer",
  ]

  return (
    <section className="relative overflow-hidden pt-20 pb-28 lg:pt-32 lg:pb-36 bg-[#f8fafc]">
      {/* Subtle Background Gradients with Pulse Animation */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1400px] pointer-events-none -z-10 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.4, 0.6, 0.4] 
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-teal-100 rounded-full blur-[100px] mix-blend-multiply" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.5, 0.4] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-emerald-100 rounded-full blur-[100px] mix-blend-multiply" 
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-2xl"
          >
            <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1e293b] mb-6 leading-[1.15]">
              Find the right talent. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0f766e] to-emerald-500">
                Build something remarkable.
              </span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-lg sm:text-xl text-[#475569] mb-10 leading-relaxed max-w-xl">
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
                className="relative flex items-center bg-white rounded-full shadow-xl shadow-slate-200/50 border border-[#e2e8f0] p-2 focus-within:ring-2 focus-within:ring-[#0f766e] transition-all hover:shadow-2xl hover:shadow-slate-200/60"
              >
                <Search className="absolute left-6 h-5 w-5 text-[#94a3b8]" />
                <input
                  type="text"
                  placeholder="What service or skill are you looking for?"
                  className="w-full pl-14 pr-4 py-3 bg-transparent text-[#1e293b] placeholder:text-[#94a3b8] focus:outline-none text-base sm:text-lg"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  suppressHydrationWarning
                />
                <Button type="submit" className="rounded-full px-8 py-4 h-auto hidden sm:flex shrink-0 shadow-lg shadow-[#0f766e]/20 transition-transform hover:scale-105 active:scale-95" suppressHydrationWarning>
                  Search
                </Button>
              </form>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-[#475569]">Popular:</span>
                {suggestions.map((suggestion) => (
                  <Link
                    key={suggestion}
                    href={`/projects?search=${encodeURIComponent(suggestion)}`}
                    className="text-xs sm:text-sm px-3 py-1.5 rounded-full bg-white border border-[#e2e8f0] text-[#475569] hover:border-[#0f766e] hover:text-[#0f766e] hover:shadow-md transition-all hover:-translate-y-0.5"
                  >
                    {suggestion}
                  </Link>
                ))}
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center gap-4">
              <Link href="/freelancers" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base shadow-lg shadow-[#0f766e]/20 hover:shadow-xl hover:shadow-[#0f766e]/30 transition-all hover:-translate-y-1" suppressHydrationWarning>
                  Find Freelancers
                </Button>
              </Link>
              <Link href="/projects" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base bg-white hover:bg-slate-50 transition-all hover:-translate-y-1" suppressHydrationWarning>
                  Explore Projects
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Right Column - Visual Composition */}
          <div className="hidden lg:block relative h-[600px] w-full">
            {/* Decorative background element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border border-[#cbd5e1] rounded-full border-dashed animate-[spin_60s_linear_infinite] opacity-60" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-[#cbd5e1] rounded-full border-dashed animate-[spin_40s_linear_infinite_reverse] opacity-60" />
            
            {/* Card 1: Freelancer Profile */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.2 }}
              className="absolute top-12 right-0 z-20"
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.05, translateY: -5 }}
                className="w-[320px] bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl shadow-slate-200/60 border border-slate-100 p-5 cursor-pointer"
              >
                <div className="flex gap-4">
                  <Image src="https://i.pravatar.cc/150?u=elena" alt="Elena R." width={56} height={56} className="rounded-full object-cover border-2 border-white shadow-sm" />
                  <div>
                    <h3 className="font-bold text-[#1e293b]">Elena Rodriguez</h3>
                    <p className="text-sm text-[#0f766e] font-medium">Senior React Developer</p>
                    <div className="flex items-center gap-1 mt-1 text-[#f59e0b]">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-xs font-bold text-[#1e293b]">4.9</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="text-xs bg-[#f8fafc] text-[#475569] px-2 py-1 rounded-md border border-[#e2e8f0]">Next.js</span>
                  <span className="text-xs bg-[#f8fafc] text-[#475569] px-2 py-1 rounded-md border border-[#e2e8f0]">TypeScript</span>
                  <span className="text-xs bg-[#f8fafc] text-[#475569] px-2 py-1 rounded-md border border-[#e2e8f0]">Tailwind</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Card 2: Project snippet */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.4 }}
              className="absolute bottom-32 left-0 z-30"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                whileHover={{ scale: 1.05, translateY: -5 }}
                className="w-[300px] bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl shadow-slate-200/60 border border-slate-100 p-5 cursor-pointer"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full">New Project</span>
                  <span className="text-sm font-bold text-[#1e293b]">$3k - $5k</span>
                </div>
                <h3 className="font-bold text-[#1e293b] text-base mb-2">SaaS Dashboard UI</h3>
                <p className="text-xs text-[#475569] mb-4">Looking for an experienced designer to revamp our analytics dashboard.</p>
                <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                  <div className="flex -space-x-2">
                    <Image src="https://i.pravatar.cc/150?u=1" width={24} height={24} className="rounded-full border-2 border-white shadow-sm" alt="" />
                    <Image src="https://i.pravatar.cc/150?u=2" width={24} height={24} className="rounded-full border-2 border-white shadow-sm" alt="" />
                    <Image src="https://i.pravatar.cc/150?u=3" width={24} height={24} className="rounded-full border-2 border-white shadow-sm" alt="" />
                  </div>
                  <span className="text-xs font-medium text-[#475569]">12 Proposals</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Card 3: Small Success Stat */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.6 }}
              className="absolute bottom-10 right-10 z-10"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                whileHover={{ scale: 1.1, rotate: 2 }}
                className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl shadow-[#0f766e]/10 border border-emerald-50 p-4 flex items-center gap-3 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xl font-bold text-[#1e293b] leading-none">98%</p>
                  <p className="text-xs font-medium text-[#475569] mt-0.5">Success Rate</p>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
