import * as React from "react"

export default function DashboardLoading() {
  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8 animate-pulse">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="h-8 w-48 bg-[#e2e8f0] rounded-lg mb-2" />
          <div className="h-4 w-64 bg-[#f1f5f9] rounded-md" />
        </div>
        <div className="h-10 w-32 bg-[#e2e8f0] rounded-xl" />
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm">
            <div className="h-10 w-10 bg-[#f1f5f9] rounded-xl mb-4" />
            <div className="h-8 w-24 bg-[#e2e8f0] rounded-lg mb-1" />
            <div className="h-4 w-32 bg-[#f1f5f9] rounded-md" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Active Projects Block */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-6">
            <div className="h-6 w-48 bg-[#e2e8f0] rounded-lg mb-6" />
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-24 w-full bg-[#f1f5f9] rounded-xl" />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-6">
            <div className="h-6 w-32 bg-[#e2e8f0] rounded-lg mb-6" />
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-[#f1f5f9] flex-shrink-0" />
                  <div className="space-y-2 w-full">
                    <div className="h-4 w-3/4 bg-[#e2e8f0] rounded-md" />
                    <div className="h-3 w-1/2 bg-[#f1f5f9] rounded-md" />
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
