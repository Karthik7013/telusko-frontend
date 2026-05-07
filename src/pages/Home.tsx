import { FinalCTAPresenter } from "@/components/features/CtaPresenter"
import FaqPresenter from "@/components/features/FaqPresenter"
import HeroContainer from "@/components/features/HeroContainer"
import LearningPathPresenter, { TrustBar } from "@/components/features/LearningPathPresenter"
import { useGetUserQuery } from "@/features/auth/authApi"

import { ScrollReveal } from "@/components/common/ScrollReview"
import TestimonialsPresenter from "@/components/features/Testimonial"
import { Skeleton } from "@/components/ui/skeleton"

const Home = () => {
    const { data, isLoading } = useGetUserQuery();
    const isAuthenticated = !!data;
    
    if (isAuthenticated) return null;

    return (
        <div>
            <HeroContainer />
            <ScrollReveal>
                {isLoading ? (
                    <div className="space-y-6">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                ) : (
                    <LearningPathPresenter />
                )}
            </ScrollReveal>
            <ScrollReveal>
                {isLoading ? (
                    <div className="space-y-4">
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/3" />
                    </div>
                ) : (
                    <TrustBar />
                )}
            </ScrollReveal>
            <ScrollReveal>
                {isLoading ? (
                    <div className="space-y-6">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                ) : (
                    <TestimonialsPresenter />
                )}
            </ScrollReveal>
            <ScrollReveal>
                {isLoading ? (
                    <div className="space-y-4">
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/3" />
                    </div>
                ) : (
                    <FaqPresenter />
                )}
            </ScrollReveal>
            <ScrollReveal>
                {isLoading ? (
                    <div className="space-y-4">
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                ) : (
                    <FinalCTAPresenter />
                )}
            </ScrollReveal>
        </div>
    )
}

export default Home