import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Star, BookOpen, BadgeCheck } from "lucide-react"
import type { CourseCardProps } from "@/types"
import { Skeleton } from "@/components/ui/skeleton"
import { Link } from "react-router-dom"

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
                    <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent" />
                    <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.2)] pointer-events-none" />
                    <div className="absolute top-3 left-3">
                        <Badge className="bg-primary text-white backdrop-blur-md border border-white/10 shadow-none font-medium text-xs gap-1 px-2.5 py-1 rounded-full">
                            <BadgeCheck className="size-3" />
                            Bestseller
                        </Badge>
                    </div>

                </div>

                <CardContent className='flex flex-col flex-1 px-5 py-4 gap-2'>
                    <CardTitle className="text-base font-bold leading-snug tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                        {course.title}
                    </CardTitle>

                    {/* Author */}
                    <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-primary text-[10px] font-bold text-primary-foreground">
                            <img className="rounded-full" src={course.instructor.profilePictureUrl || "https://github.com/shadcn.png"} alt={ course.instructor.fullName.split("")[0] } />

                        </div>
                        <div className="flex flex-col leading-tight">
                            <span className="text-xs font-medium text-foreground">{course.instructor.fullName}</span>
                            <span className="text-[10px] text-muted-foreground">Instructor</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-[#b4690e] dark:text-amber-400">{5}</span>
                        <div className="flex items-center">
                            {[0, 1, 2, 3, 4].map((i) => (
                                <Star
                                    key={i}
                                    className={`h-3.5 w-3.5 ${i < Math.round(5)
                                        ? "fill-[#e59819] text-[#e59819] dark:fill-amber-400 dark:text-amber-400"
                                        : "fill-muted text-muted"
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-xs text-muted-foreground">({500})</span>
                    </div>

                    <div className="mt-1.5 flex flex-wrap items-center gap-x-2 text-[11px] text-muted-foreground">
                        <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{course.durationHours}h</span>
                        <span>·</span>
                        <span className="inline-flex items-center gap-1"><BookOpen className="h-3 w-3" />12 lessons</span>
                        <span>·</span>
                        <span>beginner</span>
                    </div>

                    {/* Price block */}
                    <div className="flex items-end justify-between border-t border-border/60 pt-3">
                        <div className="flex flex-col">
                            <div className="flex items-baseline gap-2">
                                <span className="text-xl font-extrabold text-foreground">${25}</span>
                                <span className="text-xs text-muted-foreground line-through">${12}</span>
                            </div>
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                                {Math.round((1 - Number(25) / Number(25)) * 100)}% off
                            </span>
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