"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { Briefcase, DollarSign, CheckCircle, Tag, Clock, AlignLeft } from "lucide-react"
import { categories } from "@/data/mockData"

export default function PostProjectPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      
      // Redirect after showing success state
      setTimeout(() => {
        router.push("/dashboard/projects")
      }, 2000)
    }, 1500)
  }

  if (isSuccess) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6 bg-[#f8fafc]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-md w-full text-center border border-[#e2e8f0]"
        >
          <div className="w-20 h-20 bg-[#ecfdf5] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-[#10b981]" />
          </div>
          <h2 className="text-3xl font-bold text-[#1e293b] mb-4">Project Posted!</h2>
          <p className="text-[#64748b] mb-8 text-lg">
            Your project has been successfully published to the marketplace.
          </p>
          <p className="text-sm text-[#94a3b8]">Redirecting to your dashboard...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1e293b] mb-4">Post a New Project</h1>
          <p className="text-lg text-[#64748b]">Fill out the details below to connect with top freelancers.</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-sm border border-[#e2e8f0] p-6 sm:p-10"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-bold text-[#1e293b] mb-2 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#0f766e]" />
                Project Title
              </label>
              <input 
                type="text" 
                id="title"
                required
                placeholder="e.g. Build a responsive React dashboard"
                className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-bold text-[#1e293b] mb-2 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#0f766e]" />
                  Category
                </label>
                <select 
                  id="category"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] transition-colors bg-white"
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Budget */}
              <div>
                <label htmlFor="budget" className="block text-sm font-bold text-[#1e293b] mb-2 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#0f766e]" />
                  Estimated Budget (USD)
                </label>
                <input 
                  type="number" 
                  id="budget"
                  required
                  min="50"
                  placeholder="e.g. 1500"
                  className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] transition-colors"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-bold text-[#1e293b] mb-2 flex items-center gap-2">
                <AlignLeft className="w-4 h-4 text-[#0f766e]" />
                Project Description
              </label>
              <textarea 
                id="description"
                required
                rows={6}
                placeholder="Describe your project requirements, goals, and any specific deliverables..."
                className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] transition-colors resize-y"
              ></textarea>
            </div>

            {/* Duration */}
            <div>
              <label htmlFor="duration" className="block text-sm font-bold text-[#1e293b] mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#0f766e]" />
                Estimated Duration
              </label>
              <select 
                id="duration"
                required
                className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] transition-colors bg-white"
              >
                <option value="">Select duration</option>
                <option value="less_than_1_week">Less than 1 week</option>
                <option value="1_to_4_weeks">1 to 4 weeks</option>
                <option value="1_to_3_months">1 to 3 months</option>
                <option value="more_than_3_months">More than 3 months</option>
              </select>
            </div>

            {/* Submit */}
            <div className="pt-6 border-t border-[#e2e8f0]">
              <Button 
                type="submit" 
                size="lg" 
                className="w-full text-lg h-14 rounded-xl shadow-lg shadow-[#0f766e]/20"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Publishing..." : "Post Project"}
              </Button>
              <p className="text-center text-sm text-[#94a3b8] mt-4">
                By posting, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>

          </form>
        </motion.div>
      </div>
    </div>
  )
}
