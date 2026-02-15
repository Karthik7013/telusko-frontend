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
export function App() {
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
        ;
}

export default App;