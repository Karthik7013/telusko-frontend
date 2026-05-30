import { FinalCTA } from "@/components/features/FinalCTA"
import Faq from "@/components/features/Faq"
import Hero from "@/components/features/Hero"
import LearningPath, { TrustBar } from "@/components/features/LearningPath"
import { ScrollReveal } from "@/components/common/ScrollReveal"
import Testimonials from "@/components/features/Testimonials"

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