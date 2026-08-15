"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"

const stats = [
  { value: "10K+", label: "Projects Posted" },
  { value: "8K+", label: "Verified Freelancers" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "24/7", label: "Global Collaboration" },
]

export function Stats() {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="bg-white border-y border-[#e2e8f0]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[#e2e8f0]"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="py-10 text-center flex flex-col items-center justify-center p-6"
            >
              <div className="text-4xl lg:text-5xl font-bold tracking-tight text-[#0f766e] mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base font-medium text-[#475569] uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
