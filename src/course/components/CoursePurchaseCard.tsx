import { useNavigate } from "react-router-dom";
import { Clock, Award, ShieldCheck, Infinity as InfinityIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { VideoPlayer } from "@/components/ui/video-player";
import { toast } from 'sonner';
import { addToCart } from '@/features/cart/cartSlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';

interface CourseData {
    id: string;
    slug: string;
    title: string;
    thumbnailUrl: string;
    previewVideoUrl?: string;
    basePrice: number;
    discountedPrice?: number;
    instructor: { fullName: string; };
    discountPercentage?: number;
}

interface CoursePurchaseCardProps {
    course: CourseData;
}

export function CoursePurchaseCard({ course }: CoursePurchaseCardProps) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    return (
        <aside className="sticky top-24">
            <div className="border bg-card text-card-foreground shadow-xl rounded-xl overflow-hidden">
                <div className="relative">
                    <VideoPlayer
                        poster={course.thumbnailUrl}
                        src={course.previewVideoUrl || ''} />
                </div>
                <div className="p-6 pt-4 space-y-4">
                    <div className="flex items-end gap-3 flex-wrap">
                        <span className="text-3xl font-bold text-primary">${course.basePrice}</span>
                        <span className="text-lg text-muted-foreground line-through">${course.basePrice}</span>
                    </div>

                    <div className="grid gap-3">
                        <Button
                            className="w-full h-12 text-base font-bold"
                            onClick={() => {
                                dispatch(addToCart({
                                    courseId: course.id,
                                    slug: course.slug,
                                    title: course.title,
                                    thumbnailUrl: course.thumbnailUrl,
                                    instructorName: course.instructor.fullName,
                                    basePrice: course.basePrice,
                                    discountPercentage: course.discountPercentage,
                                    discountedPrice: course.discountedPrice,
                                }))
                                toast.success('Added to cart')
                            }}
                        >
                            Add to cart
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full h-12 text-base font-bold"
                            onClick={() => navigate(`/checkout?course=${course.slug}`)}
                        >
                            Buy now
                        </Button>
                    </div>

                    <p className="text-center text-xs text-muted-foreground font-medium uppercase tracking-wide">30-Day Money-Back Guarantee</p>

                    <div className="space-y-4 pt-2 border-t">
                        <h3 className="font-bold text-sm tracking-wide uppercase">This course includes:</h3>
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <Clock className="size-5 text-muted-foreground" />
                                <span>20 hours on-demand video</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <InfinityIcon className="size-5 text-muted-foreground" />
                                <span>Full lifetime access</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Award className="size-5 text-muted-foreground" />
                                <span>Certificate of completion</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="size-5 text-muted-foreground" />
                                <span>Access on mobile and TV</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
