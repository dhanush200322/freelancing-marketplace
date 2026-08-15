import * as React from "react"

export default function ProjectsLoading() {
  return (
    <div className="bg-[#f8fafc] min-h-screen">
      {/* Header Skeleton */}
      <div className="bg-[#0f766e] py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-10 md:h-12 w-3/4 max-w-2xl bg-white/20 rounded-lg mx-auto mb-6 animate-pulse" />
          <div className="h-6 w-5/6 max-w-xl bg-white/20 rounded-lg mx-auto animate-pulse" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Filters Skeleton */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm space-y-8 animate-pulse">
              <div className="space-y-4">
                <div className="h-6 w-24 bg-[#e2e8f0] rounded-md" />
                <div className="h-10 w-full bg-[#f1f5f9] rounded-xl" />
                <div className="h-10 w-full bg-[#f1f5f9] rounded-xl" />
                <div className="h-10 w-full bg-[#f1f5f9] rounded-xl" />
              </div>
            </div>
          </div>

          {/* List Skeleton */}
          <div className="flex-1 space-y-6">
            {/* Search/Sort header skeleton */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6 animate-pulse">
              <div className="h-12 w-full bg-white rounded-xl border border-[#e2e8f0]" />
              <div className="h-12 w-full sm:w-48 bg-white rounded-xl border border-[#e2e8f0] flex-shrink-0" />
            </div>

            {/* Cards */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm animate-pulse">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                  <div className="space-y-2 w-full max-w-sm">
                    <div className="h-6 bg-[#e2e8f0] rounded-md w-3/4" />
                    <div className="h-4 bg-[#f1f5f9] rounded-md w-1/2" />
                  </div>
                  <div className="h-8 bg-[#e2e8f0] rounded-full w-24" />
                </div>
                <div className="h-4 bg-[#f1f5f9] rounded-md w-full mb-2" />
                <div className="h-4 bg-[#f1f5f9] rounded-md w-5/6 mb-6" />
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3].map(j => (
                    <div key={j} className="h-6 w-16 bg-[#e2e8f0] rounded-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
