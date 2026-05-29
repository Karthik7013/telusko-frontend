import { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
const ACCEPT_ACCEPT_BANNER_DISMISSED = 'ACCEPT_ACCEPT_BANNER_DISMISSED'
export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const isBannerDismissed = Cookies.get(ACCEPT_ACCEPT_BANNER_DISMISSED);
        if (!isBannerDismissed) {
            setIsVisible(true);
        }
    }, []);

    const declineCookies = () => {
        Cookies.set('ACCEPT_ACCEPT_BANNER_DISMISSED', 'ACCEPT_ACCEPT_BANNER_DISMISSED')
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed max-w-96 bottom-4 right-4 z-100 md:left-auto md:right-8 md:max-w-sm animate-in slide-in-from-bottom-10 duration-500">
            <div className="bg-card border shadow-2xl rounded-2xl p-4 relative overflow-hidden">
                {/* Subtle background decoration */}

                <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-1 rounded-lg shrink-0">
                        <Cookie className="size-6 text-primary" />
                    </div>

                    <div className="space-y-1">
                        <h4 className="font-bold text-sm">We use cookies</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            We use cookies to enhance your learning experience, analyze site traffic,
                            and serve personalized content. By clicking "Accept", you agree to our
                            <a href="/privacy" className="text-primary hover:underline ml-1">Privacy Policy</a>.
                        </p>
                    </div>

                    <button
                        onClick={() => setIsVisible(false)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <X className="size-4" />
                    </button>
                </div>

                <div className="mt-2 flex flex-col lg:flex-col gap-1">
                    <Button onClick={() => { }} className="w-full text-xs">
                        Accept All
                    </Button>
                    <Button
                        onClick={declineCookies}
                        variant="destructive"
                        className="w-full text-xs"
                    >
                        Reject
                    </Button>
                </div>
            </div>
        </div>
    );
}