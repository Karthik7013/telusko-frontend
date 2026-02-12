
import { Badge } from "@/components/ui/badge";
import CourseCard, { CourseCardSkeleton } from "../common/CourseCard";
import { useGetUserQuery } from "@/features/auth/authApi";
import { useGetCoursesQuery } from "@/features/courses/coursesApi";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ApiError } from "@/components/common/ApiError";
import { EmptyState } from "@/components/common/EmptyState";

export default function RecommendedCoursePresenter() {
    const { data: user } = useGetUserQuery();
    const { data: courses = [], isLoading, error, refetch } = useGetCoursesQuery();

    if (!user) {
        return null;
    }

    // Get up to 3 recommended courses (could be personalized based on user preferences)
    const recommendedCourses = courses.slice(0, 3);

    return (
        <section id="latest-course" className="bg-muted/30 py-26">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <div className="space-y-2">
                        <Badge variant="outline" className="text-primary border-primary/20">
                            Personalized Recommendations
                        </Badge>
                        <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                            Recommended for {user.firstName}
                        </h2>
                        <p className="text-muted-foreground max-w-[700px] md:text-lg">
                            Hey {user.firstName}, since you're working as a <span className="text-primary font-medium">{user.company?.title || 'professional'}</span>, we've handpicked these learning paths to help you master the most in-demand technical skills in the industry.
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
                            error="Failed to load recommended courses. Please try again."
                            onRetry={() => refetch()}
                        />
                    </div>
                ) : recommendedCourses.length === 0 ? (
                    <EmptyState
                        title="No Recommendations Available"
                        description="We're working on adding more courses tailored to your interests. Please check back soon."
                        action={{
                            label: "Browse All Courses",
                            onClick: () => window.location.href = "/search"
                        }}
                    />
                ) : (
                    <>
                        <div className="mx-auto grid gap-8 lg:grid-cols-3">
                            {recommendedCourses.map((course) => (
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
                        <div className="mt-20 flex justify-center">
                            <Button size="lg" className="rounded-xl px-8 py-6 text-lg font-bold transition-all">
                                Explore All Recommendations
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}

