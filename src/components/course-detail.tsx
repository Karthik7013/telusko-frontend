import {
    Check,
    PlayCircle,
    Globe,
    Info,
    Star,
    Trophy,
    Infinity,
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import CourseContent from './course-content';

// --- TYPE DEFINITIONS ---

type Lecture = {
    id: string;
    title: string;
    duration: string;
    isPreviewable: boolean;
};

type Section = {
    id: string;
    title: string;
    lectures: Lecture[];
    totalDuration: string;
};

export type CourseDetails = {
    id: string;
    title: string;
    sub_title: string;
    description: string;
    author: {
        name: string;
        profile_url?: string;
    };
    rating: {
        average: number;
        count: number;
    };
    enrollment_count: number;
    tags: string[];
    last_update: string;
    language: string;
    price: {
        current: number;
        original: number;
        currency: string;
        discount_percentage: number;
    };
    preview_video: {
        thumbnail_url: string;
        video_url: string;
    };
    learning_outcomes: string[];
    requirements: string[];
    features: {
        video_hours: number;
        articles_count: number;
        has_lifetime_access: boolean;
        has_certificate: boolean;
    };
    content: {
        total_sections: number;
        total_lectures: number;
        total_time: string;
        sections: Section[];
    };
};

// --- MOCK DATA ---

const mockCourseData: CourseDetails = {
    id: "web-dev-101",
    title: "Complete Web Development Course",
    sub_title: "The only web development course you will need. Covers HTML, CSS, Tailwind, Node, React, MongoDB, Prisma, and Deployment.",
    description: "Full stack mastery from scratch...",
    author: { name: "Hitesh Choudhary" },
    rating: { average: 4.6, count: 18887 },
    enrollment_count: 67011,
    tags: ["Bestseller", "Development", "Web Design"],
    last_update: "1/2026",
    language: "English",
    price: {
        current: 479,
        original: 3089,
        currency: "₹",
        discount_percentage: 84
    },
    preview_video: {
        thumbnail_url: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1V8gwU.img?w=1012&h=759&m=6&x=564&y=230&s=264&d=264",
        video_url: "#"
    },
    learning_outcomes: [
        "Become a full stack developer",
        "Master of Javascript ecosystem",
        "Build any project for your company",
        "Full stack with MERN, GIT and advanced topics"
    ],
    requirements: [
        "Just a laptop with good internet connection",
        "A strong will to complete this course"
    ],
    features: {
        video_hours: 100,
        articles_count: 24,
        has_lifetime_access: true,
        has_certificate: true
    },
    content: {
        total_sections: 2,
        total_lectures: 3,
        total_time: "99h 48m",
        sections: [
            {
                id: "sec-1",
                title: "Before web dev Journey",
                totalDuration: "15:20",
                lectures: [
                    { id: "lec-1", title: "Introduction", duration: "05:20", isPreviewable: true },
                    { id: "lec-2", title: "Tools Setup", duration: "10:00", isPreviewable: false }
                ]
            },
            {
                id: "sec-2",
                title: "HTML5 Foundations",
                totalDuration: "2h 30m",
                lectures: [
                    { id: "lec-3", title: "HTML Tags", duration: "45:00", isPreviewable: true }
                ]
            }
        ]
    }
};

// --- COMPONENT ---

export default function CourseDetailPage({ data = mockCourseData }: { data?: CourseDetails }) {
    return (
        <div>
            {/* HERO SECTION */}
            <section className="bg-card text-card-foreground y-26 lg:py-36 relative">
                <div className="container py-26 lg:py-0 mx-auto px-4 grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-4">
                        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
                            {data.title}
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl">
                            {data.sub_title}
                        </p>
                        <nav className="flex flex-wrap gap-2 mb-4">
                            {data.tags.map((tag) => (
                                <Badge
                                    key={tag}
                                    variant={"outline"}
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </nav>
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                            <div className="flex items-center gap-1 text-orange-400 font-bold">
                                <span>{data.rating.average}</span>
                                <div className="flex"><Star className="size-4 fill-current" /></div>
                            </div>
                            <span className="underline text-blue-400">({data.rating.count.toLocaleString()} ratings)</span>
                            <span>{data.enrollment_count.toLocaleString()} learners</span>
                        </div>

                        <p className="text-sm">Created by <span className="underline text-blue-400 cursor-pointer">{data.author.name}</span></p>

                        <div className="flex flex-wrap items-center gap-6 text-sm">
                            <span className="flex items-center gap-1"><Info className="size-4" /> Last updated {data.last_update}</span>
                            <span className="flex items-center gap-1"><Globe className="size-4" /> {data.language}</span>
                        </div>
                    </div>
                    <div className='relative lg:col-span-1'>
                        {/* STICKY SIDEBAR */}
                        <aside className="lg:absolute lg:right-0 lg:top-0">
                            <div className="border bg-card shadow-2xl rounded-sm overflow-hidden text-card-foreground">
                                <div className="relative aspect-video group cursor-pointer">
                                    <img
                                        src={data.preview_video.thumbnail_url}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center group-hover:bg-black/50 transition-all">
                                        <PlayCircle className="size-16 text-white" />
                                        <span className="text-white font-bold mt-2">Preview this course</span>
                                    </div>
                                </div>

                                <div className="p-6 space-y-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-3xl font-bold">{data.price.currency}{data.price.current}</span>
                                        <span className="text-muted-foreground line-through">{data.price.currency}{data.price.original}</span>
                                        <span className="text-sm font-medium">{data.price.discount_percentage}% off</span>
                                    </div>

                                    <div className="space-y-2">
                                        <Button className="w-full h-12 text-md font-bold">Add to cart</Button>
                                        <Button variant="outline" className="w-full h-12 font-bold border-foreground">Buy now</Button>
                                    </div>

                                    <p className="text-center text-xs text-muted-foreground">30-Day Money-Back Guarantee</p>

                                    <div className="space-y-3 pt-4 border-t">
                                        <h3 className="font-bold text-sm">This course includes:</h3>
                                        <div className="space-y-2 text-sm">
                                            {data.features.has_lifetime_access && <div className="flex items-center gap-3"><Infinity className="size-4" /> Full lifetime access</div>}
                                            {data.features.has_certificate && <div className="flex items-center gap-3"><Trophy className="size-4" /> Certificate of completion</div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* MAIN CONTENT AREA */}
            <main className="container mx-auto px-4 py-12">
                <div className="lg:w-2/3 space-y-12">

                    {/* WHAT YOU'LL LEARN */}
                    <section className="border p-6 rounded-sm">
                        <h2 className="text-2xl font-bold mb-6">What you'll learn</h2>
                        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                            {data.learning_outcomes.map((item, i) => (
                                <div key={i} className="flex gap-3 text-sm">
                                    <Check className="size-4 mt-1 shrink-0 text-muted-foreground" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* COURSE CONTENT */}

                    <CourseContent content={mockCourseData.content} />

                    {/* REQUIREMENTS */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Requirements</h2>
                        <ul className="list-disc ml-5 space-y-2 text-sm">
                            {data.requirements.map((req, i) => (
                                <li key={i} className="pl-2">{req}</li>
                            ))}
                        </ul>
                    </section>
                </div>
            </main>
        </div>
    );
}


