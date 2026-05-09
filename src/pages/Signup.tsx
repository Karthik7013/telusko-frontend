import { SignupForm } from '@/components/features/SignupForm'
import { GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { GoogleButton } from './Login'
import LearningPana from "@/assets/Learning-pana.svg";

export default function SignupV2() {
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
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative order-1 flex h-full">

                    <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-87.5">
                        <div className="space-y-2 text-center">
                            <h1 className="font-medium text-3xl">Create Account</h1>
                            <p className="text-muted-foreground text-sm">Create your account to access your learning dashboard.</p>
                        </div>
                        <div className="space-y-4 flex flex-col">
                            <GoogleButton className="w-full" aria-label="Sign in with Google" />
                            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-border after:border-t">
                                <span className="relative z-10 bg-background px-2 text-muted-foreground">or continue with email</span>
                            </div>
                            <SignupForm />
                            <div className="text-muted-foreground text-sm">
                                Already have an account?{" "}
                                <Link to="/login" className="text-foreground font-medium hover:underline">
                                    Sign in
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