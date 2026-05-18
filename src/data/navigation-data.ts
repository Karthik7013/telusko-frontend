import { NavItem } from "@/dashboard/components/NavMain";
import { LayoutDashboard, BookOpen, Heart, ReceiptText, Settings } from "lucide-react";

export const DASHBOARD_NAV: NavItem[] = [
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
        url: "/dashboard/whishlist",
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
