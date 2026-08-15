"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"
import { categories } from "@/data/mockData"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { Monitor, Smartphone, Palette, PenTool, FileText, TrendingUp, Bot, Video, ArrowRight } from "lucide-react"
import Link from "next/link"

const iconMap: Record<string, React.ReactNode> = {
  "code": <Monitor className="h-6 w-6" />,
  "smartphone": <Smartphone className="h-6 w-6" />,
  "palette": <Palette className="h-6 w-6" />,
  "pen-tool": <PenTool className="h-6 w-6" />,
  "file-text": <FileText className="h-6 w-6" />,
  "trending-up": <TrendingUp className="h-6 w-6" />,
  "bot": <Bot className="h-6 w-6" />,
  "video": <Video className="h-6 w-6" />,
}

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

export function Categories() {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <SectionHeading 
            title="Browse by Category" 
            subtitle="Find specialized talent across these popular categories."
            className="mb-0"
          />
          <Link href="/projects" className="hidden sm:flex items-center text-[#0f766e] font-medium hover:underline underline-offset-4">
            See all categories <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <Link 
                href={`/projects?category=${category.id}`}
                className="group flex flex-col p-6 rounded-2xl border border-[#e2e8f0] bg-white hover:border-[#0f766e]/30 hover:shadow-xl hover:shadow-teal-900/5 transition-all duration-300 h-full hover:-translate-y-1"
              >
                <div className="h-12 w-12 rounded-xl bg-[#f8fafc] text-[#475569] group-hover:bg-[#ccfbf1] group-hover:text-[#0f766e] flex items-center justify-center transition-colors mb-6">
                  {iconMap[category.icon] || <Monitor className="h-6 w-6" />}
                </div>
                <h3 className="text-lg font-bold text-[#1e293b] mb-2">{category.name}</h3>
                <p className="text-sm text-[#475569] flex-1 mb-6">{category.description}</p>
                <div className="text-sm font-medium text-[#0f766e] opacity-0 group-hover:opacity-100 transition-opacity flex items-center -translate-x-2 group-hover:translate-x-0 duration-300">
                  {category.projectCount} jobs available <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-8 sm:hidden flex justify-center">
          <Link href="/projects" className="flex items-center text-[#0f766e] font-medium hover:underline underline-offset-4">
            See all categories <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
