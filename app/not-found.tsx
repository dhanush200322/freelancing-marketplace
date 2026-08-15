"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { Search, MapPin, Briefcase } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 min-h-[70vh] bg-white">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-lg mx-auto"
      >
        <div className="w-24 h-24 bg-[#f1f5f9] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm border border-[#e2e8f0]">
          <MapPin className="w-10 h-10 text-[#94a3b8]" />
        </div>
        
        <h1 className="text-4xl font-bold text-[#1e293b] mb-4">Page not found</h1>
        <p className="text-lg text-[#64748b] mb-10 leading-relaxed">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been removed, or the link may be broken.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="w-full sm:w-auto shadow-lg shadow-[#0f766e]/20">
              Back to Home
            </Button>
          </Link>
          <Link href="/projects">
            <Button variant="outline" className="w-full sm:w-auto bg-white flex items-center justify-center">
              <Search className="w-4 h-4 mr-2" />
              Find Projects
            </Button>
          </Link>
          <Link href="/freelancers">
            <Button variant="outline" className="w-full sm:w-auto bg-white flex items-center justify-center">
              <Briefcase className="w-4 h-4 mr-2" />
              Find Talent
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
