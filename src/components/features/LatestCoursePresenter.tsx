import { Badge } from "@/components/ui/badge";
import CourseCard, { CourseCardSkeleton } from "../common/CourseCard";
import { useGetCoursesQuery } from "@/features/courses/coursesApi";
import { ApiError } from "@/components/common/ApiError";
import { EmptyState } from "@/components/common/EmptyState";

function LatestCoursePresenter() {
    const { data: courses = [], isLoading, error, refetch } = useGetCoursesQuery();

    // Show 3 newest courses (could be sorted by last_update or created_at)
    const latestCourses = courses.slice(0, 3);

    return (
        <section id="latest-course" className="bg-muted/30 py-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <div className="space-y-2">
                        <Badge variant="outline" className="text-primary border-primary/20">
                            New Releases
                        </Badge>
                        <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">Explore Latest Courses</h2>
                        <p className="text-muted-foreground max-w-[700px] md:text-lg">
                            Start your journey today with our most recently updated premium bootcamps and tutorials.
                        </p>
                    </div>
                </div>

                {isLoading ? (
                    <div className="mx-auto grid gap-8 lg:grid-cols-3">
                        {[1, 2, 3].map((i) => (
                            <CourseCardSkeleton key={i} />
                        ))}
                    </div>
                ) : error ? (
                    <div className="mx-auto max-w-2xl">
                        <ApiError
                            error="Failed to load latest courses. Please try again."
                            onRetry={() => refetch()}
                        />
                    </div>
                ) : latestCourses.length === 0 ? (
                    <EmptyState
                        title="No Latest Courses"
                        description="There are no courses available at the moment. Check back later for new releases."
                        action={{
                            label: "Browse All Courses",
                            onClick: () => window.location.href = "/search"
                        }}
                    />
                ) : (
                    <div className="mx-auto grid gap-8 lg:grid-cols-3">
                        {latestCourses.map((course) => (
                            <CourseCard
                                key={course.id}
                                course={{
                                    ...course,
                                    to: `/course/${course.id}`,
                                    rating: course.rating.average.toString(),
                                    duration: `${course.features.video_hours} Hours`
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default LatestCoursePresenter;