"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"
import { projects } from "@/data/mockData"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { formatCurrency } from "@/lib/utils"
import { Clock, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export function FeaturedProjects() {
  // Display 6 projects instead of 3
  const featuredProjects = projects.slice(0, 6)
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 bg-[#f8fafc]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <SectionHeading 
            title="Featured Projects" 
            subtitle="Explore the latest high-value projects posted by top companies."
            className="mb-0"
          />
          <Link href="/projects" className="hidden md:block mt-4 md:mt-0">
            <Button variant="outline">View All Projects</Button>
          </Link>
        </div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredProjects.map((project) => (
            <motion.div key={project.id} variants={itemVariants} className="flex h-full">
              <div className="flex flex-col w-full bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 hover:border-[#0f766e]/30 transition-all duration-300 group">
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="secondary" className="bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]">{project.category}</Badge>
                    <span className="text-xs font-medium text-[#64748b] flex items-center">
                      <Clock className="mr-1 h-3.5 w-3.5" />
                      {new Date(project.postedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#1e293b] mb-3 line-clamp-2 group-hover:text-[#0f766e] transition-colors">
                    <Link href={`/projects/${project.id}`}>{project.title}</Link>
                  </h3>
                  
                  <p className="text-sm text-[#475569] mb-6 line-clamp-2 flex-1">
                    {project.shortDescription}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.skills.slice(0, 3).map((skill) => (
                      <span key={skill} className="text-xs font-medium text-[#475569] bg-[#f8fafc] px-2.5 py-1 rounded-md border border-[#e2e8f0]">
                        {skill}
                      </span>
                    ))}
                    {project.skills.length > 3 && (
                      <span className="text-xs font-medium text-[#475569] bg-[#f8fafc] px-2.5 py-1 rounded-md border border-[#e2e8f0]">
                        +{project.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="px-6 py-4 border-t border-[#e2e8f0] bg-[#f8fafc]/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Image src={project.clientAvatar} alt={project.clientName} width={32} height={32} className="rounded-full bg-slate-200" />
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-[#1e293b]">{project.clientName}</span>
                        {project.clientCompany && (
                          <span className="text-[10px] text-[#64748b]">{project.clientCompany}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center text-xs font-medium text-[#64748b]">
                      <Users className="w-3.5 h-3.5 mr-1" />
                      {project.proposals} proposals
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200/60">
                    <div>
                      <p className="text-[10px] text-[#64748b] font-medium uppercase tracking-wider mb-0.5">Budget</p>
                      <p className="text-base font-bold text-[#1e293b]">
                        {formatCurrency(project.budgetMin)} - {formatCurrency(project.budgetMax)}
                      </p>
                    </div>
                    <Link href={`/projects/${project.id}`}>
                      <Button size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                        View Project
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-10 md:hidden text-center">
          <Link href="/projects">
            <Button size="lg" className="w-full">
              View All Projects
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
