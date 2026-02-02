import { LayoutDashboard, BookOpen, Heart, ReceiptText, Settings } from "lucide-react";

export const DASHBOARD_NAV = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        isActive: true,
    },
    {
        title: "My Courses",
        url: "/dashboard/my-learnings",
        icon: BookOpen,
    },
    {
        title: "Wishlist",
        url: "/dashboard/whishlist",
        icon: Heart,
    },
    {
        title: "Transactions",
        url: "/dashboard/transactions",
        icon: ReceiptText,
    },
    {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
    }
];
