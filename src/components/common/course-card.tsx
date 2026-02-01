import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Clock, Star } from "lucide-react"
import type { CourseCardProps } from "@/types"



export default function CourseCard({
    course
}: {
    course: CourseCardProps
}) {
    return (
        <Card className="overflow-hidden border-none shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
            <Link className="group block" to={course.to}>
                <div className="relative aspect-video overflow-hidden">
                    <img
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        src={course.imageSrc}
                        loading="lazy"
                    />
                    <div className="absolute top-2 right-2">
                        <Badge className="bg-background/80 text-foreground backdrop-blur-md">
                            <Clock className="mr-1 size-4" />
                            {course.duration}
                        </Badge>
                    </div>
                </div>
                <CardHeader className="p-5">
                    <div className="flex items-center gap-1 text-yellow-500 mb-2">
                        <Star className="size-4 fill-current" />
                        <span className="text-sm font-bold text-foreground">{course.rating}</span>
                        <span className="text-xs text-muted-foreground ml-1">Instructor: {course.instructor}</span>
                    </div>
                    <CardTitle className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                        {course.title}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm line-clamp-2 mt-2">
                        {course.description}
                    </p>
                </CardHeader>
                <CardContent className="p-5 pt-0 flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 size-4" />
                        {course.duration}
                    </div>
                    <span className="text-primary font-semibold text-sm group-hover:underline">
                        View Details →
                    </span>
                </CardContent>
            </Link>
        </Card>
    )
}
