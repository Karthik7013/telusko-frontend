import type { NavItem } from "@/types/navigation";
import { LayoutDashboard, BookOpen, Heart, ReceiptText, Settings, Search } from "lucide-react";

export const DASHBOARD_NAV: NavItem[] = [
    {
        title: "Browse Courses",
        url: "/search",
        icon: Search,
        visible: ["student"]
    },
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        visible: ["student"]

    },
    {
        title: "My Courses",
        url: "/dashboard/my-learnings",
        icon: BookOpen,
        visible: ["student"]
    },
    {
        title: "Wishlist",
        url: "/dashboard/wishlist",
        icon: Heart,
        visible: ["student"]
    },
    {
        title: "Transactions",
        url: "/dashboard/transactions",
        icon: ReceiptText,
        visible: ["student"]
    },
    {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
        visible: ["student"]
    }
];
