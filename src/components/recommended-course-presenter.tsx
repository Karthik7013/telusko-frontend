
import { Badge } from "@/components/ui/badge";
import CourseCard from "./common/course-card";
import type { CourseCardProps } from "@/types";
import { useGetUserQuery } from "@/features/auth/authApi";

const recommendedCourses: CourseCardProps[] = [
    {
        title: "Advanced Spring Microservices",
        instructor: "Navin Reddy",
        description: "Scale your applications with Spring Cloud, Docker, and Kubernetes.",
        rating: "4.9",
        duration: "60 Hours",
        to: "/courses/spring-microservices",
        imageSrc: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "React Native Mastery",
        instructor: "Telusko Team",
        description: "Build native mobile apps for iOS and Android using one codebase.",
        rating: "4.7",
        duration: "38 Hours",
        to: "/courses/react-native",
        imageSrc: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Cyber Security Blueprint",
        instructor: "Security Experts",
        description: "From networking basics to advanced penetration testing and ethical hacking.",
        rating: "4.8",
        duration: "55 Hours",
        to: "/courses/cyber-security",
        imageSrc: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Machine Learning with Python",
        instructor: "Data Science Team",
        description: "Master supervised and unsupervised learning with Scikit-Learn and TensorFlow.",
        rating: "4.9",
        duration: "42 Hours",
        to: "/courses/ml-python",
        imageSrc: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=800&auto=format&fit=crop"
    }
];

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function RecommendedCoursePresenter() {
    const { data } = useGetUserQuery();

    if (!data) {
        return null
    }

    return (
        <section id="latest-course" className="bg-muted/30 py-26">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <div className="space-y-2">
                        <Badge variant="outline" className="text-primary border-primary/20">
                            Personalized Recommendations
                        </Badge>
                        <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                            Recommended for {data.firstName}
                        </h2>
                        <p className="text-muted-foreground max-w-[700px] md:text-lg">
                            Hey {data.firstName}, since you're working as a <span className="text-primary font-medium">{data.company?.title || 'professional'}</span>, we've handpicked these learning paths to help you master the most in-demand technical skills in the industry.
                        </p>
                    </div>
                </div>

                <div className="mx-auto grid gap-8 lg:grid-cols-3">
                    {recommendedCourses.map((course, index) => (
                        <CourseCard key={index} course={course} />
                    ))}
                </div>
                <div className="mt-20 flex justify-center">
                    <Button size="lg" className="rounded-xl px-8 py-6 text-lg font-bold transition-all">
                        Explore All Recommendations
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                </div>
            </div>
        </section>
    );
}

