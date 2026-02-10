
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useGetUserQuery } from "@/features/auth/authApi";

export function FinalCTAPresenter() {
    const { data } = useGetUserQuery();
    const isAuthenticated = !!data;
    if (isAuthenticated) return null
    return (
        <section className="">
            <div className="container mx-auto px-4">
                <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center text-primary-foreground shadow-2xl sm:px-12 sm:py-24">
                    {/* Decorative Background Circles */}
                    <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-black/20 blur-3xl" />

                    <div className="relative z-10 mx-auto max-w-2xl">
                        <div className="mb-6 flex justify-center">
                            <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium backdrop-blur-md">
                                <Sparkles className="size-4" />
                                Join 2 Million+ Learners
                            </div>
                        </div>
                        <h2 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
                            Stop Scrolling. <br /> Start Building.
                        </h2>
                        <p className="mb-10 text-lg text-primary-foreground/80">
                            Master the logic, master the code. Join Telusko today and transform your
                            career with industry-standard skills and hands-on projects.
                        </p>
                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Button size="lg" variant="secondary" className="w-full sm:w-auto px-8 py-6 text-lg font-bold" asChild>
                                <Link to="/signup">Get Started for Free</Link>
                            </Button>
                            <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/30 bg-white/10 hover:bg-white/20 px-8 py-6 text-lg" asChild>
                                <Link to="/courses">Browse Courses</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}