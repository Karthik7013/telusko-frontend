import { Link, useParams } from "react-router-dom";
import {
    Check,
    Globe,
    Info,
    Star,
    AlertCircle,
    Target,
    ClipboardList,
    Clock,
    Award,
    ShieldCheck,
    Infinity as InfinityIcon,
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import CourseContent from '@/components/features/CourseContent';
import { useGetCourseBySlugQuery } from "@/features/courses/coursesApi";
import { Demo } from "@/components/ui/video-player";
import DescriptionCollapse from '@/components/common/DescriptionCollapse';

export default function CourseDetailPage() {
    const { courseSlug } = useParams<{ courseSlug: string }>();
    const { data: course, isLoading, error } = useGetCourseBySlugQuery(courseSlug || '', { skip: !courseSlug });

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

    return (
        <div>
            <div className="container mx-auto px-4 py-4 lg:py-10">
                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Mobile Video & Purchase Bar */}
                        <div className="lg:hidden">
                            <div className="relative">
                                <Demo
                                    poster={course.data.thumbnailUrl}
                                    src={course.data.previewVideoUrl} />
                            </div>

                            {/* Mobile sticky purchase bar */}
                            <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 z-50 lg:hidden">
                                <div className="container mx-auto flex items-center justify-between gap-3">
                                    <div className="flex flex-col">
                                        <span className="text-lg font-bold text-primary">${course.data.basePrice}</span>
                                        <span className="text-sm text-muted-foreground line-through ml-2">${2999}</span>
                                    </div>
                                    <Button className="flex-1 font-bold">Buy now</Button>
                                </div>
                            </div>
                        </div>


                        {/* HERO SECTION */}
                        <div className="space-y-4">

                            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                                {course.data.title}
                            </h1>
                            <DescriptionCollapse description={course.data.description} maxHeight={150} />
                            <div className="flex flex-wrap gap-2">
                                {course.data.tags?.map((tag: string) => (
                                    <Badge key={tag} variant="secondary" className="px-3 py-1">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>

                            <div className="flex flex-wrap items-center gap-6 text-sm">
                                <div className="flex items-center gap-1.5">
                                    <div className="flex text-yellow-500">
                                        <Star className="size-4 fill-current" />
                                        <Star className="size-4 fill-current" />
                                        <Star className="size-4 fill-current" />
                                        <Star className="size-4 fill-current" />
                                        <Star className="size-4 fill-current" />
                                    </div>
                                    <span className="font-bold text-base">{course.data.rating}</span>
                                    <span className="underline text-primary/80">({course.data.rating} ratings)</span>
                                    <span className="font-medium">{course.data.enrollmentCount.toLocaleString()} students</span>
                                </div>
                            </div>

                            <p className="text-base">Created by
                                <Button className="underline pl-1" variant={'link'}>
                                    <Link to={`/search?instructor=${course.data.instructor.id || "#"}`}>
                                        {course.data.instructor.fullName || "Instructor"}
                                    </Link>
                                </Button>
                            </p>

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

                    {/* SIDEBAR - Desktop */}
                    <div className='relative hidden lg:block lg:col-span-1'>
                        <aside className="sticky top-24">
                            <div className="border bg-card text-card-foreground shadow-xl rounded-xl overflow-hidden">
                                <div className="relative">
                                    <Demo
                                        poster={course.data.thumbnailUrl}
                                        src={course.data.previewVideoUrl} />
                                </div>
                                <div className="p-6 pt-4 space-y-4">
                                    <div className="flex items-end gap-3 flex-wrap">
                                        <span className="text-3xl font-bold text-primary">${course.data.basePrice}</span>
                                        <span className="text-lg text-muted-foreground line-through">${course.data.basePrice}</span>
                                    </div>

                                    <div className="grid gap-3">
                                        <Button className="w-full h-12 text-base font-bold">Add to cart</Button>
                                        <Button variant="outline" className="w-full h-12 text-base font-bold">Buy now</Button>
                                    </div>

                                    <p className="text-center text-xs text-muted-foreground font-medium uppercase tracking-wide">30-Day Money-Back Guarantee</p>

                                    <div className="space-y-4 pt-2 border-t">
                                        <h3 className="font-bold text-sm tracking-wide uppercase">This course includes:</h3>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3">
                                                <Clock className="size-5 text-muted-foreground" />
                                                <span>20 hours on-demand video</span>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <InfinityIcon className="size-5 text-muted-foreground" />
                                                <span>Full lifetime access</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Award className="size-5 text-muted-foreground" />
                                                <span>Certificate of completion</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <ShieldCheck className="size-5 text-muted-foreground" />
                                                <span>Access on mobile and TV</span>
                                            </div>
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