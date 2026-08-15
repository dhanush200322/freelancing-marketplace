import * as React from "react"

export default function FreelancersLoading() {
  return (
    <div className="bg-[#f8fafc] min-h-screen">
      {/* Header Skeleton */}
      <div className="bg-[#1e293b] py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-10 md:h-12 w-3/4 max-w-2xl bg-white/10 rounded-lg mx-auto mb-6 animate-pulse" />
          <div className="h-6 w-5/6 max-w-xl bg-white/10 rounded-lg mx-auto animate-pulse" />
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

            {/* Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm flex flex-col items-center animate-pulse">
                  <div className="w-24 h-24 rounded-full bg-[#e2e8f0] mb-4" />
                  <div className="h-6 w-3/4 bg-[#e2e8f0] rounded-md mb-2" />
                  <div className="h-4 w-1/2 bg-[#f1f5f9] rounded-md mb-6" />
                  
                  <div className="w-full space-y-3 mb-6">
                    <div className="h-4 w-full bg-[#f1f5f9] rounded-md" />
                    <div className="h-4 w-full bg-[#f1f5f9] rounded-md" />
                  </div>

                  <div className="mt-auto w-full">
                    <div className="h-10 w-full bg-[#e2e8f0] rounded-xl" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
