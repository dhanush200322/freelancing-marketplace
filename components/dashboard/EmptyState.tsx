"use client"

import * as React from "react"
import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/Button"

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
}

export function EmptyState({ icon: Icon, title, description, primaryAction, secondaryAction }: EmptyStateProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-12 text-center flex flex-col items-center justify-center">
      <div className="w-16 h-16 bg-[#f1f5f9] rounded-full flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 text-[#94a3b8]" />
      </div>
      <h3 className="text-xl font-bold text-[#1e293b] mb-2">{title}</h3>
      <p className="text-[#64748b] max-w-md mx-auto mb-8">{description}</p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        {primaryAction && (
          <Link href={primaryAction.href}>
            <Button className="shadow-lg shadow-[#0f766e]/20">
              {primaryAction.label}
            </Button>
          </Link>
        )}
        {secondaryAction && (
          <Link href={secondaryAction.href}>
            <Button variant="outline" className="bg-white">
              {secondaryAction.label}
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
