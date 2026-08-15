"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ActivityItem } from "@/types"
import { 
  FileText, 
  CheckCircle2, 
  XCircle, 
  UserPlus, 
  Briefcase, 
  Heart,
  HelpCircle
} from "lucide-react"

interface ActivityTimelineProps {
  activities: ActivityItem[];
}

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  
  const getActivityIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "Proposal Submitted":
        return <FileText className="w-5 h-5 text-blue-600" />
      case "Proposal Accepted":
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />
      case "Proposal Rejected":
        return <XCircle className="w-5 h-5 text-rose-600" />
      case "Freelancer Invited":
        return <UserPlus className="w-5 h-5 text-purple-600" />
      case "Project Posted":
        return <Briefcase className="w-5 h-5 text-indigo-600" />
      case "Project Completed":
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />
      case "Freelancer Saved":
      case "Project Saved":
        return <Heart className="w-5 h-5 text-pink-600 fill-current" />
      default:
        return <HelpCircle className="w-5 h-5 text-slate-400" />
    }
  }

  const getActivityColor = (type: ActivityItem["type"]) => {
    switch (type) {
      case "Proposal Submitted": return "bg-blue-100"
      case "Proposal Accepted": return "bg-emerald-100"
      case "Proposal Rejected": return "bg-rose-100"
      case "Freelancer Invited": return "bg-purple-100"
      case "Project Posted": return "bg-indigo-100"
      case "Project Completed": return "bg-emerald-100"
      case "Freelancer Saved":
      case "Project Saved": return "bg-pink-100"
      default: return "bg-slate-100"
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-6 lg:p-8">
      <h3 className="font-bold text-[#1e293b] mb-6">Recent Activity</h3>
      
      {activities.length > 0 ? (
        <div className="relative border-l-2 border-[#e2e8f0] ml-4 space-y-8">
          {activities.map((activity, index) => (
            <motion.div 
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative pl-8"
            >
              {/* Icon Circle */}
              <div className={`absolute -left-[21px] top-0 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white ${getActivityColor(activity.type)}`}>
                {getActivityIcon(activity.type)}
              </div>
              
              {/* Content */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1">
                  <h4 className="font-bold text-[#1e293b]">{activity.title}</h4>
                  <span className="text-xs text-[#94a3b8] font-medium">
                    {new Date(activity.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-sm text-[#475569]">{activity.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center text-[#64748b]">
          <p>No recent activity found.</p>
        </div>
      )}
    </div>
  )
}
