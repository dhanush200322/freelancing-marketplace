"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { freelancers } from "@/data/mockData"
import { FreelancerFilters } from "@/components/freelancers/FreelancerFilters"
import { FreelancerCard } from "@/components/freelancers/FreelancerCard"
import { FreelancerPagination } from "@/components/freelancers/FreelancerPagination"
import { MobileFreelancerFilterDrawer } from "@/components/freelancers/MobileFreelancerFilterDrawer"
import { SearchX } from "lucide-react"
import { Button } from "@/components/ui/Button"

const ITEMS_PER_PAGE = 12

function FreelancerDiscoveryContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const search = searchParams.get("search")?.toLowerCase() || ""
  const category = searchParams.get("category") || ""
  const minRate = parseInt(searchParams.get("minRate") || "0")
  const maxRate = parseInt(searchParams.get("maxRate") || "999999")
  const level = searchParams.get("level") || ""
  const ratingStr = searchParams.get("rating") || ""
  const ratingMin = ratingStr ? parseFloat(ratingStr) : 0
  const location = searchParams.get("location") || ""
  const availability = searchParams.get("availability") || ""
  
  const skillsParam = searchParams.get("skills") || ""
  
  const sort = searchParams.get("sort") || "top-rated"
  const currentPage = Number(searchParams.get("page")) || 1

  // Filter Logic
  const filteredFreelancers = React.useMemo(() => {
    return freelancers.filter(freelancer => {
      // Search
      if (search) {
        const matchesName = freelancer.name.toLowerCase().includes(search)
        const matchesUsername = freelancer.username.toLowerCase().includes(search)
        const matchesTitle = freelancer.title.toLowerCase().includes(search)
        const matchesBio = freelancer.bio.toLowerCase().includes(search)
        const matchesSkills = freelancer.skills.some(s => s.toLowerCase().includes(search))
        const matchesLocation = freelancer.location.toLowerCase().includes(search)
        const matchesCategory = freelancer.category.toLowerCase().includes(search)
        
        if (!matchesName && !matchesUsername && !matchesTitle && !matchesBio && !matchesSkills && !matchesLocation && !matchesCategory) return false
      }
      
      // Category
      if (category && freelancer.categoryId !== category) return false
      
      // Hourly Rate
      if (minRate > 0 && freelancer.hourlyRate < minRate) return false
      if (maxRate < 999999 && freelancer.hourlyRate > maxRate) return false
      
      // Experience Level
      if (level && freelancer.experienceLevel !== level) return false

      // Rating
      if (ratingMin > 0 && freelancer.rating < ratingMin) return false

      // Location
      if (location && freelancer.location !== location) return false

      // Availability
      if (availability && freelancer.availability !== availability) return false
      
      // Skills
      if (skillsParam) {
        const skillsArray = skillsParam.split(",")
        const hasAllSkills = skillsArray.every(s => freelancer.skills.includes(s))
        if (!hasAllSkills) return false
      }
      
      return true
    }).sort((a, b) => {
      if (sort === "top-rated") return b.rating - a.rating || b.reviewCount - a.reviewCount
      if (sort === "most-experienced") return b.completedProjects - a.completedProjects
      if (sort === "rate-high") return b.hourlyRate - a.hourlyRate
      if (sort === "rate-low") return a.hourlyRate - b.hourlyRate
      if (sort === "newest") return new Date(b.memberSince).getTime() - new Date(a.memberSince).getTime()
      return 0
    })
  }, [search, category, minRate, maxRate, level, ratingMin, location, availability, skillsParam, sort])

  // Pagination Logic
  const totalItems = filteredFreelancers.length
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE))
  const actualPage = Math.min(currentPage, totalPages)
  const startIndex = (actualPage - 1) * ITEMS_PER_PAGE
  const paginatedFreelancers = filteredFreelancers.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const clearFilters = () => {
    router.push("/freelancers", { scroll: false })
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen py-12 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 lg:mb-16 max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[#1e293b] mb-4">
            Find exceptional talent
          </h1>
          <p className="text-lg text-[#475569]">
            Discover skilled professionals ready to bring your next idea to life.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Sidebar Filters (Desktop) */}
          <div className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24 bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm">
              <FreelancerFilters />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            
            {/* Mobile Filter Drawer */}
            <MobileFreelancerFilterDrawer />

            {/* Results Header & Sort */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div className="text-[#475569] font-medium">
                <span className="text-[#1e293b] font-bold text-lg">{totalItems}</span> freelancers found
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-[#475569]">Sort by:</span>
                <select 
                  className="bg-white border border-[#e2e8f0] text-sm rounded-lg px-3 py-2 text-[#1e293b] focus:ring-2 focus:ring-[#0f766e] focus:border-transparent outline-none cursor-pointer shadow-sm"
                  value={sort}
                  onChange={(e) => {
                    const current = new URLSearchParams(Array.from(searchParams.entries()))
                    current.set("sort", e.target.value)
                    router.push(`/freelancers?${current.toString()}`, { scroll: false })
                  }}
                >
                  <option value="top-rated">Top Rated</option>
                  <option value="most-experienced">Most Experienced</option>
                  <option value="rate-low">Lowest Hourly Rate</option>
                  <option value="rate-high">Highest Hourly Rate</option>
                  <option value="newest">Newest Freelancers</option>
                </select>
              </div>
            </div>

            {/* Results Grid */}
            <AnimatePresence mode="wait">
              {paginatedFreelancers.length > 0 ? (
                <motion.div 
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6"
                >
                  {paginatedFreelancers.map((freelancer, idx) => (
                    <motion.div 
                      key={freelancer.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                    >
                      <FreelancerCard freelancer={freelancer} />
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
                  <h3 className="text-xl font-bold text-[#1e293b] mb-2">No freelancers found</h3>
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
            {paginatedFreelancers.length > 0 && (
              <FreelancerPagination totalItems={totalItems} itemsPerPage={ITEMS_PER_PAGE} />
            )}
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FreelancersDiscoveryPage() {
  return (
    <React.Suspense fallback={
      <div className="min-h-screen bg-[#f8fafc] py-20 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#0f766e] border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <FreelancerDiscoveryContent />
    </React.Suspense>
  )
}
