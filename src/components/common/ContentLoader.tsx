import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ContentLoaderProps {
  rows?: number;
  className?: string;
}

export function ContentLoader({ rows = 4, className }: ContentLoaderProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className={cn("h-4", i === 0 ? "w-3/4" : "w-full")} />
      ))}
    </div>
  );
}
