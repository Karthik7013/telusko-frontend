"use client";

import { CheckCircle2, Circle, Code, Laptop, Rocket, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const steps = [
    {
        title: "Foundation & Logic",
        description: "Master the basics of programming logic, variables, and loops using Java or Python.",
        icon: <Circle className="size-5" />,
        status: "complete",
    },
    {
        title: "Advanced Core Concepts",
        description: "Dive deep into OOPs, Data Structures, and Algorithms. The backbone of every developer.",
        icon: <Code className="size-5" />,
        status: "current",
    },
    {
        title: "Hands-on Projects",
        description: "Build 5+ real-world applications including a Quiz App and an E-commerce backend.",
        icon: <Laptop className="size-5" />,
        status: "upcoming",
    },
    {
        title: "Industry Readiness",
        description: "Learn Git, Docker, and Cloud deployment. Preparing you for top-tier tech roles.",
        icon: <Rocket className="size-5" />,
        status: "upcoming",
    },
    {
        title: "Certification & Hired",
        description: "Get your Telusko completion certificate and start applying to our partner companies.",
        icon: <Trophy className="size-5" />,
        status: "upcoming",
    },
];

export default function LearningPathPresenter() {
    const { data } = useGetUserQuery();
    const isAuthenticated = !!data;
    if (isAuthenticated) return null
    return (
        <section className="py-20 bg-background overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Header Animation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <Badge variant="secondary" className="mb-4">
                        The Roadmap
                    </Badge>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-4">
                        Your Path to Mastery
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        We don't just teach code; we build careers. Follow our structured
                        curriculum designed by industry veterans.
                    </p>
                </motion.div>

                <div className="max-w-3xl mx-auto relative">
                    {/* Animated vertical line */}
                    <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute left-4 top-0 w-0.5 bg-muted lg:left-1/2 lg:-ml-px origin-top"
                    />

                    <div className="space-y-12">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="relative flex items-start group"
                            >
                                {/* Dot / Icon Animation */}
                                <div className="absolute left-0 lg:left-1/2 lg:-translate-x-1/2 flex items-center justify-center">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 260,
                                            damping: 20,
                                            delay: index * 0.1 + 0.3
                                        }}
                                        className={`z-10 flex h-9 w-9 items-center justify-center rounded-full border-4 border-background transition-colors ${step.status === 'complete' ? 'bg-primary text-primary-foreground' :
                                            step.status === 'current' ? 'bg-background border-primary text-primary' :
                                                'bg-muted text-muted-foreground'
                                            }`}
                                    >
                                        {step.status === 'complete' ? <CheckCircle2 className="size-5" /> : step.icon}
                                    </motion.div>
                                </div>

                                {/* Content Card Animation */}
                                <div className={`ml-14 lg:ml-0 lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12 lg:text-right' : 'lg:pl-12 lg:ml-auto'}`}>
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        className="p-6 rounded-xl border bg-card hover:shadow-xl hover:border-primary/50 transition-all duration-300 cursor-default"
                                    >
                                        <h3 className="font-bold text-xl mb-2">{step.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {step.description}
                                        </p>
                                        {step.status === 'current' && (
                                            <Badge className="mt-4 animate-pulse bg-primary/10 text-primary border-none">
                                                Active Stage
                                            </Badge>
                                        )}
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}



const companies = [
    { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
    { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { name: "Oracle", logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" }
];



import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import { useGetUserQuery } from "@/features/auth/authApi";

export function TrustBar() {
    const { data } = useGetUserQuery();
    const isAuthenticated = !!data;
    if (isAuthenticated) return null
    return (
        <div className="py-12 bg-muted/10">
            <div className="container mx-auto px-4">
                <p className="text-center text-sm font-medium text-muted-foreground mb-8 uppercase tracking-widest">
                    Our Alumni Work At
                </p>

                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    plugins={[
                        AutoScroll({
                            speed: 1,
                            stopOnInteraction: false,
                            stopOnMouseEnter: true,
                        }),
                    ]}
                    /* THE MAGIC IS HERE: Mask-image creates the smooth fade at edges */
                    className="w-full relative [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]"
                >
                    <CarouselContent className="flex items-center">
                        {/* Duplicating the array to ensure seamlessness */}
                        {[...companies, ...companies].map((company, index) => (
                            <CarouselItem
                                key={index}
                                className="basis-1/3 md:basis-1/4 lg:basis-1/6 pl-8"
                            >
                                <div className="flex items-center justify-center h-12 outline-none">
                                    <img
                                        src={company.logo}
                                        alt={company.name}
                                        className="h-7 md:h-9 w-auto object-contain opacity-60 grayscale hover:grayscale-0 transition-all"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </div>
    );
}