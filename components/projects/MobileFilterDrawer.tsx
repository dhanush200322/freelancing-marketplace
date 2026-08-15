"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Filter, X } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { ProjectFilters } from "./ProjectFilters"

export function MobileFilterDrawer() {
  const [isOpen, setIsOpen] = React.useState(false)

  // Prevent body scroll when drawer is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => { document.body.style.overflow = "unset" }
  }, [isOpen])

  // Handle escape key
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [])

  return (
    <>
      <div className="lg:hidden w-full mb-6 sticky top-20 z-30">
        <Button 
          onClick={() => setIsOpen(true)}
          variant="outline" 
          className="w-full bg-white shadow-sm"
        >
          <Filter className="w-4 h-4 mr-2" />
          Show Filters
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-slate-900/60 z-50 lg:hidden backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 z-50 lg:hidden bg-white rounded-t-2xl shadow-2xl overflow-hidden flex flex-col h-[85vh]"
              role="dialog"
              aria-modal="true"
              aria-label="Filter projects"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
                <h2 className="text-lg font-bold text-[#1e293b]">Filters</h2>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 -mr-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0f766e]"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <ProjectFilters onCloseMobile={() => setIsOpen(false)} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
