import CourseCard, { CourseCardSkeleton } from "../common/CourseCard";
import { useGetUserQuery } from "@/features/auth/authApi";
import { useGetCoursesQuery } from "@/features/courses/coursesApi";
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


                )}
            </div>
        </section>
    );
}

