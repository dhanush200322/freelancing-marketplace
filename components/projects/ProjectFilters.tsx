"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { categories } from "@/data/mockData"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"

const experienceLevels = ["Entry", "Intermediate", "Expert"]
const commonSkills = ["React", "Next.js", "TypeScript", "Node.js", "Python", "UI/UX", "Figma", "SEO", "Content Writing", "Automation", "React Native", "API Integration", "Tailwind CSS"]

export function ProjectFilters({ onCloseMobile }: { onCloseMobile?: () => void }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Local state for debounced search
  const [searchTerm, setSearchTerm] = React.useState(searchParams.get("search") || "")
  
  // Custom budget state
  const [minBudget, setMinBudget] = React.useState(searchParams.get("minBudget") || "")
  const [maxBudget, setMaxBudget] = React.useState(searchParams.get("maxBudget") || "")

  const updateFilter = React.useCallback((key: string, value: string | null) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    
    if (value) {
      current.set(key, value)
    } else {
      current.delete(key)
    }
    
    // Always reset page to 1 when filters change
    current.delete("page")

    const search = current.toString()
    const query = search ? `?${search}` : ""
    
    router.push(`/projects${query}`, { scroll: false })
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

  const clearAll = () => {
    setSearchTerm("")
    setMinBudget("")
    setMaxBudget("")
    router.push("/projects", { scroll: false })
    if (onCloseMobile) onCloseMobile()
  }

  const handleCustomBudgetApply = () => {
    // Basic validation: ignore if invalid
    const min = parseInt(minBudget)
    const max = parseInt(maxBudget)
    
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    
    if (!isNaN(min) && min >= 0) {
      current.set("minBudget", min.toString())
    } else {
      current.delete("minBudget")
    }

    if (!isNaN(max) && max >= 0 && (isNaN(min) || max >= min)) {
      current.set("maxBudget", max.toString())
    } else {
      current.delete("maxBudget")
    }
    
    current.delete("budget") // clear predefined budget selection
    current.delete("page")
    
    router.push(`/projects?${current.toString()}`, { scroll: false })
  }

  const activeCategory = searchParams.get("category")
  const activeLevel = searchParams.get("level")
  const activeBudget = searchParams.get("budget")
  const activeSkills = searchParams.get("skills")?.split(",") || []

  // Calculate active filter count
  let filterCount = 0
  if (searchTerm) filterCount++
  if (activeCategory) filterCount++
  if (activeLevel) filterCount++
  if (activeBudget || searchParams.get("minBudget") || searchParams.get("maxBudget")) filterCount++
  if (activeSkills.length > 0) filterCount += activeSkills.length

  return (
    <div className="flex flex-col gap-8">
      {/* Header (visible on mobile drawer mostly) */}
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
            placeholder="Search keywords..." 
            className="pl-9"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#1e293b]"
              aria-label="Clear search"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>

      {/* Category */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-semibold text-[#1e293b]">Category</label>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="radio" 
              name="category"
              checked={!activeCategory}
              onChange={() => updateFilter("category", null)}
              className="w-4 h-4 text-[#0f766e] border-slate-300 focus:ring-[#0f766e]"
            />
            <span className="text-sm text-[#475569] group-hover:text-[#1e293b]">All Categories</span>
          </label>
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="radio" 
                name="category"
                checked={activeCategory === cat.id}
                onChange={() => updateFilter("category", cat.id)}
                className="w-4 h-4 text-[#0f766e] border-slate-300 focus:ring-[#0f766e]"
              />
              <span className="text-sm text-[#475569] group-hover:text-[#1e293b]">{cat.name}</span>
            </label>
          ))}
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

      {/* Budget */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-semibold text-[#1e293b]">Budget Range</label>
        <div className="flex flex-col gap-2">
          {[
            { label: "Any Budget", value: "" },
            { label: "Under $500", value: "0-500" },
            { label: "$500 - $1,000", value: "500-1000" },
            { label: "$1,000 - $2,500", value: "1000-2500" },
            { label: "$2,500 - $5,000", value: "2500-5000" },
            { label: "$5,000+", value: "5000-99999" },
          ].map((range) => (
            <label key={range.value} className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="radio" 
                name="budget"
                checked={(activeBudget === range.value) || (!activeBudget && range.value === "" && !searchParams.get("minBudget") && !searchParams.get("maxBudget"))}
                onChange={() => {
                  updateFilter("budget", range.value || null)
                  // clear custom budget when clicking preset
                  setMinBudget("")
                  setMaxBudget("")
                  const current = new URLSearchParams(Array.from(searchParams.entries()))
                  current.delete("minBudget")
                  current.delete("maxBudget")
                  if(range.value) current.set("budget", range.value)
                  else current.delete("budget")
                  current.delete("page")
                  router.push(`/projects?${current.toString()}`, { scroll: false })
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
            value={minBudget}
            onChange={(e) => setMinBudget(e.target.value)}
            min="0"
          />
          <span className="text-[#94a3b8]">-</span>
          <Input 
            type="number" 
            placeholder="Max" 
            className="w-full text-sm" 
            value={maxBudget}
            onChange={(e) => setMaxBudget(e.target.value)}
            min="0"
          />
          <Button size="sm" variant="outline" onClick={handleCustomBudgetApply} className="shrink-0">Go</Button>
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
