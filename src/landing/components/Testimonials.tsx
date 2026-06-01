import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
    {
        name: "Arjun Mehta",
        role: "SDE at Microsoft",
        content: "Navin's Java Masterclass was the turning point. I went from knowing zero coding to clearing the Microsoft interview in 6 months.",
        avatar: "AM"
    },
    {
        name: "Sneha Rao",
        role: "Full Stack Developer",
        content: "The hands-on projects are real. I built a full-scale e-commerce app that actually helped me build my portfolio for freelancing.",
        avatar: "SR"
    },
    {
        name: "David Wilson",
        role: "Data Scientist",
        content: "Clear, concise, and straight to the point. Telusko's Python series is better than any paid university course I've taken.",
        avatar: "DW"
    },
    {
        name: "Priya Singh",
        role: "Backend Engineer",
        content: "The architectural patterns explained here are world-class. Highly recommended for senior devs too.",
        avatar: "PS"
    }
];

export default function Testimonials() {
    return (
        <section id="testimonials" className="py-20 lg:py-32">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 font-display">
                        Real Stories from Real Learners
                    </h2>
                    <p className="text-muted-foreground font-body">
                        Join thousands of developers who transformed their careers through our structured learning paths.
                    </p>
                </div>

                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    plugins={[
                        Autoplay({
                            delay: 4000,
                        }),
                    ]}
                    className="w-full max-w-5xl mx-auto"
                >
                    <CarouselContent className="-ml-4">
                        {testimonials.map((t, i) => (
                            <CarouselItem key={i} className="pl-4 py-1 md:basis-1/2 lg:basis-1/3">
                                <div
                                    key={"hai"}
                                    className="rounded-3xl border border-border bg-card p-7 shadow-elegant"
                                >
                                    <div className="flex gap-0.5 mb-4">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star key={i} className="size-4 fill-primary text-primary" />
                                        ))}
                                    </div>
                                    <p className="font-display text-lg italic text-foreground mb-6">&ldquo;{t.content}&rdquo;</p>
                                    <div className="pt-6 border-t border-border">
                                        <div className="flex gap-2">
                                            <div>
                                                <Avatar>
                                                    <AvatarImage src={`https://i.pravatar.cc/150?img=${i}`} alt={t.name}

                                                    />
                                                    <AvatarFallback>
                                                        {t.avatar}
                                                    </AvatarFallback>
                                                </Avatar>
                                            </div>
                                            <div>
                                                <div className="font-display font-semibold text-sm text-foreground">{t.name}</div>
                                                <div className="text-xs text-muted-foreground font-body">{t.role}</div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </CarouselItem>
                        ))}

                    </CarouselContent>
                    <div className="hidden md:block">
                        <CarouselPrevious />
                        <CarouselNext />
                    </div>
                </Carousel>
            </div>
        </section>
    );
}