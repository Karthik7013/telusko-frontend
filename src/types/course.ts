export type Lecture = {
    id: string;
    title: string;
    duration: string;
    isPreviewable: boolean;
};

export type Section = {
    id: string;
    title: string;
    lectures: Lecture[];
    totalDuration: string;
};

export type CourseDetailsProps = {
    id: string;
    title: string;
    sub_title: string;
    description: string;
    instructor: string;
    author: {
        name: string;
        profile_url?: string;
    };
    rating: {
        average: number;
        count: number;
    };
    enrollment_count: number;
    tags: string[];
    last_update: string;
    language: string;
    level: "Beginner" | "Intermediate" | "Advanced";
    category: string;
    price: {
        current: number;
        original: number;
        currency: string;
        discount_percentage: number;
    };
    preview_video: {
        thumbnail_url: string;
        video_url: string;
    };
    learning_outcomes: string[];
    requirements: string[];
    features: {
        video_hours: number;
        articles_count: number;
        has_lifetime_access: boolean;
        has_certificate: boolean;
    };
    content: {
        total_sections: number;
        total_lectures: number;
        total_time: string;
        sections: Section[];
    };
    imageSrc: string; // For backward compatibility with CourseCardProps
};


// src/types/course.ts
export type CourseCardProps = {
    id: string;
    title: string;
    sub_title: string;
    description: string;
    instructor: string;
    author: {
        name: string;
        profile_url?: string;
    };
    rating: {
        average: number;
        count: number;
    };
    imageSrc: string; // For backward compatibility with CourseCardProps
};



export type Course = CourseDetailsProps;
