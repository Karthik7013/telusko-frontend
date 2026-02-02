import type { Course } from "@/types/course";


export const ALL_COURSES: Course[] = [
    {
        id: "spring-boot-3",
        title: "Mastering Spring Boot 3.0",
        sub_title: "Build production-ready microservices with the latest Spring framework.",
        description: "Comprehensive guide to building production-ready applications with Spring Boot 3.0. Learn everything from dependency injection to cloud deployment.",
        instructor: "Navin Reddy",
        author: { name: "Navin Reddy" },
        rating: { average: 4.9, count: 12500 },
        enrollment_count: 45000,
        tags: ["Java", "Spring Boot", "Backend"],
        last_update: "01/2024",
        language: "English",
        level: "Intermediate",
        category: "Java",
        price: {
            current: 499,
            original: 2999,
            currency: "₹",
            discount_percentage: 83
        },
        preview_video: {
            thumbnail_url: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=800&auto=format&fit=crop",
            video_url: "#"
        },
        learning_outcomes: [
            "Build RESTful APIs with Spring Boot",
            "Master Spring Data JPA and Hibernate",
            "Implement security with Spring Security",
            "Deploy applications to AWS"
        ],
        requirements: [
            "Strong knowledge of Java basics",
            "Understanding of relational databases"
        ],
        features: {
            video_hours: 45,
            articles_count: 12,
            has_lifetime_access: true,
            has_certificate: true
        },
        content: {
            total_sections: 5,
            total_lectures: 45,
            total_time: "45h 30m",
            sections: [
                {
                    id: "s1",
                    title: "Getting Started",
                    totalDuration: "2h 15m",
                    lectures: [
                        { id: "l1", title: "Introduction to Spring Boot", duration: "15:00", isPreviewable: true },
                        { id: "l2", title: "Project Setup", duration: "30:00", isPreviewable: false }
                    ]
                }
            ]
        },
        imageSrc: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: "docker-k8s",
        title: "Docker & Kubernetes for Java Devs",
        sub_title: "Containerize your Java applications and scale with Kubernetes.",
        description: "Lean how to package your Spring Boot apps into Docker containers and deploy them to a Kubernetes cluster.",
        instructor: "Telusko Team",
        author: { name: "Navin Reddy" },
        rating: { average: 4.8, count: 8900 },
        enrollment_count: 32000,
        tags: ["Docker", "Kubernetes", "DevOps"],
        last_update: "12/2023",
        language: "English",
        level: "Advanced",
        category: "Microservices",
        price: {
            current: 399,
            original: 1999,
            currency: "₹",
            discount_percentage: 80
        },
        preview_video: {
            thumbnail_url: "https://images.unsplash.com/photo-1605745341112-85968b193ef5?q=80&w=800&auto=format&fit=crop",
            video_url: "#"
        },
        learning_outcomes: [
            "Conatinerize Spring Boot applications",
            "Manage infrastructure with Kubernetes",
            "Automate deployments with CI/CD"
        ],
        requirements: ["Basic understanding of Linux", "Java programming experience"],
        features: {
            video_hours: 30,
            articles_count: 5,
            has_lifetime_access: true,
            has_certificate: true
        },
        content: {
            total_sections: 3,
            total_lectures: 30,
            total_time: "30h 00m",
            sections: []
        },
        imageSrc: "https://images.unsplash.com/photo-1605745341112-85968b193ef5?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: "react-native",
        title: "React Native Mastery",
        sub_title: "Build native mobile apps for iOS and Android.",
        description: "Master React Native and build high-performance mobile applications using your existing React skills.",
        instructor: "Telusko Team",
        author: { name: "Navin Reddy" },
        rating: { average: 4.7, count: 5600 },
        enrollment_count: 21000,
        tags: ["React Native", "Mobile", "Javascript"],
        last_update: "02/2024",
        language: "English",
        level: "Intermediate",
        category: "Mobile",
        price: {
            current: 449,
            original: 2499,
            currency: "₹",
            discount_percentage: 82
        },
        preview_video: {
            thumbnail_url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
            video_url: "#"
        },
        learning_outcomes: [
            "Develop cross-platform mobile apps",
            "Use native device features",
            "Publish apps to Play Store and App Store"
        ],
        requirements: ["Good knowledge of React and Javascript"],
        features: {
            video_hours: 38,
            articles_count: 8,
            has_lifetime_access: true,
            has_certificate: true
        },
        content: {
            total_sections: 4,
            total_lectures: 40,
            total_time: "38h 15m",
            sections: []
        },
        imageSrc: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop"
    }
];

export const CATEGORIES = ["Java", "Python", "Web Development", "Microservices", "Cloud", "Mobile", "Security"];
export const LEVELS = ["Beginner", "Intermediate", "Advanced"];

export const NAV_CATEGORIES = [
    { title: "Master Java", to: "/courses/java", description: "From Core Java to Advanced Spring Boot.", icon: "https://www.svgrepo.com/show/452234/java.svg" },
    { title: "Python for AI", to: "/courses/python", description: "Focus on Data Science and AI.", icon: "https://www.svgrepo.com/show/452091/python.svg" },
    { title: "Cloud & DevOps", to: "/courses/devops", description: "AWS, Docker, and Kubernetes.", icon: "https://www.svgrepo.com/show/448266/aws.svg" },
    { title: "BlockChain", to: "/courses/blockchain", description: "Ethereum and Solidity.", icon: "https://www.svgrepo.com/show/353715/ethereum.svg" }
];

