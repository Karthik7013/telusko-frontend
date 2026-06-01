import { FinalCTA } from "@/landing/components/FinalCTA"
import Faq from "@/landing/components/Faq"
import Hero from "@/landing/components/Hero"
import LearningPath from "@/landing/components/LearningPath"
import { TrustBar } from "@/landing/components/TrustBar"
import { ScrollReveal } from "@/components/common/ScrollReveal"
import Testimonials from "@/landing/components/Testimonials"

import Features from "../components/Features"
import Stats from "../components/Stats"

const Home = () => {
    return (
        <div className="landing-page font-body min-h-screen bg-background text-foreground antialiased">
            <Hero />
            <ScrollReveal>
                <TrustBar />
            </ScrollReveal>
            <ScrollReveal>
                <LearningPath />
            </ScrollReveal>
            <ScrollReveal>
                <Features />
            </ScrollReveal>
            <ScrollReveal>
                <Stats />
            </ScrollReveal>
            <ScrollReveal>
                <Testimonials />
            </ScrollReveal>
            <ScrollReveal>
                <Faq />
            </ScrollReveal>
            <ScrollReveal>
                <FinalCTA />
            </ScrollReveal>
        </div>
    )
}

export default Home