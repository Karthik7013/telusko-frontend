
import { Sparkles } from "lucide-react";
import learning from '@/assets/Learning languages-pana.svg';
import react from '@/assets/react.svg';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext
} from "@/components/ui/carousel";
import { ScrollingSearch } from "@/components/layout/ScrollingSearch";

export default function Hero() {
    return (
        <section className="relative pt-10 pb-28 overflow-hidden">
            <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
            <div className="absolute inset-0 grid-bg pointer-events-none" />
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
                    <div className="flex flex-col items-center text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-sm text-primary mb-8">
                            <Sparkles className="size-3.5" />
                            Trusted by 2M+ Developers Worldwide
                        </div>

                        <h1 className="text-left font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight max-w-4xl">
                            <span className="text-gradient">Master Coding.</span>
                            <br />
                            <span className="text-gradient-primary">Build Your Future.</span>
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg sm:text-xl text-muted-foreground">
                            Level up with industry-led courses in Java, Python, Full-stack and DevOps.
                            Learn by shipping real-world projects—reviewed by senior engineers.
                        </p>

                        <div className="mt-10 w-full max-w-2xl">
                            <ScrollingSearch />
                        </div>
                        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex -space-x-3">
                                {[12, 47, 33, 68, 5].map((n) => (
                                    <img
                                        key={n}
                                        src={`https://i.pravatar.cc/64?img=${n}`}
                                        alt="Student"
                                        className="size-10 rounded-full ring-2 ring-background object-cover"
                                    />
                                ))}
                            </div>
                            <p>Join 50,000+ students learning today</p>
                        </div>
                    </div>

                    <div className="relative hidden lg:block mt-16 lg:mt-0">
                        <div className="rounded-xl overflow-hidden">
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
            </div>
        </section>
    )
}