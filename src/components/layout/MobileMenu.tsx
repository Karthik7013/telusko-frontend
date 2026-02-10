import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { SwitchTheme } from "@/components/common/ToggleTheme";
import { NAV_CATEGORIES as courseCategories } from "@/data/courses-data";

export function MobileMenu() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                    <Menu className="h-6 w-6" />
                </Button>
            </SheetTrigger>
            <SheetContent side="top" className="w-full overflow-y-auto px-6 pb-10 hide-close-button">
                <SheetHeader className="text-left px-0">
                    <SheetTitle className="flex items-center gap-2">
                        <GraduationCap className="h-6 w-6 text-primary" />
                        <span className="font-bold">Telusko</span>
                    </SheetTitle>
                    <SheetDescription className="sr-only">
                        Mobile navigation menu for exploring courses and accessing account settings.
                    </SheetDescription>
                </SheetHeader>

                <div className="flex flex-col gap-4">
                    <Accordion type="single" collapsible className="w-full">
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
                                <Link to="/paths/frontend" className="p-2">Mobile Dev</Link>
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
                    <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Theme</div>
                        <SwitchTheme />
                    </div>
                    <div className="flex flex-col gap-3 mt-4">
                        <Button variant="outline" className="w-full" asChild>
                            <Link to="/login">Log in</Link>
                        </Button>
                        <Button className="w-full bg-primary" asChild>
                            <Link to="/signup">Join for Free <ArrowRight /></Link>
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
