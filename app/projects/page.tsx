"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { projects } from "@/data/mockData"
import { ProjectFilters } from "@/components/projects/ProjectFilters"
import { ProjectCard } from "@/components/projects/ProjectCard"
import { ProjectPagination } from "@/components/projects/ProjectPagination"
import { MobileFilterDrawer } from "@/components/projects/MobileFilterDrawer"
import { SearchX } from "lucide-react"
import { Button } from "@/components/ui/Button"

const ITEMS_PER_PAGE = 12

function DiscoveryContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const search = searchParams.get("search")?.toLowerCase() || ""
  const category = searchParams.get("category") || ""
  const minBudget = parseInt(searchParams.get("minBudget") || "0")
  const maxBudget = parseInt(searchParams.get("maxBudget") || "999999")
  const level = searchParams.get("level") || ""
  const skillsParam = searchParams.get("skills") || ""
  const sort = searchParams.get("sort") || "newest"
  const currentPage = Number(searchParams.get("page")) || 1

  // Filter Logic
  const filteredProjects = React.useMemo(() => {
    return projects.filter(project => {
      // Search
      if (search) {
        const matchesTitle = project.title.toLowerCase().includes(search)
        const matchesClient = project.clientName.toLowerCase().includes(search)
        const matchesDesc = project.description.toLowerCase().includes(search)
        const matchesSkills = project.skills.some(s => s.toLowerCase().includes(search))
        if (!matchesTitle && !matchesClient && !matchesDesc && !matchesSkills) return false
      }
      
      // Category
      if (category && project.categoryId !== category) return false
      
      // Budget
      if (minBudget > 0 && project.budgetMax < minBudget) return false
      if (maxBudget < 999999 && project.budgetMin > maxBudget) return false
      
      // Experience Level
      if (level && project.experienceLevel !== level) return false
      
      // Skills
      if (skillsParam) {
        const skillsArray = skillsParam.split(",")
        const hasAllSkills = skillsArray.every(s => project.skills.includes(s))
        if (!hasAllSkills) return false
      }
      
      return true
    }).sort((a, b) => {
      if (sort === "newest") return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
      if (sort === "budget-high") return b.budgetMax - a.budgetMax
      if (sort === "budget-low") return a.budgetMin - b.budgetMin
      return 0
    })
  }, [search, category, minBudget, maxBudget, level, skillsParam, sort])

  // Pagination Logic
  const totalItems = filteredProjects.length
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE))
  const actualPage = Math.min(currentPage, totalPages)
  const startIndex = (actualPage - 1) * ITEMS_PER_PAGE
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const clearFilters = () => {
    router.push("/projects", { scroll: false })
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen py-12 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 lg:mb-16 max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[#1e293b] mb-4">
            Discover your next project
          </h1>
          <p className="text-lg text-[#475569]">
            Browse thousands of high-quality freelance jobs from top clients and companies.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Sidebar Filters (Desktop) */}
          <div className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24 bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm">
              <ProjectFilters />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            
            {/* Mobile Filter Drawer */}
            <MobileFilterDrawer />

            {/* Results Header & Sort */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div className="text-[#475569] font-medium">
                <span className="text-[#1e293b] font-bold text-lg">{totalItems}</span> jobs found
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-[#475569]">Sort by:</span>
                <select 
                  className="bg-white border border-[#e2e8f0] text-sm rounded-lg px-3 py-2 text-[#1e293b] focus:ring-2 focus:ring-[#0f766e] focus:border-transparent outline-none cursor-pointer shadow-sm"
                  value={sort}
                  onChange={(e) => {
                    const current = new URLSearchParams(Array.from(searchParams.entries()))
                    current.set("sort", e.target.value)
                    router.push(`/projects?${current.toString()}`, { scroll: false })
                  }}
                >
                  <option value="newest">Newest First</option>
                  <option value="budget-high">Highest Budget</option>
                  <option value="budget-low">Lowest Budget</option>
                </select>
              </div>
            </div>

            {/* Results Grid */}
            <AnimatePresence mode="wait">
              {paginatedProjects.length > 0 ? (
                <motion.div 
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6"
                >
                  {paginatedProjects.map((project, idx) => (
                    <motion.div 
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                    >
                      <ProjectCard project={project} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-2xl border border-dashed border-[#cbd5e1] p-12 text-center flex flex-col items-center justify-center min-h-[400px]"
                >
                  <div className="w-16 h-16 bg-[#f1f5f9] rounded-full flex items-center justify-center mb-4">
                    <SearchX className="h-8 w-8 text-[#94a3b8]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1e293b] mb-2">No projects found</h3>
                  <p className="text-[#475569] mb-6 max-w-sm">
                    Try adjusting your filters or searching for a different skill to find what you&apos;re looking for.
                  </p>
                  <Button onClick={clearFilters} variant="outline" className="bg-white">
                    Clear Filters
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination */}
            {paginatedProjects.length > 0 && (
              <ProjectPagination totalItems={totalItems} itemsPerPage={ITEMS_PER_PAGE} />
            )}
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProjectsDiscoveryPage() {
  return (
    <React.Suspense fallback={
      <div className="min-h-screen bg-[#f8fafc] py-20 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#0f766e] border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <DiscoveryContent />
    </React.Suspense>
  )
}
