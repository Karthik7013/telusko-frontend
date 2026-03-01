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

import AppRouter from "@/router/app-router";
import ContextProvider from "@/providers/ContextProvider";
import AuthProvider from "@/providers/AuthProvider";
import logo from "@/assets/logo.svg";

export function App() {
    useEffect(() => {
        let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
        }
        link.href = logo;
        link.type = 'image/svg+xml';
        const meta = document.querySelector("meta[name='theme-color']");
        if (meta) {
            const oldColor = meta.getAttribute("content");
            meta.setAttribute("content", "#d87757");
            return () => {
                if (oldColor) meta.setAttribute("content", oldColor);
            };
        } else {
            const newMeta = document.createElement('meta');
            newMeta.name = 'theme-color';
            newMeta.content = '#d87757';
            document.head.appendChild(newMeta);
            return () => {
                document.head.removeChild(newMeta);
            };
        }
    }, []);
    return (
        <ContextProvider>
            <ThemeProvider defaultTheme="light" storageKey="app-theme">
                <AuthProvider>
                    <Toaster
                        icons={{
                            success: <CheckCircle2 className="size-4" />,
                            error: <AlertCircle className="size-4" />,
                            info: <Info className="size-4" />,
                            warning: <AlertTriangle className="size-4" />,
                            loading: <Loader2 className="size-4 animate-spin" />,
                            close: <X className="size-4" />,
                        }}
                        richColors
                    />
                    <AppRouter />
                </AuthProvider>
            </ThemeProvider>
        </ContextProvider>
    )
}

export default App;