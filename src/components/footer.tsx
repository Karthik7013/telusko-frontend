import { Link } from "react-router-dom";
import {
    GraduationCap,
    Youtube,
    Linkedin,
    Github,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function FooterPresenter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-background">
            <div className="container mx-auto px-4">
                {/* Top Section: Newsletter */}
                <div className="py-12 border-b flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="max-w-md">
                        <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
                        <p className="text-muted-foreground text-sm">
                            Get the latest course updates, tech news, and coding tips delivered directly to your inbox.
                        </p>
                    </div>
                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input type="email" placeholder="Enter your email" className="bg-muted/50" />
                        <Button type="submit">Subscribe</Button>
                    </div>
                </div>

                {/* Middle Section: Links */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-12">
                    <div className="col-span-2 lg:col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <div className="bg-primary p-1.5 rounded-lg">
                                <GraduationCap className="size-6 text-primary-foreground" />
                            </div>
                            <span className="text-xl font-bold tracking-tight">Telusko</span>
                        </Link>
                        <p className="text-muted-foreground text-sm max-w-xs mb-6">
                            Empowering learners globally with logic-based coding education.
                            Making complex technology simple since 2014.
                        </p>
                        <div className="flex gap-4">
                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-red-50 hover:text-red-600 transition-colors">
                                <Youtube className="size-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-blue-50 hover:text-blue-700 transition-colors">
                                <Linkedin className="size-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100 hover:text-slate-900 transition-colors">
                                <Github className="size-5" />
                            </Button>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-primary">Courses</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/courses/123" className="text-muted-foreground hover:text-foreground transition-colors">Java Masterclass</Link></li>
                            <li><Link to="/courses/python" className="text-muted-foreground hover:text-foreground transition-colors">Python for Beginners</Link></li>
                            <li><Link to="/courses/dsa" className="text-muted-foreground hover:text-foreground transition-colors">Data Structures</Link></li>
                            <li><Link to="/courses/spring" className="text-muted-foreground hover:text-foreground transition-colors">Spring Boot</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-primary">Platform</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
                            <li><Link to="/careers" className="text-muted-foreground hover:text-foreground transition-colors">Careers</Link></li>
                            <li><Link to="/affiliate" className="text-muted-foreground hover:text-foreground transition-colors">Affiliate Program</Link></li>
                            <li><Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Tech Blog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-primary">Support</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/help" className="text-muted-foreground hover:text-foreground transition-colors">Help Center</Link></li>
                            <li><Link to="/community" className="text-muted-foreground hover:text-foreground transition-colors">Discord Community</Link></li>
                            <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact Support</Link></li>
                            <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section: Copyright */}
                <div className="border-t py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>© {currentYear} Telusko Edutech Pvt Ltd. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link to="/terms" className="hover:text-foreground underline-offset-4 hover:underline">Terms</Link>
                        <Link to="/cookies" className="hover:text-foreground underline-offset-4 hover:underline">Cookies</Link>
                        <span className="flex items-center gap-1 cursor-default">
                            Made in India 🇮🇳
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}