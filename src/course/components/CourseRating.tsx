import { Star } from "lucide-react"

type CourseRatingProps = {
    rating: number
    reviewCount?: number
    showValue?: boolean
    size?: "sm" | "md"
    alwaysFull?: boolean
}

export function CourseRating({ rating, reviewCount, showValue = true, size = "md", alwaysFull }: CourseRatingProps) {
    return (
        <div className="flex items-center gap-1.5">
            {showValue && (
                <span className={`font-bold text-amber-600 dark:text-amber-400 ${size === "sm" ? "text-sm" : "text-base"}`}>
                    {rating}
                </span>
            )}
            <div className={`${size === "sm" ? "flex items-center" : "flex"}`}>
                {[0, 1, 2, 3, 4].map((i) => (
                    <Star
                        key={i}
                        className={`${
                            size === "sm" ? "h-3.5 w-3.5" : "size-4"
                        } ${
                            alwaysFull || i < Math.round(rating)
                                ? "fill-[#e59819] text-[#e59819] dark:fill-amber-400 dark:text-amber-400"
                                : "fill-muted text-muted"
                        }`}
                    />
                ))}
            </div>
            {reviewCount !== undefined && (
                <span className="text-xs text-muted-foreground">({reviewCount} reviews)</span>
            )}
        </div>
    )
}
