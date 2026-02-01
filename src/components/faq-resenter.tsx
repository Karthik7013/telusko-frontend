import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useGetUserQuery } from "@/features/auth/authApi";
import { HelpCircle } from "lucide-react";

const faqs = [
    {
        question: "Is this suitable for absolute beginners?",
        answer: "Yes! Our 'Zero to Hero' philosophy means we start with basic logic and building blocks before moving to advanced architecture. No prior coding experience is required for our foundational tracks."
    },
    {
        question: "Will I get a certificate upon completion?",
        answer: "Absolutely. Once you complete all modules and pass the final project assessment, you will receive a verified Telusko certification which you can share on LinkedIn or with recruiters."
    },
    {
        question: "How long will I have access to the course material?",
        answer: "You get lifetime access to the courses you enroll in. This includes all future updates to the content as technology evolves, at no extra cost."
    },
    {
        question: "Are there any hands-on projects included?",
        answer: "Every course is project-based. You won't just watch videos; you'll build real-world applications like Banking Systems, E-commerce backends, and Chat apps to build a professional portfolio."
    },
    {
        question: "What if I get stuck while coding?",
        answer: "We have a dedicated community forum and Discord channel where you can interact with fellow students and our teaching assistants to get your doubts resolved quickly."
    }
];

export default function FAQPresenter() {
    const { data } = useGetUserQuery();
    const isAuthenticated = !!data;
    if (isAuthenticated) return null
    return (
        <section className="py-20 lg:py-32">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="flex flex-col items-center text-center mb-12">
                    <Badge variant="outline" className="mb-4 gap-2 px-4 py-1">
                        <HelpCircle className="size-3.5 text-primary" />
                        Common Questions
                    </Badge>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                        Everything you need to know
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Have more questions? Reach out to our support team anytime.
                    </p>
                </div>

                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqs.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            value={`item-${index}`}
                            className="border rounded-lg px-6 bg-card transition-all"
                        >
                            <AccordionTrigger className="hover:cursor-pointer text-left font-medium hover:no-underline py-6">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}