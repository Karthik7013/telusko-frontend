// import { Separator } from '@/components/ui/separator'
import { LoginForm } from '@/components/features/LoginForm'
import { GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { siGoogle } from "simple-icons";
import { SimpleIcon } from "@/components/common/simple-icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import LearningPana from "@/assets/Learning-pana.svg";

export function GoogleButton({ className, ...props }: React.ComponentProps<typeof Button>) {
    return (
        <Button variant="secondary" className={cn(className)} {...props}>
            <SimpleIcon icon={siGoogle} className="size-4" />
            Continue with Google
        </Button>
    );
}







export default function LoginV2() {
    return (
        <main>
            <div className="grid h-dvh justify-center p-2 lg:grid-cols-2">

                <div className="relative order-2 hidden h-full rounded-3xl overflow-hidden bg-primary lg:flex shadow-2xl">
                    <div className="relative z-10 flex flex-col h-full w-full from-primary via-primary/95 to-primary/90 backdrop-blur-sm">
                        {/* Header Section */}
                        <div className="pt-12 space-y-2 px-10 text-primary-foreground">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md border border-white/20 shadow-inner">
                                    <GraduationCap className="size-8 text-primary-foreground" />
                                </div>
                                <h1 className="font-bold text-3xl tracking-tight">{"Telusko"}</h1>
                            </div>
                            <p className="text-primary-foreground/80 font-medium pl-1 italic">Learn. Grow. Succeed. Repeat.</p>
                        </div>

                        {/* Hero Content */}
                        <div className="flex-1 flex items-center justify-center p-8 lg:p-16 overflow-hidden">
                            <div className="relative w-full max-w-lg max-h-[55vh] flex items-center justify-center">
                                <img
                                    src={LearningPana}
                                    alt="Learning Illustration"
                                    className="max-w-full max-h-full h-auto w-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] select-none pointer-events-none transition-transform duration-700 hover:scale-105"
                                />
                            </div>
                        </div>

                        {/* Footer Features */}
                        {/* <div className="pb-12 flex w-full justify-between px-10 gap-8">
                            <div className="flex-1 space-y-2 text-primary-foreground">
                                <div className="flex items-center gap-2">
                                    <BookOpen className="size-5 text-primary-foreground/90" />
                                    <h2 className="font-semibold text-lg">Start Learning</h2>
                                </div>
                                <p className="text-sm text-primary-foreground/70 leading-relaxed">
                                    Access 500+ premium courses mentored by expert instructors.
                                </p>
                            </div>
                            <Separator orientation="vertical" className="h-16 bg-primary-foreground/20" />
                            <div className="flex-1 space-y-2 text-primary-foreground">
                                <div className="flex items-center gap-2">
                                    <HelpCircle className="size-5 text-primary-foreground/90" />
                                    <h2 className="font-semibold text-lg">Support</h2>
                                </div>
                                <p className="text-sm text-primary-foreground/70 leading-relaxed">
                                    Need help? Our community support is available 24/7 to guide you.
                                </p>
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className="relative order-1 flex h-full">

                    <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-87.5">
                        <div className="space-y-2 text-center">
                            <h1 className="font-medium text-3xl">Welcome back</h1>
                            <p className="text-muted-foreground text-sm">Enter your credentials to access your learning dashboard.</p>
                        </div>
                        <div className="space-y-4 flex flex-col">
                            <GoogleButton className="w-full" />
                            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-border after:border-t">
                                <span className="relative z-10 bg-background px-2 text-muted-foreground">or continue with email</span>
                            </div>
                            <LoginForm />
                            <div className="text-muted-foreground text-sm">
                                Don&apos;t have an account?{" "}
                                <Link to="/signup" className="text-foreground font-medium hover:underline">
                                    Sign up free
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-5 flex w-full justify-between px-10">
                        <div className="text-sm text-muted-foreground">© 2026 Telusko Learning. All rights reserved.</div>
                    </div>
                </div>
            </div>
        </main>
    )
}
