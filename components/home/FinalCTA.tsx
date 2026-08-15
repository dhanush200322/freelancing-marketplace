"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/Button"
import Link from "next/link"

export function FinalCTA() {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 relative overflow-hidden bg-[#1e293b]">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            x: [0, 50, 0], 
            y: [0, -50, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[80%] rounded-full bg-teal-500/20 blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            x: [0, -50, 0], 
            y: [0, 50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[80%] rounded-full bg-emerald-500/20 blur-[120px]" 
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 md:p-16 shadow-2xl shadow-slate-900/50"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Ready to bring your next idea to life?
          </h2>
          <p className="text-lg md:text-xl text-teal-50 mb-10 max-w-2xl mx-auto leading-relaxed">
            Find skilled professionals or discover your next freelance opportunity today.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/freelancers" className="w-full sm:w-auto">
              <Button size="lg" className="w-full h-14 px-8 text-base bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-900/20 border-none">
                Find Freelancers
              </Button>
            </Link>
            <Link href="/projects/post" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full h-14 px-8 text-base bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm">
                Post a Project
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
