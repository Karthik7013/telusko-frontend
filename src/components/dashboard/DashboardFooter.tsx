import { Separator } from "@/components/ui/separator";
import {
    HelpCircle,
    BookOpen,
    FileText,
    Github,
    Linkedin,
    Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t bg-background">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Left: Copyright */}
                    <div className="text-sm text-muted-foreground text-center md:text-left">
                        <p>© {currentYear} Telusko Edutech Pvt Ltd. All rights reserved.</p>
                        <p className="text-xs mt-1">Version 1.0.0</p>
                    </div>

                    {/* Center: Quick Links */}
                    <div className="flex items-center gap-4 text-sm">
                        <Button variant="ghost" size="sm" className="h-8 px-3">
                            <HelpCircle className="size-4 mr-2" />
                            Help
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-3">
                            <BookOpen className="size-4 mr-2" />
                            Docs
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-3">
                            <FileText className="size-4 mr-2" />
                            Terms
                        </Button>
                    </div>

                    {/* Right: Social Links */}
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-red-50 hover:text-red-600 transition-colors">
                            <Youtube className="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-blue-50 hover:text-blue-700 transition-colors">
                            <Linkedin className="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-slate-100 hover:text-slate-900 transition-colors">
                            <Github className="size-4" />
                        </Button>
                    </div>
                </div>

                <Separator className="my-4" />

                <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
                    <p>Made with ❤️ in India</p>
                    <div className="flex gap-4">
                        <span className="hover:text-foreground cursor-pointer transition-colors">Privacy Policy</span>
                        <span className="hover:text-foreground cursor-pointer transition-colors">Cookie Settings</span>
                        <span className="hover:text-foreground cursor-pointer transition-colors">Status</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
