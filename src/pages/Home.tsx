import { FinalCTAPresenter } from "@/components/features/CtaPresenter"
import FaqPresenter from "@/components/features/FaqPresenter"
import HeroContainer from "@/components/features/HeroContainer"
// import LatestCourseContainer from "@/components/features/LatestCourseContainer"
import LearningPathPresenter, { TrustBar } from "@/components/features/LearningPathPresenter"

import { ScrollReveal } from "@/components/common/ScrollReview"
import TestimonialsPresenter from "@/components/features/Testimonial"
// import RecommendedCourse from "@/pages/RecommendedCourse"
// import { BubbleBackground } from "@/components/common/BackgroundBubble"

const Home = () => {
    return (
        <div>
            {/* <BubbleBackground> */}
                <HeroContainer />
            {/* </BubbleBackground> */}
            {/* <ScrollReveal>
                <LatestCourseContainer />
            </ScrollReveal> */}
            {/* <ScrollReveal>
                <RecommendedCourse />
            </ScrollReveal> */}
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