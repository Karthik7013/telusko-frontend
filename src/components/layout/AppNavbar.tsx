
import { Link } from "react-router-dom";
import { GraduationCap, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import { AnnouncementBanner } from "@/components/common/AnnouncementBanner";
import UserProfile from "@/dashboard/components/UserProfile";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { DesktopNav } from "@/components/layout/DesktopNav";
import { useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useAuthStatus } from "@/hooks/useAuthStatus";


export function AppNavbar() {
    const isMobile = useIsMobile();
    const isLogin = useAuthStatus();
    const [openMobileMenu, setOpenMobileMenu] = useState(false)
    return (
        <header className="sticky top-0 z-50 w-full bg-background/70 backdrop-blur-xl border-b border-border">
            <AnnouncementBanner />
            <div className="container flex h-16 items-center mx-auto justify-between px-4 shrink-0">
                {/* --- LEFT SECTION: LOGO & NAVIGATION --- */}
                <div className="flex items-center gap-8">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="p-0.5 rounded-lg">
                            <GraduationCap className=" size-8 text-primary" />
                        </div>
                        <span className="text-xl font-display tracking-tight">Telusko</span>
                    </Link>
                    <DesktopNav />
                </div>

                {/* --- RIGHT SECTION: AUTH & MOBILE ICONS --- */}
                <div className="flex items-center gap-2">
                    <div className="lg:hidden">
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
                    </div>
                    {/* visible = logout lg or above hide = loggedin or below lg */}
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


            {isMobile && < MobileMenu open={openMobileMenu}
                onClose={setOpenMobileMenu}
            />}
        </header>
    );
}
export default AppNavbar;


