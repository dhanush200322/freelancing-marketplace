"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Project } from "@/types"
import { Button } from "@/components/ui/Button"
import { Loader2, DollarSign, Clock, CheckCircle2 } from "lucide-react"

interface ProposalFormProps {
  project: Project;
}

export function ProposalForm({ project }: ProposalFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  
  // Form State
  const [budget, setBudget] = React.useState("")
  const [days, setDays] = React.useState("")
  const [coverLetter, setCoverLetter] = React.useState("")
  const [selectedSkills, setSelectedSkills] = React.useState<string[]>([])
  const [message, setMessage] = React.useState("")

  // Validation State
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    )
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    
    const budgetNum = Number(budget)
    if (!budget || isNaN(budgetNum) || budgetNum <= 0) {
      newErrors.budget = "Please enter a valid positive budget amount."
    }

    const daysNum = Number(days)
    if (!days || isNaN(daysNum) || daysNum <= 0 || !Number.isInteger(daysNum)) {
      newErrors.days = "Please enter a valid number of days."
    }

    if (!coverLetter || coverLetter.trim().length < 50) {
      newErrors.coverLetter = "Cover letter must be at least 50 characters."
    }

    if (selectedSkills.length === 0) {
      newErrors.skills = "Please select at least one relevant skill."
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
    
    // Encode parameters for the success page
    const params = new URLSearchParams({
      projectTitle: project.title,
      budget: budget.toString(),
      days: days.toString()
    })
    
    router.push(`/proposal/success?${params.toString()}`)
  }

  return (
    <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 lg:p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-[#1e293b] mb-6">Submit Proposal</h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        
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
              Estimated Delivery <span className="text-[#f43f5e]">*</span>
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

        {/* Cover Letter */}
        <div className="space-y-2">
          <label htmlFor="coverLetter" className="block text-sm font-bold text-[#1e293b]">
            Cover Letter <span className="text-[#f43f5e]">*</span>
          </label>
          <p className="text-xs text-[#64748b] mb-2">Introduce yourself and explain why you&apos;re a strong candidate for this project.</p>
          <textarea
            id="coverLetter"
            rows={6}
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className={`w-full p-4 bg-white border rounded-xl text-[#1e293b] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#0f766e]/50 transition-colors resize-none ${errors.coverLetter ? 'border-[#f43f5e] focus:border-[#f43f5e]' : 'border-[#e2e8f0] focus:border-[#0f766e]'}`}
            placeholder="Write your cover letter here..."
            aria-invalid={!!errors.coverLetter}
            aria-describedby={errors.coverLetter ? "coverLetter-error" : undefined}
            disabled={isSubmitting}
          />
          <div className="flex justify-between items-center mt-1">
            {errors.coverLetter ? (
              <p id="coverLetter-error" className="text-sm text-[#f43f5e]">{errors.coverLetter}</p>
            ) : (
              <div />
            )}
            <span className={`text-xs ${coverLetter.length < 50 ? 'text-[#f59e0b]' : 'text-[#10b981]'}`}>
              {coverLetter.length} chars {coverLetter.length < 50 ? '(min 50)' : ''}
            </span>
          </div>
        </div>

        {/* Skills Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-[#1e293b]">
            Relevant Skills <span className="text-[#f43f5e]">*</span>
          </label>
          <p className="text-xs text-[#64748b]">Select the skills you possess that are required for this project.</p>
          <div className="flex flex-wrap gap-2">
            {project.skills.map(skill => {
              const isSelected = selectedSkills.includes(skill)
              return (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  disabled={isSubmitting}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${
                    isSelected 
                      ? 'bg-[#ccfbf1] border-[#0f766e] text-[#0f766e]' 
                      : 'bg-white border-[#e2e8f0] text-[#475569] hover:border-[#94a3b8]'
                  } disabled:opacity-50`}
                >
                  {isSelected && <CheckCircle2 className="w-4 h-4" />}
                  {skill}
                </button>
              )
            })}
          </div>
          {errors.skills && <p id="skills-error" className="text-sm text-[#f43f5e] mt-1">{errors.skills}</p>}
        </div>

        {/* Additional Optional Message */}
        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-bold text-[#1e293b]">
            Additional Attachments or Links <span className="text-[#64748b] font-normal">(Optional)</span>
          </label>
          <input
            id="message"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-[#e2e8f0] rounded-xl text-[#1e293b] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#0f766e]/50 focus:border-[#0f766e] transition-colors"
            placeholder="Link to relevant portfolio item or GitHub repo"
            disabled={isSubmitting}
          />
        </div>

        <div className="pt-6 border-t border-[#e2e8f0]">
          <Button 
            type="submit" 
            size="lg" 
            className="w-full py-6 text-lg font-bold shadow-lg shadow-[#0f766e]/20"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Submitting Proposal...
              </>
            ) : (
              "Submit Proposal"
            )}
          </Button>
          <p className="text-xs text-center text-[#64748b] mt-4">
            By submitting, you agree to the WorkMarket Terms of Service and Privacy Policy.
          </p>
        </div>

      </form>
    </div>
  )
}
