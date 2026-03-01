import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    Check,
    // PlayCircle,
    Globe,
    Info,
    Star,
    // Trophy,
    Infinity,
    AlertCircle,
    Target,
    ClipboardList,
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import CourseContent from '@/components/features/CourseContent';
import { useGetCourseBySlugQuery } from "@/features/courses/coursesApi";
import { Demo } from "@/components/ui/video-player";
// import { CourseDetailsProps } from "@/types/course";
// import type { Section, Lecture } from "@/types/course";


export default function CourseDetailPage() {
    const { courseSlug } = useParams<{ courseSlug: string }>();
    console.log(courseSlug, "courseSlug")

    useEffect(() => {
        const meta = document.querySelector("meta[name='theme-color']");
        if (meta) {
            const oldColor = meta.getAttribute("content");
            meta.setAttribute("content", "#d87757");
            return () => {
                if (oldColor) meta.setAttribute("content", oldColor);
            };
        } else {
            const newMeta = document.createElement('meta');
            newMeta.name = 'theme-color';
            newMeta.content = '#d87757';
            document.head.appendChild(newMeta);
            return () => {
                document.head.removeChild(newMeta);
            };
        }
    }, []);

    // Guard: if courseSlug is undefined, show error
    if (!courseSlug) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <AlertCircle className="size-16 text-destructive mb-4" />
                <h2 className="text-2xl font-bold mb-2">Invalid course URL</h2>
                <p className="text-muted-foreground mb-6">The course identifier is missing.</p>
                <Button asChild>
                    <a href="/search">Browse all courses</a>
                </Button>
            </div>
        );
    }

    const { data: course, isLoading, error } = useGetCourseBySlugQuery(courseSlug);

    if (isLoading) {
        return <CourseDetailSkeleton />;
    }

    if (error || !course) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <AlertCircle className="size-16 text-destructive mb-4" />
                <h2 className="text-2xl font-bold mb-2">Course not found</h2>
                <p className="text-muted-foreground mb-6">The course you are looking for doesn't exist or has been removed.</p>
                <Button asChild>
                    <a href="/search">Browse all courses</a>
                </Button>
            </div>
        );
    }


    console.log(course, "cash-course");

    return (
        <div>
            <div className="container mx-auto px-4 py-16 lg:py-24">
                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="relative mt-3 lg:hidden">
                            <Demo
                                poster={course.data.thumbnailUrl}
                                src={course.data.previewVideoUrl} />
                        </div>
                        {/* HERO SECTION */}
                        <div className="space-y-3">
                            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                                {course.data.title}
                            </h1>
                            <p className="text-md text-muted-foreground leading-relaxed">
                                {course.data.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {course.data.tags?.map((tag: string) => (
                                    <Badge key={tag} variant="secondary" className="px-3 py-1">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>

                            <div className="flex flex-wrap items-center gap-6 text-sm">
                                <div className="flex items-center gap-1.5 text-primary font-bold text-base">
                                    <div className="flex">
                                        <Star className="size-4 fill-current" /></div>
                                    <span>{course.data.rating}</span>
                                </div>
                                <span className="underline text-primary/80">({course.data.rating} ratings)</span>
                                <span className="font-medium">{course.data.enrollmentCount.toLocaleString()} learners</span>
                            </div>

                            <p className="text-base">Created by <span className="underline text-primary font-medium cursor-pointer">{course.data.instructor.fullName || "Instructor"}</span></p>

                            <div className="flex flex-wrap items-center gap-8 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1.5"><Info className="size-4" /> Last updated {course.data.updatedAt?.split("T")[0] || "N/A"}</span>
                                <span className="flex items-center gap-1.5"><Globe className="size-4" /> {course.language || "English"}</span>
                            </div>
                        </div>

                        {/* MAIN CONTENT AREA */}
                        <div className="space-y-16">
                            {/* WHAT YOU'LL LEARN */}
                            <section className="border p-4 rounded-xl bg-muted/30">
                                <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                                    <Target className="size-6" />What you'll learn
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6">
                                    {course.data.whatYouLearn?.map((item: string, i: number) => (
                                        <div key={i} className="flex gap-4 text-sm leading-relaxed">
                                            <Check className="size-5 mt-0.5 shrink-0 text-primary" />
                                            <span className="font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* COURSE CONTENT */}
                            <CourseContent content={{
                                sections: course?.data?.sections || []
                            }} />

                            {/* REQUIREMENTS */}
                            <section className="border p-4 rounded-xl bg-muted/30">
                                <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                                    <ClipboardList className="size-6" />Requirements
                                </h2>
                                <ul className="grid gap-3">
                                    {course.data.requirements?.map((req: string, i: number) => (
                                        <li key={i} className="flex gap-4 items-center font-medium">
                                            <div className="size-2 rounded-full bg-primary shrink-0" />
                                            {req}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </div>
                    </div>

                    {/* SIDEBAR */}
                    <div className='relative hidden lg:block lg:col-span-1'>
                        <aside className="sticky top-24">
                            <div className="border bg-card text-card-foreground shadow-2xl rounded-xl overflow-hidden p-0">
                                <div className="relative">
                                    <Demo
                                        poster={course.data.thumbnailUrl}
                                        src={course.data.previewVideoUrl} />
                                </div>
                                <div className="p-8 space-y-6">
                                    <div className="flex items-center gap-3">
                                        {/* <span className="text-4xl font-bold">{course.price.currency || "$"}{course.price.current}</span> */}
                                        {/* {course.price.original && (
                                            <span className="text-muted-foreground line-through text-lg">{course.price.currency || "$"}{course.price.original}</span>
                                        )} */}
                                        {/* {course.price.original && (
                                            <Badge variant="destructive" className="ml-auto">{(course.price.original - course.price.current) / course.price.original * 100}% off</Badge>
                                        )} */}
                                    </div>

                                    <div className="grid gap-3">
                                        <Button className="w-full h-14 text-lg font-bold">Add to cart</Button>
                                        <Button variant="outline" className="w-full h-14 font-bold border-2">Buy now</Button>
                                    </div>

                                    <p className="text-center text-xs text-muted-foreground font-medium uppercase tracking-wide">30-Day Money-Back Guarantee</p>

                                    <div className="space-y-4 pt-6 border-t">
                                        <h3 className="font-bold text-sm tracking-wide uppercase">This course includes:</h3>
                                        <div className="space-y-3 text-sm">
                                            <div className="flex items-center gap-3 font-medium"><Infinity className="size-5 text-muted-foreground" /> Full lifetime access</div>
                                            {/* {course.features.has_certificate && <div className="flex items-center gap-3 font-medium"><Trophy className="size-5 text-muted-foreground" /> Certificate of completion</div>} */}
                                            {/* <div className="flex items-center gap-3 font-medium"><PlayCircle className="size-5 text-muted-foreground" /> {course.features.video_hours} hours on-demand video</div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CourseDetailSkeleton() {
    return (
        <div>
            <div className="container mx-auto px-4 py-16 lg:py-24 mt-4">
                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-12">
                        <div className="space-y-6">
                            <Skeleton className="h-12 w-3/4" />
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-2/3" />

                            <div className="flex gap-2">
                                <Skeleton className="h-8 w-20 rounded-full" />
                                <Skeleton className="h-8 w-24 rounded-full" />
                                <Skeleton className="h-8 w-20 rounded-full" />
                            </div>

                            <div className="flex gap-6">
                                <Skeleton className="h-6 w-16" />
                                <Skeleton className="h-6 w-32" />
                                <Skeleton className="h-6 w-24" />
                            </div>

                            <Skeleton className="h-6 w-48" />

                            <div className="flex gap-8">
                                <Skeleton className="h-6 w-32" />
                                <Skeleton className="h-6 w-24" />
                            </div>
                        </div>
                        <div className="space-y-16">
                            <Skeleton className="h-64 w-full rounded-xl" />
                            <Skeleton className="h-96 w-full" />
                        </div>
                    </div>
                    <div className='relative lg:col-span-1'>
                        <div className="border bg-card shadow-2xl rounded-xl overflow-hidden mt-8 lg:mt-0">
                            <Skeleton className="aspect-video w-full" />
                            <div className="p-8 space-y-6">
                                <div className="flex gap-3">
                                    <Skeleton className="h-10 w-24" />
                                    <Skeleton className="h-10 w-24" />
                                </div>
                                <div className="grid gap-3">
                                    <Skeleton className="h-14 w-full" />
                                    <Skeleton className="h-14 w-full" />
                                </div>
                                <Skeleton className="h-4 w-1/2 mx-auto" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
