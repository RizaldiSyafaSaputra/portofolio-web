import { CyberSkeleton } from "@/components/ui/CyberSkeleton";

export default function AdminLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="h-48 bg-neutral-950 border border-white/5 rounded-3xl p-8 flex flex-col justify-center space-y-4">
        <div className="h-10 w-1/3 bg-white/5 rounded-lg" />
        <div className="h-4 w-1/2 bg-white/5 rounded-lg" />
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-neutral-950 border border-white/5 rounded-3xl" />
        ))}
      </div>

      {/* Main Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CyberSkeleton count={3} />
        </div>
        <div className="h-[400px] bg-neutral-950 border border-white/5 rounded-3xl" />
      </div>
    </div>
  );
}
