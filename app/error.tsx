"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { AlertCircle, RefreshCw } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  React.useEffect(() => {
    // Log the error to an error reporting service if this were a real app
    console.error("Global Error Caught:", error)
  }, [error])

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 min-h-[70vh] bg-white">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-lg mx-auto"
      >
        <div className="w-24 h-24 bg-[#fef2f2] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm border border-[#fecaca]">
          <AlertCircle className="w-10 h-10 text-[#ef4444]" />
        </div>
        
        <h1 className="text-4xl font-bold text-[#1e293b] mb-4">Something went wrong</h1>
        <p className="text-lg text-[#64748b] mb-10 leading-relaxed">
          We&apos;ve encountered an unexpected issue while loading this page. Our team has been notified.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset} className="w-full sm:w-auto shadow-lg flex items-center justify-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto bg-white">
              Return Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
