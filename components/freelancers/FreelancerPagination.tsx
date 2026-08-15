"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface FreelancerPaginationProps {
  totalItems: number;
  itemsPerPage: number;
}

export function FreelancerPagination({ totalItems, itemsPerPage }: FreelancerPaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const currentPage = Number(searchParams.get("page")) || 1
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage))

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return
    
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    current.set("page", newPage.toString())
    
    router.push(`/freelancers?${current.toString()}`, { scroll: true }) 
  }

  if (totalPages <= 1) return null

  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      let start = Math.max(1, currentPage - 2)
      const endCandidate = start + maxVisiblePages - 1
      const end = Math.min(totalPages, endCandidate)
      
      if (end - start < maxVisiblePages - 1) {
        start = Math.max(1, end - maxVisiblePages + 1)
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
    }
    
    return pages
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-10 h-10 rounded-lg border border-[#e2e8f0] bg-white text-[#475569] hover:bg-[#f8fafc] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      {getPageNumbers().map(page => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`flex items-center justify-center w-10 h-10 rounded-lg border transition-colors ${
            currentPage === page
              ? "bg-[#0f766e] border-[#0f766e] text-white font-medium shadow-sm"
              : "border-[#e2e8f0] bg-white text-[#475569] hover:bg-[#f8fafc]"
          }`}
          aria-label={`Page ${page}`}
          aria-current={currentPage === page ? "page" : undefined}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-10 h-10 rounded-lg border border-[#e2e8f0] bg-white text-[#475569] hover:bg-[#f8fafc] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  )
}
