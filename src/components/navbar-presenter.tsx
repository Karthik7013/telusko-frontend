import * as React from "react";
import { Link } from "react-router-dom";
import { BookOpen, GraduationCap, Menu, MoveUpRight, ArrowRight, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Sheet,

    SheetContent,
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
import { ToggleTheme, SwitchTheme } from "./common/toggle-theme";
import { NAV_CATEGORIES as courseCategories } from "@/data/courses-data";


export function NavbarPresenter({
    isLogin
}: {
    isLogin: boolean,
    data: User | undefined
}) {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = React.useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery("");
        }
    };


    return (
        <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <AnnouncementBanner />
            <div className="container flex h-16 items-center mx-auto justify-between px-4">

                {/* --- LEFT SECTION: LOGO --- */}
                <div className="flex items-center gap-8">
                    <Link to="/" className="flex items-center space-x-2">
                        <GraduationCap className="h-8 w-8 text-primary" />
                        <span className="font-bold text-xl tracking-tight">Telusko</span>
                    </Link>

                    {/* DESKTOP NAV: Explore Courses */}
                    {!isLogin && <NavigationMenu className="hidden lg:flex">
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="hover:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent !bg-transparent">Explore Courses</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[600px] gap-3 p-4 md:grid-cols-2">
                                        <li className="row-span-3">
                                            <NavigationMenuLink asChild>
                                                <Link to="/bootcamps" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none">
                                                    <BookOpen className="h-6 w-6 text-primary" />
                                                    <div className="mb-2 mt-4 text-lg font-medium">Job Ready Bootcamps</div>
                                                    <p className="text-sm leading-tight text-muted-foreground">Intensive training programs designed to get you hired.</p>
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                        <ListItem to="/courses/live" icon="https://www.svgrepo.com/show/520494/video-course.svg" title="Recorded Classes">Life time access full purchase</ListItem>
                                        <ListItem to="/courses/free" icon="https://www.svgrepo.com/show/418658/free-price-tag.svg" title="Free Tutorials">1000+ hours of coding content.</ListItem>
                                        <ListItem to="/certificates" icon="https://www.svgrepo.com/show/210227/certificate-medal.svg" title="Certifications">Industry-recognized certificates.</ListItem>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>}
                </div>

                {/* --- CENTER SECTION: DESKTOP SEARCH & NAVIGATION --- */}
                <div className="hidden lg:flex items-center gap-4 flex-1 max-w-lg mx-8">


                    {!isLogin && <div className="hidden lg:block">
                        <NavigationMenu viewport={false}>
                            {/* ... existing Learning Paths and Specializations ... */}
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="hover:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent !bg-transparent">Learning Paths</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                            <li className="row-span-3">
                                                <NavigationMenuLink asChild>
                                                    <Link
                                                        className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                                                        to="/paths/beginner">
                                                        <div className="mt-4 mb-2 text-lg font-medium">Beginner to Pro</div>
                                                        <p className="text-muted-foreground text-sm leading-tight">
                                                            Guided roadmaps for those starting their journey from absolute zero.
                                                        </p>
                                                    </Link>
                                                </NavigationMenuLink>
                                            </li>
                                            <ListItem to="/paths/backend" title="Backend Architect">
                                                Master System Design, Scalability, and Server logic.
                                            </ListItem>
                                            <ListItem to="/paths/frontend" title="Frontend Specialist">
                                                Design stunning user interfaces with modern frameworks.
                                            </ListItem>
                                            <ListItem to="/paths/mobile" title="Mobile Dev">
                                                Build cross-platform apps with Flutter and React Native.
                                            </ListItem>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="hover:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent !bg-transparent">Specializations</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                            {courseCategories.map((course) => (
                                                <ListItem key={course.title} title={course.title} icon={course.icon} to={course.to}>
                                                    {course.description}
                                                </ListItem>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>}
                </div>


                {/* --- RIGHT SECTION: AUTH & MOBILE MENU --- */}
                <div className="flex items-center gap-2">
                    {/* <ToggleTheme /> */}
                    {!isLogin && <div className="items-center gap-2 hidden lg:flex">
                        <Button variant="ghost" asChild>
                            <Link to="/login">Log in</Link>
                        </Button>
                        <Button className="bg-primary" asChild>
                            <Link to="/signup">Join for Free</Link>
                        </Button>
                    </div>}

                    {/* MOBILE TRIGGER */}
                    {!isLogin && <div className="lg:hidden">
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
                                    </SheetTitle>
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
                                    <Link to="/enterprise" className="text-sm font-medium py-4">For Business <MoveUpRight className="inline w-4 h-4" /></Link>


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
                    </div>}

                    {
                        isLogin && <UserProfile />
                    }
                </div>
            </div>
        </header>
    );
}

const ListItem = React.forwardRef<
    HTMLAnchorElement,
    React.ComponentPropsWithoutRef<typeof Link> & { title: string, icon?: string }
>(({ className, title, icon, children, to, ...props }, ref) => (
    <li>
        <NavigationMenuLink asChild>
            <Link
                ref={ref}
                to={to}
                className={cn(
                    "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent",
                    className
                )}
                {...props}
            >
                {/* Container for the SVG icon */}
                <div className="mb-2 mr-2 flex h-12 w-12 items-center justify-center">
                    <img
                        src={icon}
                        alt={title}
                        className="h-full w-full object-contain"
                    />
                </div>

                {/* Title and Description */}

                <div>
                    <div className="text-sm font-medium leading-none mb-1">{title}</div>
                    <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                        {children}
                    </p>
                </div>

            </Link>
        </NavigationMenuLink>
    </li>
));
ListItem.displayName = "ListItem";
export default NavbarPresenter;









import { cn } from "@/lib/utils";
import { type User } from "@/features/auth/authApi";
import UserProfile from "./common/user-profile";
import { AnnouncementBanner } from "./announcement-banner";

