import { FinalCTA } from "@/components/features/CtaPresenter"
import Faq from "@/components/features/FaqPresenter"
import Hero from "@/components/features/Hero"
import LearningPath, { TrustBar } from "@/components/features/LearningPathPresenter"
import { ScrollReveal } from "@/components/common/ScrollReview"
import Testimonials from "@/components/features/Testimonial"

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