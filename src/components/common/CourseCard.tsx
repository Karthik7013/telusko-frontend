// import { Card, CardContent, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Clock, Star, ArrowRight } from "lucide-react"
// import type { CourseCardProps } from "@/types"
// import { Skeleton } from "@/components/ui/skeleton"
// import { Link } from "react-router-dom"

// export default function CourseCard({
//     course
// }: {
//     course: CourseCardProps
// }) {
//     return (
//         <Link to={`/course/${course.slug}`} className="block h-full">
//             <Card className='group flex flex-col h-full overflow-hidden border border-border bg-card transition-all duration-300 hover:shadow-xl pt-0'>
//                 <div className='relative aspect-video overflow-hidden'>
//                     <img
//                         alt={course.title}
//                         src={course.thumbnailUrl}
//                         loading="lazy"
//                         className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
//                     />
//                     <div className="absolute bottom-2 right-2">
//                         <Badge className="bg-background/90 text-foreground backdrop-blur-md border-none shadow-sm font-semibold">
//                             <Clock className="mr-1 size-3" />
//                             {course.durationHours}h
//                         </Badge>
//                     </div>
//                 </div>

//                 <CardContent className='flex flex-col flex-1 px-5 space-y-3'>
//                     <div className="flex items-center gap-2">
//                         <div className="flex items-center gap-1 text-amber-500">
//                             <Star className="size-3.5 fill-current" />
//                             <span className="text-sm font-bold text-foreground">{course.rating}</span>
//                         </div>
//                         <span className="text-muted-foreground text-xs">•</span>
//                         <span className="text-muted-foreground text-xs font-medium">Updated Recently</span>
//                     </div>

//                     <CardTitle className="text-lg font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
//                         {course.title}
//                     </CardTitle>

//                     <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
//                         {course.description}
//                     </p>

//                     <div className='flex items-center justify-between pt-4 mt-auto border-t'>
//                         <span className="text-sm font-semibold text-primary">Explore Now</span>
//                         <div className="rounded-full bg-primary/10 p-1.5 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
//                             <ArrowRight className="size-4" />
//                         </div>
//                     </div>
//                 </CardContent>
//             </Card>
//         </Link>
//     )
// }

// export function CourseCardSkeleton() {
//     return (
//         <Card className="flex flex-col h-full overflow-hidden border border-border shadow-sm">
//             <div className="relative aspect-video">
//                 <Skeleton className="h-full w-full" />
//             </div>
//             <CardContent className="flex-1 p-5 space-y-4">
//                 <div className="flex gap-2">
//                     <Skeleton className="h-4 w-10" />
//                     <Skeleton className="h-4 w-20" />
//                 </div>
//                 <Skeleton className="h-6 w-full" />
//                 <Skeleton className="h-4 w-full" />
//                 <div className="pt-4 border-t flex justify-between items-center">
//                     <Skeleton className="h-4 w-20" />
//                     <Skeleton className="h-8 w-8 rounded-full" />
//                 </div>
//             </CardContent>
//         </Card>
//     )
// }


import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Star, ArrowRight } from "lucide-react"
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
            <Card className='group flex flex-col h-full overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10 hover:border-border py-0'>
                <div className='relative aspect-video overflow-hidden'>
                    <img
                        alt={course.title}
                        src={course.thumbnailUrl}
                        loading="lazy"
                        className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute bottom-3 right-3">
                        <Badge className="bg-black/40 text-white backdrop-blur-md border border-white/10 shadow-none font-medium text-xs gap-1 px-2.5 py-1 rounded-full">
                            <Clock className="size-3" />
                            {course.durationHours}h
                        </Badge>
                    </div>
                </div>

                <CardContent className='flex flex-col flex-1 px-5 py-4 gap-2.5'>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                            <Star className="size-3.5 fill-amber-400 text-amber-400" />
                            <span className="text-sm font-bold tabular-nums">{course.rating}</span>
                        </div>
                        <span className="text-muted-foreground/40 text-xs">•</span>
                        <span className="text-muted-foreground text-xs">Updated Recently</span>
                    </div>

                    <CardTitle className="text-base font-bold leading-snug tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                        {course.title}
                    </CardTitle>

                    <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                        {course.description}
                    </p>

                    <div className='flex items-center justify-between pt-3 mt-auto border-t border-border/60'>
                        <span className="text-sm font-semibold text-primary">Explore Now</span>
                        <div className="rounded-full bg-primary/10 p-1.5 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
                            <ArrowRight className="size-4" />
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