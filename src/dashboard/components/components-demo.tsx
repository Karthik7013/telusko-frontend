import { Link } from "react-router-dom";
import {
  Play, ArrowRight,
  Target, Award, ChevronRight, Calendar, Zap, Code2, Star,
  Flame,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const continueLearning = [
  { title: "Spring Boot Microservices", chapter: "Ch 7 · Service Discovery with Eureka", progress: 68, time: "24 min left", color: "from-emerald-500 to-teal-500" },
  { title: "Advanced React Patterns", chapter: "Ch 4 · Compound Components", progress: 42, time: "1h 12m left", color: "from-amber-500 to-orange-500" },
  { title: "Docker & Kubernetes", chapter: "Ch 2 · Container Orchestration", progress: 23, time: "3h 40m left", color: "from-sky-500 to-blue-500" },
];

const activity = [3, 5, 2, 8, 6, 9, 4, 7, 10, 6, 8, 5, 9, 12];

const goals = [
  { title: "Finish Spring Boot", deadline: "Jun 14", progress: 68 },
  { title: "Earn 2 certificates", deadline: "Jun 30", progress: 50 },
  { title: "30-day streak", deadline: "Jun 19", progress: 40 },
];

const recommended = [
  { title: "System Design Fundamentals", author: "Navin Reddy", rating: 4.9, students: "24,310", tag: "Bestseller" },
  { title: "TypeScript Deep Dive", author: "Sara Vohra", rating: 4.8, students: "18,902", tag: "New" },
  { title: "AWS Solutions Architect", author: "Daniel Okafor", rating: 4.9, students: "31,547", tag: "Career" },
];




export function HeroWelcome() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-6 md:p-8 shadow-elegant">
      <div className="absolute inset-0 bg-hero-glow opacity-80" />
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Flame className="h-3.5 w-3.5" /> 12-day streak · Keep going!
          </span>
          <h1 className="mt-4 font-display text-3xl md:text-4xl font-semibold leading-tight">
            Welcome back, <span className="text-gradient-primary">Alien</span>.
          </h1>
          <p className="mt-2 text-sm md:text-base text-muted-foreground">
            You're <span className="text-foreground font-medium">68%</span> through Spring Boot Microservices. Just 24 minutes to unlock Chapter 8.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow">
              <Play className="h-4 w-4 fill-current" /> Resume learning
            </Button>
            <Button variant="outline" className="border-border/60">
              View schedule <Calendar className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="relative hidden lg:block">
          <div className="relative h-44 w-44 animate-float">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
              <circle cx="50" cy="50" r="42" className="fill-none stroke-border" strokeWidth="6" />
              <circle cx="50" cy="50" r="42" className="fill-none stroke-primary" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 42}`} strokeDashoffset={`${2 * Math.PI * 42 * (1 - 0.68)}`} />
            </svg>
            <div className="absolute inset-0 grid place-items-center text-center">
              <div>
                <p className="font-display text-3xl font-bold">68<span className="text-lg">%</span></p>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Weekly goal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ContinueLearningSection() {
  return (
    <div className="lg:col-span-2 rounded-2xl border border-border/60 bg-card p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-display text-xl font-semibold">Continue learning</h2>
          <p className="text-xs text-muted-foreground mt-1">Pick up where you left off</p>
        </div>
        <Link to="/courses" className="text-xs font-medium text-primary inline-flex items-center gap-1 hover:gap-2 transition-all">
          View all <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="space-y-3">
        {continueLearning.map((c) => (
          <div key={c.title} className="group flex items-center gap-4 rounded-xl border border-border/40 bg-background/50 p-3 hover:border-primary/40 hover:bg-background transition cursor-pointer">
            <div className={`relative h-14 w-14 shrink-0 rounded-xl bg-linear-to-br ${c.color} grid place-items-center shadow-lg`}>
              <Code2 className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{c.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">{c.chapter}</p>
              <div className="mt-2 flex items-center gap-3">
                <Progress value={c.progress} className="h-1.5 flex-1" />
                <span className="text-[11px] font-medium tabular-nums text-muted-foreground">{c.progress}%</span>
              </div>
            </div>
            <div className="hidden sm:flex flex-col items-end gap-2">
              <span className="text-[11px] text-muted-foreground whitespace-nowrap">{c.time}</span>
              <button className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition">
                <Play className="h-3.5 w-3.5 fill-current" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ActivitySection() {
  const maxAct = Math.max(...activity);
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-6">
      <div className="flex items-center justify-between mb-1">
        <h2 className="font-display text-xl font-semibold">Activity</h2>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Last 14 days</span>
      </div>
      <p className="text-xs text-muted-foreground">Hours studied per day</p>
      <div className="mt-5 flex items-end gap-1.5 h-32">
        {activity.map((v, i) => (
          <div key={i} className="group relative flex-1 flex flex-col justify-end">
            <div
              className={`w-full rounded-md transition-all hover:opacity-100 ${i === activity.length - 1 ? "bg-gradient-primary" : "bg-primary/30"}`}
              style={{ height: `${(v / maxAct) * 100}%` }}
            />
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 pt-4 border-t border-border/40">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Total</p>
          <p className="font-display text-xl font-bold mt-1">94h</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Avg / day</p>
          <p className="font-display text-xl font-bold mt-1">6.7h</p>
        </div>
      </div>
    </div>
  )
}

export function GoalsSection() {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-6">
      <div className="flex items-center gap-2 mb-1">
        <Target className="h-4 w-4 text-primary" />
        <h2 className="font-display text-xl font-semibold">Goals</h2>
      </div>
      <p className="text-xs text-muted-foreground">June 2026</p>
      <div className="mt-5 space-y-4">
        {goals.map((g) => (
          <div key={g.title}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">{g.title}</p>
              <span className="text-[10px] text-muted-foreground">{g.deadline}</span>
            </div>
            <div className="flex items-center gap-3">
              <Progress value={g.progress} className="h-1.5 flex-1" />
              <span className="text-[11px] font-semibold tabular-nums">{g.progress}%</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-3">
        <Award className="h-5 w-5 text-primary shrink-0" />
        <p className="text-xs text-muted-foreground">Complete all 3 to unlock the <span className="text-foreground font-semibold">June Achiever</span> badge.</p>
      </div>
    </div>
  )
}

export function RecommendedSection() {
  return (
    <div className="lg:col-span-2 rounded-2xl border border-border/60 bg-card p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            <h2 className="font-display text-xl font-semibold">Recommended for you</h2>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Curated from your learning history</p>
        </div>
        <Link to="/courses" className="text-xs font-medium text-primary inline-flex items-center gap-1 hover:gap-2 transition-all">
          Explore <ChevronRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {recommended.map((r) => (
          <Link key={r.title} to="/courses" className="group rounded-xl border border-border/40 bg-background/50 p-4 hover:border-primary/40 hover:bg-background transition">
            <div className="aspect-video rounded-lg bg-linear-to-br from-primary/30 via-primary/10 to-transparent grid place-items-center mb-3 relative overflow-hidden">
              <Code2 className="h-8 w-8 text-primary/70" />
              <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-background/80 backdrop-blur text-primary">{r.tag}</span>
            </div>
            <p className="font-semibold leading-tight group-hover:text-primary transition">{r.title}</p>
            <p className="text-xs text-muted-foreground mt-1">{r.author}</p>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1 font-medium">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {r.rating}
              </span>
              <span className="text-muted-foreground">{r.students} students</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}