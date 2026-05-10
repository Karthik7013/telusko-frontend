import React, { useState, useEffect } from "react";
import { Search, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ScrollingSearchProps {
    placeholders?: string[];
    className?: string;
}

const DEFAULT_PLACEHOLDERS = [
    "What do you want to learn today?",
    "Master Java Spring Boot",
    "Build stunning UIs with React",
    "Explore DevOps roadmaps",
];

export function ScrollingSearch({
    placeholders = DEFAULT_PLACEHOLDERS,
    className
}: ScrollingSearchProps) {
    const navigate = useNavigate();
    const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [placeholders.length]);

    return (
        <div
            onClick={() => navigate("/search")}
            className={cn(
                "relative w-full max-w-lg cursor-pointer group transition-all",
                className
            )}
        >
            {/* Search Icon */}
            <div className="absolute inset-y-0 left-4 flex items-center z-10 pointer-events-none">
                <Search className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>

            {/* Fake Input Div mimicking Shadcn Input style */}
            <div className="h-14 w-full flex items-center pl-12 pr-14 sm:pr-32 rounded-full border border-input bg-background/50 backdrop-blur-sm shadow-sm hover:border-primary/50 hover:bg-background transition-all overflow-hidden">
                <div className="relative h-6 w-full overflow-hidden">
                    <div
                        className="flex flex-col transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateY(-${currentPlaceholderIndex * 24}px)` }}
                    >
                        {placeholders.map((text, i) => (
                            <span
                                key={i}
                                className="h-6 flex items-center text-muted-foreground text-sm sm:text-base whitespace-nowrap"
                            >
                                {text}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Search Button */}
            <Button
                className="absolute right-1.5 top-1.5 h-11 w-11 sm:w-auto sm:px-6 rounded-full font-bold shadow-md hover:shadow-lg transition-all active:scale-95 z-20 p-0 sm:p-auto flex items-center justify-center"
            >
                <span className="hidden sm:inline">Search</span>
                <ArrowRight className="size-5 sm:size-4 sm:ml-2" />
            </Button>
        </div>
    );
}