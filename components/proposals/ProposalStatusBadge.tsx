import * as React from "react"
import { ProposalStatus } from "@/types"
import { Badge } from "@/components/ui/Badge"
import { cn } from "@/lib/utils"

interface ProposalStatusBadgeProps {
  status: ProposalStatus;
  className?: string;
}

export function ProposalStatusBadge({ status, className }: ProposalStatusBadgeProps) {
  const statusStyles: Record<ProposalStatus, string> = {
    "Submitted": "bg-slate-100 text-slate-700 border-slate-200",
    "Under Review": "bg-blue-100 text-blue-700 border-blue-200",
    "Accepted": "bg-emerald-100 text-emerald-700 border-emerald-200",
    "Rejected": "bg-rose-100 text-rose-700 border-rose-200",
  }

  return (
    <Badge variant="outline" className={cn("font-medium", statusStyles[status], className)}>
      {status}
    </Badge>
  )
}
