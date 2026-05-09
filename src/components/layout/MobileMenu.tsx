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
        <Collapsible
            open={open}
            onOpenChange={onClose}
            className="w-full"
        >
            <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden bg-background">
                <div className="container mx-auto flex flex-col justify-between py-6 h-[calc(100vh-8rem)] px-4">
                    <div className="flex flex-col gap-2 overflow-y-auto flex-1 pr-2">
                        <Accordion type="single" collapsible className="w-full mb-4">
                            <AccordionItem value="courses">
                                <AccordionTrigger className="text-lg">Explore Courses</AccordionTrigger>
                                <AccordionContent className="flex h-fit flex-col">
                                    <Link to="/bootcamps" onClick={() => onClose(false)} className="p-2 text-primary font-medium">Job Ready Bootcamps</Link>
                                    <Link to="/courses/live" onClick={() => onClose(false)} className="p-2">Live Classes</Link>
                                    <Link to="/courses/free" onClick={() => onClose(false)} className="p-2">Free Tutorials</Link>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="paths">
                                <AccordionTrigger className="text-lg">Learning Paths</AccordionTrigger>
                                <AccordionContent className="flex h-fit flex-col gap-2">
                                    <Link to="/paths/backend" onClick={() => onClose(false)} className="p-2">Backend Architect</Link>
                                    <Link to="/paths/frontend" onClick={() => onClose(false)} className="p-2">Frontend Specialist</Link>
                                    <Link to="/paths/mobile" onClick={() => onClose(false)} className="p-2">Mobile Dev</Link>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="specs">
                                <AccordionTrigger className="text-lg">Specializations</AccordionTrigger>
                                <AccordionContent className="flex h-fit flex-col gap-2">
                                    {courseCategories.map((course) => (
                                        <Link key={course.title} to={course.to} onClick={() => onClose(false)} className="p-2 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground">
                                            {course.title}
                                        </Link>
                                    ))}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                    <div className="flex flex-col gap-3 pt-6 mt-auto border-t bg-background">
                        <Button variant="outline" className="w-full p-6" asChild>
                            <Link to="/auth/login" onClick={() => onClose(false)}>Log in</Link>
                        </Button>
                        <Button className="w-full bg-primary p-6" asChild>
                            <Link to="/auth/signup" onClick={() => onClose(false)}>Join for Free <ArrowRight className="ml-2 size-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </CollapsibleContent>
        </Collapsible>

    );
}