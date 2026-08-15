"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"
import { freelancers } from "@/data/mockData"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { Button } from "@/components/ui/Button"
import { Star, MapPin, Award } from "lucide-react"
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

export function FeaturedFreelancers() {
  // Display 6 freelancers instead of 4
  const featuredFreelancers = freelancers.slice(0, 6)
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <SectionHeading 
            title="Top Rated Talent" 
            subtitle="Work with the best independent professionals from around the world."
            className="mb-0"
          />
          <Link href="/freelancers" className="hidden md:block mt-4 md:mt-0">
            <Button variant="outline">Browse All Talent</Button>
          </Link>
        </div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featuredFreelancers.map((freelancer) => (
            <motion.div key={freelancer.id} variants={itemVariants} className="flex h-full">
              <div className="group flex flex-col w-full bg-white rounded-2xl border border-[#e2e8f0] p-6 hover:shadow-xl hover:shadow-slate-200/50 hover:border-[#0f766e]/30 transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-slate-100 shadow-sm shrink-0">
                    <Image 
                      src={freelancer.avatar} 
                      alt={freelancer.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-[#1e293b] mb-1 truncate">
                      <Link href={`/freelancers/${freelancer.id}`} className="hover:text-[#0f766e] transition-colors">
                        {freelancer.name}
                      </Link>
                    </h3>
                    <p className="text-sm text-[#0f766e] font-medium truncate mb-1">{freelancer.title}</p>
                    <div className="flex items-center gap-3 text-xs text-[#64748b]">
                      <span className="flex items-center">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        <span className="truncate max-w-[100px]">{freelancer.location}</span>
                      </span>
                      <span className="flex items-center">
                        <Award className="h-3.5 w-3.5 mr-1" />
                        {freelancer.completedProjects} jobs
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-[#475569] mb-6 line-clamp-2 flex-1">
                  {freelancer.bio}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {freelancer.skills.slice(0, 3).map((skill) => (
                    <span key={skill} className="text-xs font-medium text-[#475569] bg-[#f8fafc] px-2 py-1 rounded-md border border-[#e2e8f0]">
                      {skill}
                    </span>
                  ))}
                  {freelancer.skills.length > 3 && (
                    <span className="text-xs font-medium text-[#475569] bg-[#f8fafc] px-2 py-1 rounded-md border border-[#e2e8f0]">
                      +{freelancer.skills.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="mt-auto w-full pt-4 border-t border-[#e2e8f0] flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 text-[#f59e0b] fill-current" />
                    <span className="font-bold text-[#1e293b] text-sm">{freelancer.rating}</span>
                    <span className="text-xs text-[#64748b]">({freelancer.reviewCount})</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#1e293b]">${freelancer.hourlyRate}<span className="text-[#64748b] font-normal text-xs">/hr</span></p>
                    </div>
                    <Link href={`/freelancers/${freelancer.id}`}>
                      <Button size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300">
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 md:hidden text-center">
          <Link href="/freelancers">
            <Button size="lg" className="w-full">
              Browse All Talent
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
