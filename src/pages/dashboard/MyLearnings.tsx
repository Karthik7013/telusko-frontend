import CourseCard from "@/components/common/CourseCard";

const enrolledCourses = [
    {
        title: "Mastering Spring Boot 3.0",
        instructor: "Navin Reddy",
        description: "Comprehensive guide to building production-ready applications with Spring.",
        rating: "4.9",
        duration: "45 Hours",
        to: "/course/spring-boot-3",
        imageSrc: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=800&auto=format&fit=crop",
        progress: 65
    },
    {
        title: "Docker & Kubernetes for Java Devs",
        instructor: "Telusko Team",
        description: "Learn to containerize and orchestrate your microservices.",
        rating: "4.8",
        duration: "30 Hours",
        to: "/course/docker-k8s",
        imageSrc: "https://images.unsplash.com/photo-1605745341112-85968b193ef5?q=80&w=800&auto=format&fit=crop",
        progress: 30
    }
];

export default function MyLearningsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">My Learnings</h1>
                <p className="text-muted-foreground">Keep up the great work! You're making progress.</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
                {enrolledCourses.map((course, index) => (
                    <div key={index} className="space-y-3">
                        <CourseCard course={course} />
                        <div className="px-2 space-y-1.5">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground font-medium">Progress</span>
                                <span className="font-bold">{course.progress}%</span>
                            </div>
                           
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
