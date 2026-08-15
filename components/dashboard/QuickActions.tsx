"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { PlusCircle, Search, Users, FileText } from "lucide-react"

const actions = [
  {
    title: "Post a Project",
    description: "Create a new project to hire freelancers.",
    icon: PlusCircle,
    href: "/proposal/new", // Simulated link, typically would be /projects/post
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
  {
    title: "Find Freelancers",
    description: "Browse our network of top talent.",
    icon: Users,
    href: "/freelancers",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Find Projects",
    description: "Browse open projects and submit proposals.",
    icon: Search,
    href: "/projects",
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
  {
    title: "Review Proposals",
    description: "Manage and respond to your proposals.",
    icon: FileText,
    href: "/dashboard/proposals",
    color: "text-rose-600",
    bgColor: "bg-rose-100",
  }
]

export function QuickActions() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <Link key={action.title} href={action.href}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm hover:shadow-md hover:border-[#0f766e]/30 transition-all group h-full flex flex-col"
          >
            <div className={`w-12 h-12 rounded-xl ${action.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <action.icon className={`w-6 h-6 ${action.color}`} />
            </div>
            <h3 className="font-bold text-[#1e293b] mb-2">{action.title}</h3>
            <p className="text-xs text-[#64748b] leading-relaxed">{action.description}</p>
          </motion.div>
        </Link>
      ))}
    </div>
  )
}
