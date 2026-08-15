"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"
import { Search, Briefcase, CreditCard, ShieldCheck } from "lucide-react"

const steps = [
  {
    id: 1,
    title: "Post a job or search",
    description: "Tell us what you need done in seconds, or browse our directory of top talent.",
    icon: <Search className="h-6 w-6" />,
  },
  {
    id: 2,
    title: "Choose the best fit",
    description: "Review proposals, portfolios, and client reviews to choose the perfect match.",
    icon: <Briefcase className="h-6 w-6" />,
  },
  {
    id: 3,
    title: "Pay safely and securely",
    description: "Pay only when you authorize release of funds upon project completion.",
    icon: <CreditCard className="h-6 w-6" />,
  },
  {
    id: 4,
    title: "Work with confidence",
    description: "Use our secure collaboration workspace to chat, share files, and collaborate.",
    icon: <ShieldCheck className="h-6 w-6" />,
  },
]

export function HowItWorks() {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 bg-[#0f766e] text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
        <svg className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] text-white" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M47.7,-57.2C59.6,-47.3,66.1,-30.9,71.2,-13.4C76.2,4.1,79.8,22.8,71.6,35.7C63.4,48.7,43.3,56.1,23.5,62.8C3.7,69.5,-15.8,75.4,-33.5,70.5C-51.1,65.5,-66.9,49.8,-74.6,31.2C-82.3,12.7,-81.9,-8.6,-73.2,-25.1C-64.6,-41.6,-47.6,-53.4,-31.8,-61.6C-16.1,-69.8,1.4,-74.4,18.3,-71.4C35.2,-68.4,51.8,-57.8,47.7,-57.2Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            How WorkMarket Works
          </h2>
          <p className="text-lg text-teal-100 max-w-2xl mx-auto">
            Get your project started in minutes, not days.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-[2px] bg-teal-500/40 z-0" />
          
          {/* Connector Line (Mobile) */}
          <div className="md:hidden absolute top-[40px] bottom-[40px] left-[40px] w-[2px] bg-teal-500/40 z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative z-10 flex md:flex-col items-start md:items-center text-left md:text-center gap-6 md:gap-0"
            >
              <div className="w-20 h-20 shrink-0 rounded-2xl bg-[#0f766e] md:bg-white/10 backdrop-blur-sm border-2 border-teal-400 flex items-center justify-center mb-0 md:mb-6 text-white shadow-lg relative z-10 group hover:bg-white transition-colors duration-300 hover:text-[#0f766e]">
                <div className="absolute -top-3 -right-3 md:-right-3 md:-top-3 w-8 h-8 rounded-full bg-emerald-400 text-[#0f766e] flex items-center justify-center font-bold text-sm shadow-md group-hover:scale-110 transition-transform">
                  0{step.id}
                </div>
                {step.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 md:mb-3">{step.title}</h3>
                <p className="text-teal-100/90 text-sm md:text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
