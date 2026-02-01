
import { Badge } from "@/components/ui/badge";
import CourseCard from "./common/course-card";
import type { CourseCardProps } from "@/types";




const courses: CourseCardProps[] = [
    {
        title: "Java Masterclass: Zero to Hero",
        instructor: "Navin Reddy",
        description: "Master Java programming with Spring Boot, Hibernate, and Microservices.",
        rating: "4.9",
        duration: "45 Hours",
        to: "/course/java-masterclass",
        imageSrc: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Ultimate Python for Data Science",
        instructor: "Telusko Team",
        description: "Learn Python from scratch and dive into NumPy, Pandas, and Matplotlib.",
        rating: "4.8",
        duration: "32 Hours",
        to: "/course/python-ds",
        imageSrc: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Modern Full-Stack Web Dev",
        instructor: "Navin Reddy",
        description: "Build scalable applications using React, Node.js, and MongoDB.",
        rating: "4.9",
        duration: "50 Hours",
        to: "/course/fullstack",
        imageSrc: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=800&auto=format&fit=crop"
    }
];
function LatestCoursePresenter() {
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

                <div className="mx-auto grid gap-8 lg:grid-cols-3">
                    {courses.map((course, index) => (
                        <CourseCard key={index} course={course} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default LatestCoursePresenter;