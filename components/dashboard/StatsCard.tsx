"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  description: string;
  index: number;
}

export function StatsCard({ label, value, icon: Icon, description, index }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-[#ccfbf1]/50 flex items-center justify-center">
          <Icon className="w-5 h-5 text-[#0f766e]" />
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-[#64748b] mb-1">{label}</p>
        <h3 className="text-3xl font-bold text-[#1e293b] mb-1">{value}</h3>
        <p className="text-xs text-[#94a3b8]">{description}</p>
      </div>
    </motion.div>
  )
}
