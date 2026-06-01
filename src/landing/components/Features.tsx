import { ArrowRight, Award, Rocket, ShieldCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";
const FEATURES_DATA = [
    {
        icon: Rocket, title: "Project-first learning",
        desc: "Every module ends with a real, portfolio-worthy project—not multiple choice quizzes.",
    },
    {
        icon: ShieldCheck, title: "Industry-verified",
        desc: "Curriculum reviewed by senior engineers from Google, Microsoft, and Amazon.",
    },
    {
        icon: Users, title: "Active community",
        desc: "A 2M+ developer community shipping code, sharing reviews, and unblocking each other.",
    },
    {
        icon: Award, title: "Recognised certificates",
        desc: "Earn certificates that hiring managers actually recognise and trust.",
    },
]
export default function Features() {
    return (
        <section id="features" className="border-y border-border bg-secondary/20 py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center">
                    <div>
                        <span className="text-xs font-medium uppercase tracking-[0.3em] text-primary">WHY TELUSKO</span>
                        <h2 className="mt-4 font-display text-4xl sm:text-5xl text-foreground">
                            Built for developers who want to{" "}
                            <span className="text-gradient-primary">actually ship.</span>
                        </h2>
                        <p className="mt-4 text-muted-foreground font-body">
                            We don't do passive video marathons. Every track is built around projects, code reviews,
                            and real engineering workflows—so when you finish, you're ready to contribute on day one.
                        </p>
                        <Link
                            to="/auth/signup"
                            className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-primary text-sm font-medium text-primary-foreground shadow-glow hover:opacity-90 transition-opacity"
                        >
                            Start your free week
                            <ArrowRight className="size-4" />
                        </Link>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        {FEATURES_DATA.map((feature) => (
                            <div key={feature.title} className="rounded-2xl border border-border bg-card p-6">
                                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                    <feature.icon className="size-5 text-primary" />
                                </div>
                                <h3 className="font-display text-lg text-foreground mb-2">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground font-body">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}