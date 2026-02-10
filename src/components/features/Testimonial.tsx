import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useGetUserQuery } from "@/features/auth/authApi";

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

export default function TestimonialsPresenter() {
    const { data } = useGetUserQuery();
    const isAuthenticated = !!data;
    if (isAuthenticated) return null
    return (
        <section className="py-20 lg:py-32">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                        Real Stories from Real Learners
                    </h2>
                    <p className="text-muted-foreground">
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
                                <Card className="bg-card border-none shadow-sm h-full">
                                    <CardContent className="pt-8 flex flex-col justify-between h-full">
                                        <div>
                                            <Quote className="size-8 text-primary/20 mb-4" />
                                            <p className="text-lg mb-6 italic text-muted-foreground">"{t.content}"</p>
                                        </div>
                                        <div className="flex items-center gap-4 mt-auto">
                                            <Avatar>
                                                <AvatarImage src={`https://i.pravatar.cc/150?img=${i}`} alt={t.name}

                                                />
                                                <AvatarFallback>
                                                    {t.avatar}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-bold leading-none">{t.name}</p>
                                                <p className="text-sm text-primary mt-1">{t.role}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
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