
import { Link } from "react-router-dom";
import { BookOpen, GraduationCap } from "lucide-react";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

import { NAV_CATEGORIES as courseCategories } from "@/data/courses-data";
import { type User } from "@/features/auth/authApi";
import { AnnouncementBanner } from "@/components/common/AnnouncementBanner";
import UserProfile from "@/components/common/UserProfile";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { NavbarItem } from "@/components/layout/NavbarItem";


export function NavbarPresenter({
    isLogin
}: {
    isLogin: boolean,
    data: User | undefined
}) {

    return (
        <header className="fixed border-b top-0 z-50 w-full bg-background/10 backdrop-blur">
            <AnnouncementBanner />
            <div className="container flex h-16 items-center mx-auto justify-between px-4">

                {/* --- LEFT SECTION: LOGO & BRAND --- */}
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
                                        <NavbarItem to="/courses/live" icon="https://www.svgrepo.com/show/520494/video-course.svg" title="Recorded Classes">Life time access full purchase</NavbarItem>
                                        <NavbarItem to="/courses/free" icon="https://www.svgrepo.com/show/418658/free-price-tag.svg" title="Free Tutorials">1000+ hours of coding content.</NavbarItem>
                                        <NavbarItem to="/certificates" icon="https://www.svgrepo.com/show/210227/certificate-medal.svg" title="Certifications">Industry-recognized certificates.</NavbarItem>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>}
                </div>

                {/* --- CENTER SECTION: DESKTOP SEARCH & NAVIGATION --- */}
                <div className="hidden lg:flex items-center gap-4 flex-1 max-w-lg mx-8">
                    {/* Placeholder for Search Bar if needed later */}
                    {!isLogin && <div className="hidden lg:block">
                        <NavigationMenu viewport={false}>
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
                                            <NavbarItem to="/paths/backend" title="Backend Architect">
                                                Master System Design, Scalability, and Server logic.
                                            </NavbarItem>
                                            <NavbarItem to="/paths/frontend" title="Frontend Specialist">
                                                Design stunning user interfaces with modern frameworks.
                                            </NavbarItem>
                                            <NavbarItem to="/paths/mobile" title="Mobile Dev">
                                                Build cross-platform apps with Flutter and React Native.
                                            </NavbarItem>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="hover:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent !bg-transparent">Specializations</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                            {courseCategories.map((course) => (
                                                <NavbarItem key={course.title} title={course.title} icon={course.icon} to={course.to}>
                                                    {course.description}
                                                </NavbarItem>
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
                    {!isLogin && <div className="items-center gap-2 hidden lg:flex">
                        <Button variant="ghost" asChild>
                            <Link to="/login">Log in</Link>
                        </Button>
                        <Button className="bg-primary" asChild>
                            <Link to="/signup">Join for Free</Link>
                        </Button>
                    </div>}

                    {!isLogin && <div className="lg:hidden">
                        <MobileMenu />
                    </div>}

                    {isLogin && <UserProfile />}
                </div>
            </div>
        </header>
    );
}

export default NavbarPresenter;
