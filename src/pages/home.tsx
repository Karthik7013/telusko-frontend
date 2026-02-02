import { FinalCTAPresenter } from "@/components/cta-presenter"
import FAQPresenter from "@/components/faq-resenter"
import HeroContainer from "@/components/hero-container"
import LatestCourseContainer from "@/components/latest-course-container"
import LearningPathPresenter, { TrustBar } from "@/components/learning-path-presenter"

import { ScrollReveal } from "@/components/common/scroll-review"
import TestimonialsPresenter from "@/components/testimonial"
import RecommendedCourse from "./recommended-course"
import { BubbleBackground } from "@/components/background-bubble"

const Home = () => {
    return (
        <div>

            <BubbleBackground interactive>
                <HeroContainer />
            </BubbleBackground>
            <ScrollReveal>
                <LatestCourseContainer />
            </ScrollReveal>
            <ScrollReveal>
                <RecommendedCourse />
            </ScrollReveal>
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
                <FAQPresenter />
            </ScrollReveal>
            <ScrollReveal>
                <FinalCTAPresenter />
            </ScrollReveal>
        </div>
    )
}

export default Home