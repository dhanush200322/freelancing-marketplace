"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { ProposalStatusBadge } from "@/components/proposals/ProposalStatusBadge"

function SuccessContent() {
  const searchParams = useSearchParams()
  
  // Read params from URL for simulated success state display
  const isInvite = searchParams.get("type") === "invite"
  
  const projectTitle = searchParams.get("projectTitle") || "Unknown Project"
  const freelancerName = searchParams.get("freelancerName") || "Unknown Freelancer"
  const budget = searchParams.get("budget")
  const days = searchParams.get("days")

  return (
    <div className="bg-[#f8fafc] min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-xl w-full bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-[#e2e8f0] overflow-hidden"
      >
        <div className="p-8 sm:p-12 text-center">
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
            className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle2 className="w-12 h-12 text-emerald-600" />
          </motion.div>

          <h1 className="text-3xl font-bold text-[#1e293b] mb-4">
            {isInvite ? "Invitation Sent Successfully!" : "Proposal Submitted Successfully!"}
          </h1>
          
          <p className="text-lg text-[#475569] mb-8">
            {isInvite 
              ? `You have successfully invited ${freelancerName} to ${projectTitle}.`
              : `Your proposal for "${projectTitle}" has been securely delivered to the client.`
            }
          </p>

          {/* Details Card */}
          <div className="bg-[#f8fafc] rounded-2xl border border-[#e2e8f0] p-6 mb-10 text-left">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-[#e2e8f0]">
              <span className="text-sm font-bold text-[#64748b] uppercase tracking-wider">Status</span>
              <ProposalStatusBadge status="Submitted" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {budget && (
                <div>
                  <p className="text-xs font-medium text-[#64748b] mb-1">Proposed Budget</p>
                  <p className="text-base font-bold text-[#1e293b]">${Number(budget).toLocaleString()}</p>
                </div>
              )}
              {days && (
                <div>
                  <p className="text-xs font-medium text-[#64748b] mb-1">Estimated Delivery</p>
                  <p className="text-base font-bold text-[#1e293b]">{days} days</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" className="w-full">
                Go to Dashboard
              </Button>
            </Link>
            <Link href={isInvite ? "/freelancers" : "/projects"} className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full bg-white">
                {isInvite ? "Browse More Talent" : "Browse More Projects"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          
        </div>
      </motion.div>
    </div>
  )
}

export default function ProposalSuccessPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">Loading...</div>}>
      <SuccessContent />
    </React.Suspense>
  )
}
