"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Freelancer } from "@/types"
import { projects } from "@/data/mockData"
import { Button } from "@/components/ui/Button"
import { Loader2, DollarSign, Clock } from "lucide-react"

interface InviteFormProps {
  freelancer: Freelancer;
}

export function InviteForm({ freelancer }: InviteFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  
  // Form State
  const [projectId, setProjectId] = React.useState("")
  const [budget, setBudget] = React.useState("")
  const [days, setDays] = React.useState("")
  const [message, setMessage] = React.useState("")

  // Validation State
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  // Only show open projects to invite to
  const openProjects = projects.filter(p => p.status === "Open")

  const validate = () => {
    const newErrors: Record<string, string> = {}
    
    if (!projectId) {
      newErrors.projectId = "Please select a project to invite them to."
    }

    const budgetNum = Number(budget)
    if (!budget || isNaN(budgetNum) || budgetNum <= 0) {
      newErrors.budget = "Please enter a valid positive budget amount."
    }

    const daysNum = Number(days)
    if (!days || isNaN(daysNum) || daysNum <= 0 || !Number.isInteger(daysNum)) {
      newErrors.days = "Please enter a valid number of days."
    }

    if (!message || message.trim().length < 20) {
      newErrors.message = "Message must be at least 20 characters."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validate()) {
      return
    }

    setIsSubmitting(true)
    
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const project = openProjects.find(p => p.id === projectId)
    
    // Encode parameters for the success page
    const params = new URLSearchParams({
      type: "invite",
      projectTitle: project?.title || "Unknown Project",
      freelancerName: freelancer.name,
      budget: budget.toString(),
      days: days.toString()
    })
    
    router.push(`/proposal/success?${params.toString()}`)
  }

  return (
    <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 lg:p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-[#1e293b] mb-6">Send Invitation</h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Project Selection */}
        <div className="space-y-2">
          <label htmlFor="projectId" className="block text-sm font-bold text-[#1e293b]">
            Select Project <span className="text-[#f43f5e]">*</span>
          </label>
          <select
            id="projectId"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            className={`w-full px-4 py-3 bg-white border rounded-xl text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-[#0f766e]/50 transition-colors ${errors.projectId ? 'border-[#f43f5e] focus:border-[#f43f5e]' : 'border-[#e2e8f0] focus:border-[#0f766e]'}`}
            aria-invalid={!!errors.projectId}
            aria-describedby={errors.projectId ? "projectId-error" : undefined}
            disabled={isSubmitting}
          >
            <option value="">-- Choose an open project --</option>
            {openProjects.map(project => (
              <option key={project.id} value={project.id}>
                {project.title}
              </option>
            ))}
          </select>
          {errors.projectId && <p id="projectId-error" className="text-sm text-[#f43f5e] mt-1">{errors.projectId}</p>}
        </div>

        {/* Terms Group */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="budget" className="block text-sm font-bold text-[#1e293b]">
              Proposed Budget <span className="text-[#f43f5e]">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-[#94a3b8]" />
              </div>
              <input
                id="budget"
                type="number"
                min="1"
                step="any"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl text-[#1e293b] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#0f766e]/50 transition-colors ${errors.budget ? 'border-[#f43f5e] focus:border-[#f43f5e]' : 'border-[#e2e8f0] focus:border-[#0f766e]'}`}
                placeholder="e.g. 1500"
                aria-invalid={!!errors.budget}
                aria-describedby={errors.budget ? "budget-error" : undefined}
                disabled={isSubmitting}
              />
            </div>
            {errors.budget && <p id="budget-error" className="text-sm text-[#f43f5e] mt-1">{errors.budget}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="days" className="block text-sm font-bold text-[#1e293b]">
              Expected Timeline <span className="text-[#f43f5e]">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Clock className="h-5 w-5 text-[#94a3b8]" />
              </div>
              <input
                id="days"
                type="number"
                min="1"
                step="1"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className={`w-full pl-10 pr-16 py-3 bg-white border rounded-xl text-[#1e293b] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#0f766e]/50 transition-colors ${errors.days ? 'border-[#f43f5e] focus:border-[#f43f5e]' : 'border-[#e2e8f0] focus:border-[#0f766e]'}`}
                placeholder="e.g. 14"
                aria-invalid={!!errors.days}
                aria-describedby={errors.days ? "days-error" : undefined}
                disabled={isSubmitting}
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <span className="text-[#64748b] text-sm">days</span>
              </div>
            </div>
            {errors.days && <p id="days-error" className="text-sm text-[#f43f5e] mt-1">{errors.days}</p>}
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-bold text-[#1e293b]">
            Personal Message <span className="text-[#f43f5e]">*</span>
          </label>
          <p className="text-xs text-[#64748b] mb-2">Explain why you are inviting this freelancer specifically to your project.</p>
          <textarea
            id="message"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`w-full p-4 bg-white border rounded-xl text-[#1e293b] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#0f766e]/50 transition-colors resize-none ${errors.message ? 'border-[#f43f5e] focus:border-[#f43f5e]' : 'border-[#e2e8f0] focus:border-[#0f766e]'}`}
            placeholder="Hi there! I noticed your excellent work in..."
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            disabled={isSubmitting}
          />
          <div className="flex justify-between items-center mt-1">
            {errors.message ? (
              <p id="message-error" className="text-sm text-[#f43f5e]">{errors.message}</p>
            ) : (
              <div />
            )}
            <span className={`text-xs ${message.length < 20 ? 'text-[#f59e0b]' : 'text-[#10b981]'}`}>
              {message.length} chars {message.length < 20 ? '(min 20)' : ''}
            </span>
          </div>
        </div>

        <div className="pt-6 border-t border-[#e2e8f0] flex flex-col sm:flex-row gap-4">
          <Button 
            type="button" 
            variant="outline"
            size="lg" 
            className="w-full sm:w-auto px-8"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            size="lg" 
            className="w-full sm:w-auto px-8 py-6 text-lg font-bold shadow-lg shadow-[#0f766e]/20"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Invitation"
            )}
          </Button>
        </div>

      </form>
    </div>
  )
}
