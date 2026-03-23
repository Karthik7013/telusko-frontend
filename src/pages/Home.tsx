import { FinalCTAPresenter } from "@/components/features/CtaPresenter"
import FaqPresenter from "@/components/features/FaqPresenter"
import HeroContainer from "@/components/features/HeroContainer"
import LearningPathPresenter, { TrustBar } from "@/components/features/LearningPathPresenter"

import { ScrollReveal } from "@/components/common/ScrollReview"
import TestimonialsPresenter from "@/components/features/Testimonial"

const Home = () => {
    return (
        <div>
            <HeroContainer />
            <ScrollReveal>
                <LearningPathPresenter />
            </ScrollReveal>
            <ScrollReveal>
                <TrustBar />
            </ScrollReveal>
            <ScrollReveal>
                <TestimonialsPresenter />
            </ScrollReveal>
            <ScrollReveal>
                <FaqPresenter />
            </ScrollReveal>
            <ScrollReveal>
                <FinalCTAPresenter />
            </ScrollReveal>
        </div>
    )
}

export default Home