
import { ArrowRight, PlayCircle, Users } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function HeroPresenter() {
    return (
        <section className="py-30 lg:py-38 overflow-hidden h-svh">
            <div className="container mx-auto px-4">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                        <Badge variant="outline" className="px-3 py-2 border-primary/30 text-primary">
                            <Users className="size-3.5" />
                            Trusted by 2M+ Developers Worldwide
                        </Badge>

                        <h1 className="my-6 text-4xl text-primary font-extrabold tracking-tight text-pretty lg:text-6xl ">
                            Master Coding. <br />
                            <span className="text-primary">Build Your Future.</span>
                        </h1>

                        <p className="text-muted-foreground mb-8 text-balance lg:text-xl max-w-[600px]">
                            Level up your tech skills with industry-led courses in Java, Python, Full-stack
                            development, and DevOps. Learn by building real-world projects.
                        </p>

                        <div className="flex w-full flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                            <Button asChild size="lg" className="w-full sm:w-auto px-8">
                                <Link to="/search">
                                    Explore Courses
                                    <ArrowRight className="ml-2 size-4" />
                                </Link>
                            </Button>

                            <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto px-8">
                                <Link to="/bootcamps" className="flex items-center">
                                    <PlayCircle className="mr-2 size-4" />
                                    Watch Free Demo
                                </Link>
                            </Button>
                        </div>

                        {/* Social Proof Mini-Section */}
                        <div className="mt-10 flex flex-col lg:flex-row  items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <img
                                        key={i}
                                        className="inline-block h-8 w-8 rounded-full ring-2 ring-background"
                                        src={`https://i.pravatar.cc/150?img=${i}`}
                                        alt="Student"
                                    />
                                ))}
                            </div>
                            <p>Join 50,000+ students learning today</p>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative rounded-xl border bg-card shadow-2xl overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1000&auto=format&fit=crop"
                                alt="Student coding on a laptop with Java code on screen"
                                className="aspect-video w-full object-cover"
                            />
                            <div className="p-4 bg-card/80 backdrop-blur-sm flex justify-between items-center border-t">
                                <div className="flex gap-2">
                                    <div className="h-3 w-3 rounded-full bg-red-500" />
                                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                                    <div className="h-3 w-3 rounded-full bg-green-500" />
                                </div>
                                <div className="text-xs font-mono text-muted-foreground">Main.java</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}