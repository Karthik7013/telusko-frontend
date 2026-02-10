
import {
    Breadcrumb,

} from "@/components/ui/breadcrumb";


export function DashboardBreadcrumb() {

    // const getBreadcrumbItems = () => {
    //     if (pathParts.length === 0) {
    //         return [
    //             {
    //                 title: "Dashboard",
    //                 url: "/dashboard",
    //                 icon: LayoutDashboard,
    //             }
    //         ];
    //     }

    //     const breadcrumbs = [
    //         {
    //             title: "Dashboard",
    //             url: "/dashboard",
    //             icon: LayoutDashboard,
    //         }
    //     ];

    //     if (pathParts.length === 1) {
    //         const firstLevel = DASHBOARD_NAV.find(item => item.url.includes(pathParts[0]));
    //         if (firstLevel) {
    //             breadcrumbs.push({
    //                 title: firstLevel.title,
    //                 url: firstLevel.url,
    //                 icon: firstLevel.icon,
    //             });
    //         }
    //     }

    //     return breadcrumbs;
    // };


    return (
        <Breadcrumb className="flex items-center gap-2 text-sm text-muted-foreground">

        </Breadcrumb>
    );
}
