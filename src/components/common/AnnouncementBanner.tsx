import { useState, useEffect } from "react"
import Cookies from "js-cookie";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight,X } from "lucide-react";

import { motion } from "framer-motion"
const BANNER_COOKIE_KEY = "OFFER_BANNER_DISMISSED";
export function AnnouncementBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const isBannerDismissed = Cookies.get(BANNER_COOKIE_KEY);
        if (!isBannerDismissed) {
            setIsVisible(true);
        }
    }, []);

    const handleDismiss = () => {
        setIsVisible(false);
        Cookies.set(BANNER_COOKIE_KEY, "true", { expires: 7, path: '/' });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="relative w-full bg-primary text-primary-foreground overflow-hidden"
                >
                    <div className="container mx-auto px-4 py-3 flex items-center justify-center gap-x-6">
                        <div className="flex items-center gap-x-3 text-sm font-medium">
                            🎉
                            <p>
                                <span className="font-bold">Limited Time Offer!</span>{" "}
                                Get 50% off on all Premium Masterclasses.
                            </p>
                            <Button variant={'secondary'} size="sm" asChild>
                                <a href="/courses">
                                    Enroll Now <ArrowRight className="ml-2 size-3" />
                                </a>
                            </Button>
                        </div>

                        <button
                            onClick={handleDismiss}
                            className="absolute right-4 p-1 rounded-full hover:bg-primary-foreground/10 transition-colors"
                            aria-label="Dismiss banner"
                        >
                            <X className="size-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}