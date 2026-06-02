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
import SessionInitializer from "@/providers/AuthProvider";
import logo from "@/assets/logo.svg";
import { useFavicon } from "@/hooks/useFavicon";

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
    useFavicon(logo, BRAND_COLOR);

    return (
        <ContextProvider>
            <ThemeProvider defaultTheme="dark" storageKey="app-theme">
                <SessionInitializer>
                    <ErrorBoundary>
                        <AppRouter />
                    </ErrorBoundary>
                    <Toaster icons={TOASTER_ICONS} richColors />
                </SessionInitializer>
            </ThemeProvider>
        </ContextProvider>
    )
}

export default App;