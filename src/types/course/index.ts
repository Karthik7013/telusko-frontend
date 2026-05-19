export type CourseCardProps = {
    id: string;
    slug: string;
    title: string;
    thumbnailUrl: string;
    instructor: {
        id: string;
        fullName: string;
        email: string;
        profilePictureUrl: string;
    };
    rating: number;
    totalReviews: number;
    durationInHours: number;
    level: 'beginner' | 'intermediate' | 'advanced';
    totalLessons: number;
    basePrice: number;
    discountedPrice?: number;
}