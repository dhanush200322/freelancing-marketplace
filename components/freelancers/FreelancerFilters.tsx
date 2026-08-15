"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, SlidersHorizontal, X, Star } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { freelancers } from "@/data/mockData"

const commonSkills = ["React", "Next.js", "TypeScript", "JavaScript", "Node.js", "Python", "Figma", "UI/UX", "Flutter", "React Native", "AI", "Automation", "SEO", "Content Writing", "Digital Marketing", "Video Editing"]
const experienceLevels = ["Entry", "Intermediate", "Expert"]
const rateRanges = [
  { label: "Any Rate", value: "" },
  { label: "Under $25/hr", value: "0-25" },
  { label: "$25 - $50/hr", value: "25-50" },
  { label: "$50 - $100/hr", value: "50-100" },
  { label: "$100+/hr", value: "100-9999" },
]
const ratings = ["4.0", "4.5", "4.8", "5.0"]
const availabilities = ["Available Now", "Busy"]

export function FreelancerFilters({ onCloseMobile }: { onCloseMobile?: () => void }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Local state for debounced search
  const [searchTerm, setSearchTerm] = React.useState(searchParams.get("search") || "")
  
  // Custom rate state
  const [minRate, setMinRate] = React.useState(searchParams.get("minRate") || "")
  const [maxRate, setMaxRate] = React.useState(searchParams.get("maxRate") || "")

  const updateFilter = React.useCallback((key: string, value: string | null) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    
    if (value) {
      current.set(key, value)
    } else {
      current.delete(key)
    }
    
    current.delete("page")
    const search = current.toString()
    const query = search ? `?${search}` : ""
    
    router.push(`/freelancers${query}`, { scroll: false })
  }, [router, searchParams])

  // Debounce search
  React.useEffect(() => {
    const timer = setTimeout(() => {
      updateFilter("search", searchTerm || null)
    }, 400)
    return () => clearTimeout(timer)
  }, [searchTerm, updateFilter])

  const toggleSkill = (skill: string) => {
    const currentSkills = searchParams.get("skills")?.split(",") || []
    let newSkills: string[]
    
    if (currentSkills.includes(skill)) {
      newSkills = currentSkills.filter(s => s !== skill)
    } else {
      newSkills = [...currentSkills, skill]
    }

    updateFilter("skills", newSkills.length > 0 ? newSkills.join(",") : null)
  }

  const handleCustomRateApply = () => {
    const min = parseInt(minRate)
    const max = parseInt(maxRate)
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    
    if (!isNaN(min) && min >= 0) {
      current.set("minRate", min.toString())
    } else {
      current.delete("minRate")
    }

    if (!isNaN(max) && max >= 0 && (isNaN(min) || max >= min)) {
      current.set("maxRate", max.toString())
    } else {
      current.delete("maxRate")
    }
    
    current.delete("rate") 
    current.delete("page")
    
    router.push(`/freelancers?${current.toString()}`, { scroll: false })
  }

  const clearAll = () => {
    setSearchTerm("")
    setMinRate("")
    setMaxRate("")
    router.push("/freelancers", { scroll: false })
    if (onCloseMobile) onCloseMobile()
  }

  // Dynamic unique locations from mock data
  const locations = Array.from(new Set(freelancers.map(f => f.location))).sort()

  const activeLevel = searchParams.get("level")
  const activeRate = searchParams.get("rate")
  const activeRating = searchParams.get("rating")
  const activeLocation = searchParams.get("location")
  const activeAvailability = searchParams.get("availability")
  const activeSkills = searchParams.get("skills")?.split(",") || []

  // Count active filters
  let filterCount = 0
  if (searchTerm) filterCount++
  if (activeLevel) filterCount++
  if (activeRate || searchParams.get("minRate") || searchParams.get("maxRate")) filterCount++
  if (activeRating) filterCount++
  if (activeLocation) filterCount++
  if (activeAvailability) filterCount++
  if (activeSkills.length > 0) filterCount += activeSkills.length

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#e2e8f0]">
        <h2 className="text-lg font-bold text-[#1e293b] flex items-center">
          <SlidersHorizontal className="w-5 h-5 mr-2" />
          Filters {filterCount > 0 && <span className="ml-2 bg-[#0f766e] text-white text-xs px-2 py-0.5 rounded-full">{filterCount}</span>}
        </h2>
        {filterCount > 0 && (
          <button 
            onClick={clearAll}
            className="text-sm text-[#f43f5e] font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-[#f43f5e] rounded"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Search */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-semibold text-[#1e293b]">Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94a3b8]" />
          <Input 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search freelancers, skills..." 
            className="pl-9"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#1e293b]"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-semibold text-[#1e293b]">Skills</label>
        <div className="flex flex-wrap gap-2">
          {commonSkills.map((skill) => {
            const isSelected = activeSkills.includes(skill)
            return (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-[#0f766e] ${
                  isSelected 
                    ? "bg-[#ccfbf1] text-[#0f766e] border-[#0f766e]/30" 
                    : "bg-[#f8fafc] text-[#475569] border-[#e2e8f0] hover:border-[#0f766e]/30 hover:bg-white"
                }`}
              >
                {skill}
              </button>
            )
          })}
        </div>
      </div>

      {/* Hourly Rate */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-semibold text-[#1e293b]">Hourly Rate</label>
        <div className="flex flex-col gap-2">
          {rateRanges.map((range) => (
            <label key={range.value} className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="radio" 
                name="rate"
                checked={(activeRate === range.value) || (!activeRate && range.value === "" && !searchParams.get("minRate") && !searchParams.get("maxRate"))}
                onChange={() => {
                  updateFilter("rate", range.value || null)
                  setMinRate("")
                  setMaxRate("")
                  const current = new URLSearchParams(Array.from(searchParams.entries()))
                  current.delete("minRate")
                  current.delete("maxRate")
                  if(range.value) current.set("rate", range.value)
                  else current.delete("rate")
                  current.delete("page")
                  router.push(`/freelancers?${current.toString()}`, { scroll: false })
                }}
                className="w-4 h-4 text-[#0f766e] border-slate-300 focus:ring-[#0f766e]"
              />
              <span className="text-sm text-[#475569] group-hover:text-[#1e293b]">{range.label}</span>
            </label>
          ))}
        </div>

        <div className="mt-2 flex items-center gap-2">
          <Input 
            type="number" 
            placeholder="Min" 
            className="w-full text-sm" 
            value={minRate}
            onChange={(e) => setMinRate(e.target.value)}
            min="0"
          />
          <span className="text-[#94a3b8]">-</span>
          <Input 
            type="number" 
            placeholder="Max" 
            className="w-full text-sm" 
            value={maxRate}
            onChange={(e) => setMaxRate(e.target.value)}
            min="0"
          />
          <Button size="sm" variant="outline" onClick={handleCustomRateApply} className="shrink-0">Go</Button>
        </div>
      </div>

      {/* Experience Level */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-semibold text-[#1e293b]">Experience Level</label>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="radio" 
              name="level"
              checked={!activeLevel}
              onChange={() => updateFilter("level", null)}
              className="w-4 h-4 text-[#0f766e] border-slate-300 focus:ring-[#0f766e]"
            />
            <span className="text-sm text-[#475569] group-hover:text-[#1e293b]">Any Level</span>
          </label>
          {experienceLevels.map((level) => (
            <label key={level} className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="radio" 
                name="level"
                checked={activeLevel === level}
                onChange={() => updateFilter("level", level)}
                className="w-4 h-4 text-[#0f766e] border-slate-300 focus:ring-[#0f766e]"
              />
              <span className="text-sm text-[#475569] group-hover:text-[#1e293b]">{level}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-semibold text-[#1e293b]">Minimum Rating</label>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="radio" 
              name="rating"
              checked={!activeRating}
              onChange={() => updateFilter("rating", null)}
              className="w-4 h-4 text-[#0f766e] border-slate-300 focus:ring-[#0f766e]"
            />
            <span className="text-sm text-[#475569] group-hover:text-[#1e293b]">Any Rating</span>
          </label>
          {ratings.map((rating) => (
            <label key={rating} className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="radio" 
                name="rating"
                checked={activeRating === rating}
                onChange={() => updateFilter("rating", rating)}
                className="w-4 h-4 text-[#0f766e] border-slate-300 focus:ring-[#0f766e]"
              />
              <span className="text-sm text-[#475569] group-hover:text-[#1e293b] flex items-center gap-1">
                {rating}+ <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-semibold text-[#1e293b]">Availability</label>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="radio" 
              name="availability"
              checked={!activeAvailability}
              onChange={() => updateFilter("availability", null)}
              className="w-4 h-4 text-[#0f766e] border-slate-300 focus:ring-[#0f766e]"
            />
            <span className="text-sm text-[#475569] group-hover:text-[#1e293b]">All</span>
          </label>
          {availabilities.map((av) => (
            <label key={av} className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="radio" 
                name="availability"
                checked={activeAvailability === av}
                onChange={() => updateFilter("availability", av)}
                className="w-4 h-4 text-[#0f766e] border-slate-300 focus:ring-[#0f766e]"
              />
              <span className="text-sm text-[#475569] group-hover:text-[#1e293b]">{av}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-semibold text-[#1e293b]">Location</label>
        <select 
          className="w-full bg-white border border-[#e2e8f0] text-sm rounded-lg px-3 py-2.5 text-[#1e293b] focus:ring-2 focus:ring-[#0f766e] focus:border-transparent outline-none cursor-pointer shadow-sm"
          value={activeLocation || ""}
          onChange={(e) => updateFilter("location", e.target.value || null)}
        >
          <option value="">All Locations</option>
          {locations.map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>
      
      {/* Apply Button for Mobile */}
      {onCloseMobile && (
        <div className="sticky bottom-0 bg-white pt-4 pb-2 border-t border-slate-100 mt-4">
          <Button onClick={onCloseMobile} className="w-full">
            Show Results
          </Button>
        </div>
      )}
    </div>
  )
}
