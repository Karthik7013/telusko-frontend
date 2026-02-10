
import { Link, useLocation } from "react-router-dom"
import { ChevronRight, type LucideIcon } from "lucide-react"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export default function NavMain({
    items,
}: {
    items: {
        title: string
        url: string
        icon?: LucideIcon
        isActive?: boolean
        items?: {
            title: string
            url: string
        }[]
    }[]
}) {
    const location = useLocation();

    const isActive = (url: string) => {
        return location.pathname === url || location.pathname.startsWith(url + '/');
    };

    const isExactMatch = (url: string) => {
        return location.pathname === url;
    };

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Learning Journey</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const active = item.isActive || isActive(item.url);
                    const exactActive = item.isActive || isExactMatch(item.url);
                    const hasSubItems = item.items && item.items.length > 0;

                    if (hasSubItems) {
                        const subItemActive = item.items?.some(subItem => isActive(subItem.url));
                        const shouldOpen = active || subItemActive;

                        return (
                            <SidebarMenuItem key={item.title}>
                                <Collapsible
                                    asChild
                                    defaultOpen={shouldOpen}
                                    className="group/collapsible"
                                >
                                    <>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton
                                                tooltip={item.title}
                                                className={`hover:bg-sidebar-accent ${shouldOpen ? 'bg-primary/10 hover:bg-primary/20 transition-colors' : ''}`}
                                            >
                                                {item.icon && <item.icon className="size-4" />}
                                                <span className="font-medium">{item.title}</span>
                                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.items!.map((subItem) => (
                                                    <SidebarMenuSubItem key={subItem.title}>
                                                        <SidebarMenuSubButton asChild>
                                                                <Link
                                                                    to={subItem.url}
                                                                    className={isExactMatch(subItem.url) ? 'bg-primary/10 hover:bg-primary/20 transition-colors' : ''}
                                                                >
                                                                    <span>{subItem.title}</span>
                                                                </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </>
                                </Collapsible>
                            </SidebarMenuItem>
                        );
                    }

                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                tooltip={item.title}
                                className={`hover:bg-sidebar-accent ${exactActive ? 'bg-sidebar-accent' : ''}`}
                            >
                                <Link to={item.url}>
                                    {item.icon && <item.icon className="size-4" />}
                                    <span className="font-medium">{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}