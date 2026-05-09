import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import React from "react";

export const NavbarItem = React.forwardRef<
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
                <div className="mb-2 mr-2 flex h-12 w-12 items-center justify-center">
                    <img
                        src={icon}
                        alt={title}
                        className="h-full w-full object-contain"
                    />
                </div>
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
NavbarItem.displayName = "NavbarItem";
