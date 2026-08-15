"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, Briefcase, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { name: "Find Projects", href: "/projects" },
  { name: "Find Freelancers", href: "/freelancers" },
  { name: "Categories", href: "/#categories" },
  { name: "How It Works", href: "/#how-it-works" },
]

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const pathname = usePathname()
  const router = useRouter()
  const [prevPathname, setPrevPathname] = React.useState(pathname)

  if (pathname !== prevPathname) {
    setPrevPathname(pathname)
    setIsMobileMenuOpen(false)
    setIsMobileSearchOpen(false)
  }

  // Handle Escape key
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false)
        setIsMobileSearchOpen(false)
      }
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [])

  // Prevent body scroll when menu open
  React.useEffect(() => {
    if (isMobileMenuOpen || isMobileSearchOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => { document.body.style.overflow = "unset" }
  }, [isMobileMenuOpen, isMobileSearchOpen])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/projects?search=${encodeURIComponent(searchQuery.trim())}`)
      setIsMobileSearchOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#e2e8f0] bg-white/90 backdrop-blur-md transition-all">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e] rounded-lg">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0f766e] text-white">
                <Briefcase className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#1e293b] hidden sm:block">
                Work<span className="text-[#0f766e]">Market</span>
              </span>
            </Link>
          </div>

          {/* Desktop Search & Navigation */}
          <div className="hidden lg:flex items-center flex-1 justify-between ml-8">
            <form onSubmit={handleSearch} className="relative max-w-sm w-full xl:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
              <input 
                type="text" 
                placeholder="Search projects..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-full border border-[#e2e8f0] bg-[#f8fafc] text-sm focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] focus:bg-white transition-colors"
                aria-label="Search projects"
                suppressHydrationWarning
              />
            </form>
            <nav className="flex items-center gap-6 xl:gap-8 ml-6">
              {navLinks.map((link) => {
                const isActive = link.href === "/" 
                  ? pathname === "/" 
                  : pathname.startsWith(link.href.split('?')[0].split('#')[0])
                  
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-[#0f766e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e] rounded-md px-1 whitespace-nowrap",
                      isActive ? "text-[#0f766e]" : "text-[#475569]"
                    )}
                  >
                    {link.name}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/dashboard" className={cn(
              "text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e] rounded-md px-1",
              pathname.startsWith("/dashboard") ? "text-[#0f766e]" : "text-[#475569] hover:text-[#0f766e]"
            )}>
              Dashboard
            </Link>
            <div className="h-4 w-px bg-[#e2e8f0] mx-2" />
            <Link href="/projects/post">
              <Button variant="outline" className="h-9 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0f766e]" suppressHydrationWarning>
                Post a Project
              </Button>
            </Link>
          </div>

          {/* Mobile Buttons */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="text-[#475569] p-2 hover:bg-[#f1f5f9] rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e]"
              aria-expanded={isMobileSearchOpen}
              aria-label="Toggle search"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#1e293b] p-2 hover:bg-[#f1f5f9] rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e]"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Dropdown */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-[#e2e8f0] bg-white absolute w-full left-0 shadow-md"
          >
            <div className="p-4">
              <form onSubmit={handleSearch} className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8]" />
                <input 
                  type="text" 
                  placeholder="Search projects..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] text-base focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e]"
                  aria-label="Search projects"
                  autoFocus
                />
                {searchQuery && (
                  <button 
                    type="button" 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#475569] p-1"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden border-t border-[#e2e8f0] bg-white overflow-hidden absolute w-full left-0 h-[calc(100vh-64px)] overflow-y-auto"
          >
            <div className="space-y-1 px-4 pb-6 pt-4">
              {navLinks.map((link) => {
                const isActive = link.href === "/" 
                  ? pathname === "/" 
                  : pathname.startsWith(link.href.split('?')[0].split('#')[0])
                  
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "block rounded-md px-3 py-3 text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e]",
                      isActive
                        ? "bg-[#ccfbf1] text-[#0f766e]"
                        : "text-[#475569] hover:bg-[#f8fafc] hover:text-[#1e293b]"
                    )}
                  >
                    {link.name}
                  </Link>
                )
              })}
              <div className="mt-6 border-t border-[#e2e8f0] pt-6 flex flex-col gap-3 px-3">
                <Link href="/dashboard" className="w-full">
                  <Button variant="ghost" className={cn(
                    "w-full justify-start px-0 text-base font-medium transition-colors focus-visible:ring-2 focus-visible:ring-[#0f766e] hover:bg-transparent",
                    pathname.startsWith("/dashboard") ? "text-[#0f766e]" : "text-[#475569] hover:text-[#0f766e]"
                  )}>
                    Dashboard
                  </Button>
                </Link>
                <Link href="/projects/post" className="w-full">
                  <Button className="w-full justify-center h-11 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0f766e]">
                    Post a Project
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
