
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Menu, Search, X } from "lucide-react";

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
import { MobileMenu } from "@/components/features/MobileMenu";
import { NavbarItem } from "@/components/features/NavbarItem";
import { useState } from "react";
import { ToggleTheme } from "../common/ToggleTheme";


export function NavbarPresenter({
    isLogin
}: {
    isLogin: boolean,
    data?: User | undefined
}) {
    const [openMobileMenu, setOpenMobileMenu] = useState(false)
    const navigate = useNavigate();


    return (
        <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b">
            <AnnouncementBanner />
            <div className="container flex h-16 items-center mx-auto justify-between px-4 shrink-0">

                {/* --- LEFT SECTION: LOGO & NAVIGATION --- */}
                <div className="flex items-center gap-8">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="p-0.5 rounded-lg">
                            <GraduationCap className=" size-8 text-primary" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">Telusko</span>
                    </Link>
                    {!isLogin && <div className="hidden lg:block">
                        <NavigationMenu viewport={false}>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="hover:bg-transparent data-active:bg-transparent data-[state=open]:bg-transparent bg-transparent!">Learning Paths</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid gap-2 md:w-100 lg:w-125 lg:grid-cols-[.75fr_1fr]">
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
                                    <NavigationMenuTrigger className="hover:bg-transparent data-active:bg-transparent data-[state=open]:bg-transparent bg-transparent!">Specializations</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-100 gap-2 md:w-125 md:grid-cols-2 lg:w-150">
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

                {/* --- CENTER SECTION: DESKTOP SEARCH --- */}
                <div className="hidden md:flex items-center justify-center gap-4 flex-1">

                </div>

                {/* --- RIGHT SECTION: AUTH & MOBILE ICONS --- */}
                <div className="flex items-center gap-2">
                    <ToggleTheme />
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden text-muted-foreground"
                        onClick={() => navigate("/search")}
                    >
                        <Search className="h-5 w-5" />
                    </Button>
                    {!isLogin && <div className="lg:hidden flex-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative"
                            onClick={() => setOpenMobileMenu(!openMobileMenu)}
                        >
                            <Menu className={`h-5 w-5 transition-all duration-300 ${openMobileMenu ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"}`} />
                            <X className={`absolute h-5 w-5 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${openMobileMenu ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"}`} />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </div>}
                    {!isLogin && <div className="items-center gap-2 hidden lg:flex">
                        <Button variant="ghost" asChild>
                            <Link to="/auth/login">Log in</Link>
                        </Button>
                        <Button className="bg-primary" asChild>
                            <Link to="/auth/signup">Join for Free</Link>
                        </Button>
                    </div>}
                    {isLogin && <UserProfile />}
                </div>
            </div>

            {!isLogin &&
                <MobileMenu open={openMobileMenu}
                    onClose={setOpenMobileMenu}
                />}
        </header>
    );
}

export default NavbarPresenter;
