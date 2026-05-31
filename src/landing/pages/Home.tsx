import { FinalCTA } from "@/landing/components/FinalCTA"
import Faq from "@/landing/components/Faq"
import Hero from "@/landing/components/Hero"
import LearningPath from "@/landing/components/LearningPath"
import { TrustBar } from "@/landing/components/TrustBar"
import { ScrollReveal } from "@/components/common/ScrollReveal"
import Testimonials from "@/landing/components/Testimonials"

const Home = () => {
    return (
        <div>
            <Hero />
            <ScrollReveal>
                <LearningPath />
            </ScrollReveal>
            <ScrollReveal>
                <TrustBar />
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