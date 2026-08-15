"use client"

import * as React from "react"
import { PortfolioItem } from "@/types"
import { ExternalLink } from "lucide-react"

interface PortfolioCardProps {
  item: PortfolioItem
}

export function PortfolioCard({ item }: PortfolioCardProps) {
  return (
    <div className="group relative rounded-2xl overflow-hidden border border-[#e2e8f0] bg-white aspect-[4/3]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src={item.imageUrl} 
        alt={item.title} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-[#0f172a]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <h4 className="text-white font-bold text-lg mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          {item.title}
        </h4>
        
        {item.link ? (
          <a 
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-teal-300 hover:text-white transition-colors translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75"
          >
            View Project <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
          </a>
        ) : (
          <span className="inline-flex items-center text-sm font-medium text-slate-300 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 cursor-not-allowed">
            View Details
          </span>
        )}
      </div>
    </div>
  )
}
