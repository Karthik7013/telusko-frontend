import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, BookOpen, BadgeCheck, PersonStanding } from "lucide-react"
import type { CourseCardProps } from "@/types"
import { Skeleton } from "@/components/ui/skeleton"
import { Link } from "react-router-dom"
import { Separator } from "@/components/ui/separator"
import { CourseRating } from "@/course/components/CourseRating"

export default function CourseCard({
    course
}: {
    course: CourseCardProps
}) {
    return (
        <Link to={`/course/${course.slug}`} className="block h-full">
            <Card className='group flex flex-col h-full overflow-hidden rounded-2xl gap-0 border border-border/60 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10 hover:border-border py-0'>
                <div className='relative aspect-video overflow-hidden'>
                    <img
                        alt={course.title}
                        src={course.thumbnailUrl}
                        loading="lazy"
                        className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                    <div className="absolute top-3 left-3">
                        {course.isBestseller && <Badge className="bg-primary text-white backdrop-blur-md border border-white/10 shadow-none font-medium text-xs gap-1 px-2.5 py-1 rounded-full">
                            <BadgeCheck className="size-3" />
                            Bestseller
                        </Badge>}
                    </div>
                </div>

                <CardContent className='flex flex-col flex-1 px-5 py-4 gap-2'>

                    <span className="text-[8px] font-bold uppercase tracking-wider bg-primary/90 shadow-2xl text-primary-foreground w-fit py-1  px-2 rounded-sm"># {"DEVELOPMENT"}</span>

                    <CardTitle className="text-base font-bold leading-snug tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                        {course.title}
                    </CardTitle>

                    {/* Author */}
                    <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-primary text-[10px] font-bold text-primary-foreground">
                            <img className="rounded-full" src={course.instructor.profilePictureUrl || "https://github.com/shadcn.png"} alt={course.instructor.fullName.charAt(0)} />

                        </div>
                        <div className="flex flex-col leading-tight">
                            <span className="text-xs font-medium text-foreground">{course.instructor.fullName}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <CourseRating rating={course.rating} reviewCount={course.totalReviews} size="sm" />
                    </div>

                    <div className="mt-1.5 justify-between flex flex-wrap items-center gap-x-2 text-[11px] text-muted-foreground">
                        <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{course.durationInHours || '00 '}h</span>
                        <Separator orientation="vertical" />
                        <span className="inline-flex items-center gap-1"><BookOpen className="h-3 w-3" />{course.totalLessons || 10} sections</span>
                        <Separator orientation="vertical" />
                        <span className="inline-flex bitems-center gap-1"><PersonStanding className="h-3 w-3" />{course.level}</span>
                    </div>

                    {/* Price block */}
                    <div className="flex items-end justify-between border-t border-border/60 pt-3">
                        <div className="flex flex-col">
                            <div className="flex items-baseline gap-2">
                                <span className="text-xl font-extrabold text-foreground">${course.discountedPrice || course.basePrice}</span>
                                {!course.discountedPrice && <span className="text-xs text-muted-foreground line-through">${course.basePrice}</span>}
                            </div>
                            {!course.discountedPrice && <span className="text-[10px] font-semibold uppercase tracking-wide text-primary">
                                {course.discountPercentage || 0}% off
                            </span>}
                        </div>

                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}

export function CourseCardSkeleton() {
    return (
        <Card className="flex flex-col h-full overflow-hidden rounded-2xl border border-border/60">
            <div className="relative aspect-video">
                <Skeleton className="h-full w-full rounded-none" />
            </div>
            <CardContent className="flex-1 px-5 py-4 flex flex-col gap-2.5">
                <div className="flex gap-2">
                    <Skeleton className="h-4 w-10" />
                    <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <div className="pt-3 border-t border-border/60 flex justify-between items-center">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                </div>
            </CardContent>
        </Card>
    )
}