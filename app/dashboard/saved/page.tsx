"use client"

import * as React from "react"
import { savedProjects, savedFreelancers } from "@/data/mockData"
import { ProjectCard } from "@/components/projects/ProjectCard"
import { FreelancerCard } from "@/components/freelancers/FreelancerCard"
import { EmptyState } from "@/components/dashboard/EmptyState"
import { Heart } from "lucide-react"

export default function DashboardSavedPage() {
  
  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-12">
      
      <div>
        <h1 className="text-3xl font-bold text-[#1e293b] mb-2">Saved Items</h1>
        <p className="text-[#64748b]">Quickly access your saved projects and freelancers.</p>
      </div>

      {savedProjects.length === 0 && savedFreelancers.length === 0 ? (
        <EmptyState 
          icon={Heart}
          title="No saved items yet"
          description="When you see a project or freelancer you like, click the heart icon to save them here for later."
          primaryAction={{
            label: "Explore Projects",
            href: "/projects"
          }}
          secondaryAction={{
            label: "Find Freelancers",
            href: "/freelancers"
          }}
        />
      ) : (
        <>
          {/* Saved Projects */}
          {savedProjects.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-[#1e293b] mb-6 flex items-center gap-2">
                Saved Projects
                <span className="bg-[#e2e8f0] text-[#475569] text-sm py-0.5 px-2.5 rounded-full font-medium">
                  {savedProjects.length}
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {savedProjects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>
          )}

          {/* Saved Freelancers */}
          {savedFreelancers.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-[#1e293b] mb-6 flex items-center gap-2">
                Saved Freelancers
                <span className="bg-[#e2e8f0] text-[#475569] text-sm py-0.5 px-2.5 rounded-full font-medium">
                  {savedFreelancers.length}
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {savedFreelancers.map(freelancer => (
                  <FreelancerCard key={freelancer.id} freelancer={freelancer} />
                ))}
              </div>
            </section>
          )}
        </>
      )}

    </div>
  )
}
