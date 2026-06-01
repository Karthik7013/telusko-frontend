import { useEffect } from "react";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import {
    CheckCircle2,
    AlertCircle,
    Info,
    Loader2,
    AlertTriangle,
    X
} from "lucide-react";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import AppRouter from "@/router/app-router";
import ContextProvider from "@/providers/ContextProvider";
import AuthProvider from "@/providers/AuthProvider";
import logo from "@/assets/logo.svg";

const BRAND_COLOR = "#d87757";

const TOASTER_ICONS = {
    success: <CheckCircle2 className="size-4" />,
    error: <AlertCircle className="size-4" />,
    info: <Info className="size-4" />,
    warning: <AlertTriangle className="size-4" />,
    loading: <Loader2 className="size-4 animate-spin" />,
    close: <X className="size-4" />,
};

export function App() {
    useEffect(() => {
        // Update Favicon
        let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
        }
        link.href = logo;
        link.type = 'image/svg+xml';

        // Update Theme Color
        const meta = document.querySelector("meta[name='theme-color']");
        if (meta) {
            const oldColor = meta.getAttribute("content");
            meta.setAttribute("content", BRAND_COLOR);
            return () => {
                if (oldColor) meta.setAttribute("content", oldColor);
            };
        } else {
            const newMeta = document.createElement('meta');
            newMeta.name = 'theme-color';
            newMeta.content = BRAND_COLOR;
            document.head.appendChild(newMeta);
            return () => {
                document.head.removeChild(newMeta);
            };
        }
    }, []);

    return (
        <ContextProvider>
            <ThemeProvider defaultTheme="dark" storageKey="app-theme">
                <AuthProvider>
                    <ErrorBoundary>
                        <AppRouter />
                    </ErrorBoundary>
                    <Toaster icons={TOASTER_ICONS} richColors />
                </AuthProvider>
            </ThemeProvider>
        </ContextProvider>
    )
}

export default App;