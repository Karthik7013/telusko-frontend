import { Link } from "react-router-dom";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu";

import { NAV_CATEGORIES as courseCategories } from "@/data/courses-data";
import { NavbarItem } from "@/components/layout/NavbarItem";

export function DesktopNav() {
    return (
        <div className="hidden lg:block">
            <NavigationMenu viewport={false}>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="hover:bg-transparent data-active:bg-transparent data-[state=open]:bg-transparent bg-transparent!">Learning Paths</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-2 md:w-100 lg:w-125 lg:grid-cols-[.75fr_1fr]">
                                <li className="row-span-3">
                                    <NavigationMenuLink asChild>
                                        <Link
                                            className="bg-primary from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                                            to="/paths/beginner">
                                            <div className="mt-4 mb-2 text-lg font-medium">Beginner to Pro</div>
                                            <p className="text-muted-foreground text-sm leading-tight">
                                                Guided roadmaps for those starting their journey from absolute zero.
                                            </p>
                                        </Link>
                                    </NavigationMenuLink>
                                </li>
                                <NavbarItem icon="https://www.svgrepo.com/show/452234/java.svg" to="/course/backend" title="Backend Architect">
                                    Master System Design, Scalability, and Server logic.
                                </NavbarItem>
                                <NavbarItem icon="https://www.svgrepo.com/show/452091/python.svg" to="/course/frontend" title="Frontend Specialist">
                                    Design stunning user interfaces with modern frameworks.
                                </NavbarItem>
                                <NavbarItem icon="https://www.svgrepo.com/show/353715/ethereum.svg" to="/course/mobile" title="Mobile Dev">
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
        </div>
    )
}
