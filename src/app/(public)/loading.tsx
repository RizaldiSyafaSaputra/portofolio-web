import CyberSkeleton from "@/components/ui/CyberSkeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-950 p-8 md:p-24 space-y-12">
      {/* Hero Skeleton */}
      <div className="space-y-6">
        <CyberSkeleton className="h-12 w-1/3" />
        <CyberSkeleton className="h-4 w-2/3" />
        <CyberSkeleton className="h-4 w-1/2" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-4">
            <CyberSkeleton className="h-64 w-full" />
            <CyberSkeleton className="h-6 w-3/4" />
            <CyberSkeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
