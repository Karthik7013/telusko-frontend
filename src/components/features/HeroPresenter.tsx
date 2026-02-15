
import { ArrowRight, PlayCircle, Users } from "lucide-react";
import { Link } from "react-router-dom";
import learning from '../../assets/Learning languages-pana.svg';
import react from '../../assets/react.svg';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext
} from "@/components/ui/carousel";

export default function HeroPresenter() {
    return (
        <section className="py-30 lg:py-28">
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

                    <div className="relative hidden lg:block">
                        <Carousel className="rounded-xl overflow-hidden">
                            <CarouselContent className="w-full object-contain">
                                <CarouselItem>
                                    <img
                                        src={learning}
                                        alt="Student coding on a laptop with Java code on screen"
                                        className="w-full h-full object-cover"
                                    />
                                </CarouselItem>
                                <CarouselItem>
                                    <img
                                        src={react}
                                        alt="React development environment"
                                        className="w-full h-full object-cover"
                                    />
                                </CarouselItem>
                            </CarouselContent>
                            <CarouselPrevious className="bg-white/95 backdrop-blur-sm" />
                            <CarouselNext className="bg-white/95 backdrop-blur-sm" />
                        </Carousel>
                    </div>
                </div>
            </div>
        </section>
    );
}