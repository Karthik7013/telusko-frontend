
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function FinalCTA() {
    return (
        <section id="cta">
            <div className="container mx-auto px-4">
                <div className="relative rounded-3xl border border-primary/10 bg-card p-10 sm:p-20 overflow-hidden">
                    <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
                    <div className="absolute inset-0 grid-bg pointer-events-none" />

                    <div className="relative overflow-hidden text-center">
                        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full  blur-3xl" />
                        <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full blur-3xl" />

                        <div className="relative z-10 mx-auto max-w-2xl">
                            <div className="mb-6 flex justify-center">
                                <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium backdrop-blur-md">
                                    <Sparkles className="size-4" />
                                    Join 2 Million+ Learners
                                </div>
                            </div>

                            <div className="relative text-center">
                                <h2 className="font-display text-4xl sm:text-6xl text-foreground">
                                    Your future self is{" "}
                                    <span className="text-gradient-primary">already coding.</span>
                                </h2>
                                <p className="mt-4 text-muted-foreground max-w-xl mx-auto font-body">
                                    Start a 7-day free trial. Full access to every track. Cancel anytime.
                                </p>
                                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <Link
                                        to="/auth/signup"
                                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-primary text-sm font-medium text-primary-foreground shadow-glow hover:scale-105 transition-transform"
                                    >
                                        Start free
                                        <ArrowRight className="size-4" />
                                    </Link>
                                    <Link
                                        to="/courses"
                                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-border bg-card/50 backdrop-blur-sm text-sm font-medium text-foreground hover:bg-card/80 transition-colors"
                                    >
                                        <Play className="size-4" />
                                        Watch a lesson
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FinalCTA