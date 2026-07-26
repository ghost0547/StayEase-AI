// Base Skeleton element with cyan shimmer animation and accessibility
export function Skeleton({ className = "", ...props }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-shimmer-glow bg-slate-200/80 dark:bg-slate-800/60 rounded-2xl ${className}`}
      {...props}
    />
  );
}

// Skeleton Text Line
export function SkeletonText({ className = "w-full h-4", ...props }) {
  return <Skeleton className={`my-1 ${className}`} {...props} />;
}

// Skeleton Button
export function SkeletonButton({ className = "w-32 h-11", ...props }) {
  return <Skeleton className={`rounded-xl ${className}`} {...props} />;
}

// Skeleton Avatar / Circle Icon
export function SkeletonAvatar({ className = "w-10 h-10", ...props }) {
  return <Skeleton className={`rounded-full ${className}`} {...props} />;
}

// Skeleton Image Box
export function SkeletonImage({ className = "w-full h-56", ...props }) {
  return <Skeleton className={`rounded-t-3xl ${className}`} {...props} />;
}

// Skeleton Homestay Card (Matching Card.jsx structure)
export function SkeletonCard() {
  return (
    <div
      aria-hidden="true"
      className="flex flex-col h-full rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl p-0 overflow-hidden shadow-lg space-y-0"
    >
      {/* Top Image area */}
      <div className="relative w-full h-56 bg-slate-200 dark:bg-slate-800/70 animate-shimmer-glow">
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <Skeleton className="w-24 h-6 rounded-full" />
          <Skeleton className="w-14 h-6 rounded-full" />
        </div>
        <div className="absolute bottom-4 right-4 z-10">
          <SkeletonAvatar className="w-9 h-9" />
        </div>
      </div>

      {/* Card Content area */}
      <div className="flex flex-col flex-1 p-6 space-y-4">
        {/* Title */}
        <SkeletonText className="h-6 w-4/5 rounded-lg" />
        {/* Location */}
        <div className="flex items-center gap-2">
          <Skeleton className="w-4 h-4 rounded-full" />
          <SkeletonText className="h-4 w-1/2 rounded-lg" />
        </div>
        {/* Description / Extra */}
        <SkeletonText className="h-3.5 w-full rounded-lg" />
        <SkeletonText className="h-3.5 w-2/3 rounded-lg" />

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
          <div className="space-y-1">
            <SkeletonText className="h-6 w-20 rounded-lg" />
          </div>
          <SkeletonButton className="w-28 h-9 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

// Skeleton Hero Section
export function SkeletonHero() {
  return (
    <div aria-hidden="true" className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <Skeleton className="w-48 h-8 rounded-full" />
          <Skeleton className="w-full h-14 rounded-2xl" />
          <Skeleton className="w-3/4 h-14 rounded-2xl" />
          <Skeleton className="w-full h-6 rounded-lg" />
          <Skeleton className="w-2/3 h-6 rounded-lg" />
          <div className="flex gap-4 pt-4">
            <SkeletonButton className="w-44 h-12 rounded-2xl" />
            <SkeletonButton className="w-40 h-12 rounded-2xl" />
          </div>
        </div>
        <Skeleton className="w-full h-[26rem] rounded-3xl" />
      </div>
    </div>
  );
}

// Skeleton AI Planner Output (Itinerary loading placeholder)
export function SkeletonAIPlanner() {
  return (
    <div
      aria-hidden="true"
      className="rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-cyan-500/30 backdrop-blur-2xl p-8 sm:p-10 shadow-2xl shadow-cyan-500/10 space-y-6 animate-pulse"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-6">
        <div className="flex items-center gap-3">
          <SkeletonAvatar className="w-10 h-10 rounded-xl" />
          <div className="space-y-2">
            <SkeletonText className="h-5 w-48 rounded-lg" />
            <SkeletonText className="h-3 w-32 rounded-md" />
          </div>
        </div>
        <SkeletonButton className="w-28 h-9 rounded-xl" />
      </div>

      {/* Generating Indicator Banner */}
      <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center gap-3">
        <div className="w-4 h-4 rounded-full bg-cyan-400 animate-ping" />
        <SkeletonText className="h-4 w-64 rounded-md" />
      </div>

      {/* Simulated Itinerary Cards / Days Skeletons */}
      <div className="space-y-4 pt-2">
        <div className="p-5 rounded-2xl bg-slate-100/60 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-xl" />
            <SkeletonText className="h-5 w-40 rounded-lg" />
          </div>
          <SkeletonText className="h-4 w-full rounded-md" />
          <SkeletonText className="h-4 w-3/4 rounded-md" />
        </div>

        <div className="p-5 rounded-2xl bg-slate-100/60 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-xl" />
            <SkeletonText className="h-5 w-48 rounded-lg" />
          </div>
          <SkeletonText className="h-4 w-full rounded-md" />
          <SkeletonText className="h-4 w-2/3 rounded-md" />
        </div>
      </div>
    </div>
  );
}

// Skeleton Dashboard View
export function SkeletonDashboard() {
  return (
    <div aria-hidden="true" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner */}
      <Skeleton className="w-full h-36 rounded-3xl" />
      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Skeleton className="h-28 rounded-3xl" />
        <Skeleton className="h-28 rounded-3xl" />
        <Skeleton className="h-28 rounded-3xl" />
      </div>
      {/* Saved homestays placeholder grid */}
      <div className="space-y-4">
        <SkeletonText className="h-6 w-48 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    </div>
  );
}

// Skeleton Homestay Details View
export function SkeletonDetail() {
  return (
    <div aria-hidden="true" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Navigation Top Bar */}
      <div className="flex justify-between items-center">
        <SkeletonText className="h-5 w-36 rounded-lg" />
        <div className="flex gap-2">
          <SkeletonAvatar className="w-10 h-10 rounded-xl" />
          <SkeletonAvatar className="w-10 h-10 rounded-xl" />
        </div>
      </div>

      {/* Large Banner Image */}
      <SkeletonImage className="w-full h-80 sm:h-[28rem] rounded-3xl" />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="w-full h-32 rounded-3xl" />
          <Skeleton className="w-full h-40 rounded-3xl" />
          <Skeleton className="w-full h-48 rounded-3xl" />
        </div>
        <div className="lg:col-span-1">
          <Skeleton className="w-full h-80 rounded-3xl" />
        </div>
      </div>
    </div>
  );
}
