import { CyberSkeleton } from "@/components/ui/CyberSkeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-black p-8 md:p-24 space-y-24">
      {/* Hero Section Skeleton */}
      <div className="max-w-4xl space-y-8">
        <div className="space-y-4">
          <div className="h-12 md:h-20 w-2/3 bg-white/5 rounded-2xl animate-pulse" />
          <div className="h-12 md:h-20 w-1/2 bg-white/5 rounded-2xl animate-pulse" />
        </div>
        <div className="h-4 w-1/3 bg-white/5 rounded-full animate-pulse" />
      </div>

      {/* Projects Grid Skeleton */}
      <div className="space-y-12">
        <div className="h-8 w-48 bg-white/5 rounded-lg animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <CyberSkeleton key={i} count={1} className="h-[400px]" />
          ))}
        </div>
      </div>

      {/* Experience/Certificates Skeleton */}
      <div className="space-y-12">
        <div className="h-8 w-64 bg-white/5 rounded-lg animate-pulse" />
        <div className="space-y-6">
          {[...Array(2)].map((_, i) => (
            <CyberSkeleton key={i} count={1} />
          ))}
        </div>
      </div>
    </div>
  );
}
