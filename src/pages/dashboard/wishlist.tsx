// import CourseCard from "@/components/common/CourseCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const wishlistCourses = [
    {
        title: "Machine Learning Foundations",
        instructor: "Data Science Team",
        description: "Start your journey into AI with Python and Scikit-Learn.",
        rating: "4.7",
        duration: "55 Hours",
        to: "/course/ml-foundations",
        imageSrc: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "React Design Patterns",
        instructor: "Hitesh Choudhary",
        description: "Advanced patterns for scalable React applications.",
        rating: "4.9",
        duration: "20 Hours",
        to: "/course/react-patterns",
        imageSrc: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop"
    }
];

export default function WishlistPage() {
    if (wishlistCourses.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
                <div className="bg-muted p-6 bg-primary/20 rounded-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-12 h-12 text-muted-foreground"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                    </svg>
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold">Your wishlist is empty</h2>
                    <p className="text-muted-foreground">Save courses you're interested in for later.</p>
                </div>
                <Button asChild>
                    <Link to="/">Browse Courses</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">My Wishlist</h1>
                <p className="text-muted-foreground">Courses you've saved for later study.</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
                {/* {wishlistCourses.map((course, index) => (
                    <CourseCard key={index} course={course} />
                ))} */}
            </div>
        </div>
    );
}
