import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { NAV_CATEGORIES as courseCategories } from "@/data/courses-data";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";

export function MobileMenu({
    open,
    onClose
}: {
    open: boolean;
    onClose: (open: boolean) => void
}) {
    return (
        <div className="bg-pink-900">
            <Collapsible open={open} onOpenChange={onClose}>
                <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                    <div className="flex flex-col gap-4 py-4 border-t">
                        <Accordion type="single" collapsible className="w-full flex-1">
                            <AccordionItem value="courses">
                                <AccordionTrigger>Explore Courses</AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-2">
                                    <Link to="/bootcamps" className="p-2 text-primary font-medium">Job Ready Bootcamps</Link>
                                    <Link to="/courses/live" className="p-2">Live Classes</Link>
                                    <Link to="/courses/free" className="p-2">Free Tutorials</Link>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="paths">
                                <AccordionTrigger>Learning Paths</AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-2">
                                    <Link to="/paths/backend" className="p-2">Backend Architect</Link>
                                    <Link to="/paths/frontend" className="p-2">Frontend Specialist</Link>
                                    <Link to="/paths/mobile" className="p-2">Mobile Dev</Link>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="specs">
                                <AccordionTrigger>Specializations</AccordionTrigger>
                                <AccordionContent className="grid grid-cols-1 gap-1">
                                    {courseCategories.map((course) => (
                                        <Link key={course.title} to={course.to} className="p-2 hover:bg-muted rounded-md">
                                            {course.title}
                                        </Link>
                                    ))}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                    <div className="flex flex-col gap-3 mt-4">
                        <Button variant="outline" className="w-full" asChild>
                            <Link to="/login">Log in</Link>
                        </Button>
                        <Button className="w-full bg-primary" asChild>
                            <Link to="/signup">Join for Free <ArrowRight /></Link>
                        </Button>
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
}
