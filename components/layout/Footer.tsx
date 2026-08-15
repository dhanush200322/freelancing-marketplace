"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Briefcase, MessageSquare, Code, Users, Camera } from "lucide-react"

const footerLinks = {
  platform: [
    { name: "Find Projects", href: "/projects" },
    { name: "Find Freelancers", href: "/freelancers" },
    { name: "Categories", href: "/#categories" },
    { name: "Dashboard", href: "/dashboard" },
  ],
  resources: [
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Help Center", href: "/help" },
    { name: "Success Stories", href: "/success-stories" },
    { name: "Community", href: "/community" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
    { name: "Support", href: "/support" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ]
}

export function Footer() {
  const pathname = usePathname()

  // Do not show footer on dashboard routes
  if (pathname.startsWith("/dashboard")) {
    return null
  }

  return (
    <footer className="bg-white border-t border-[#e2e8f0] pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12 mb-16">
          
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e] rounded-lg w-fit">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0f766e] text-white">
                <Briefcase className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#1e293b]">
                Work<span className="text-[#0f766e]">Market</span>
              </span>
            </Link>
            <p className="text-[#64748b] text-sm leading-relaxed mb-6 pr-4">
              A premium marketplace connecting visionary businesses with top-tier freelance talent for specialized projects globally.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-center text-[#64748b] hover:text-[#0f766e] hover:border-[#0f766e] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e]">
                <MessageSquare className="w-4 h-4" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-center text-[#64748b] hover:text-[#0f766e] hover:border-[#0f766e] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e]">
                <Code className="w-4 h-4" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-center text-[#64748b] hover:text-[#0f766e] hover:border-[#0f766e] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e]">
                <Users className="w-4 h-4" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-center text-[#64748b] hover:text-[#0f766e] hover:border-[#0f766e] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e]">
                <Camera className="w-4 h-4" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-[#1e293b] mb-4">Platform</h3>
            <ul className="space-y-3">
              {footerLinks.platform.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-[#475569] hover:text-[#0f766e] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e] rounded-sm px-1 -mx-1">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-[#1e293b] mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-[#475569] hover:text-[#0f766e] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e] rounded-sm px-1 -mx-1">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-[#1e293b] mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-[#475569] hover:text-[#0f766e] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e] rounded-sm px-1 -mx-1">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-[#1e293b] mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-[#475569] hover:text-[#0f766e] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e] rounded-sm px-1 -mx-1">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-[#e2e8f0] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#94a3b8]">
            &copy; {new Date().getFullYear()} WorkMarket Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
            <span>Designed for the Future of Work.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
