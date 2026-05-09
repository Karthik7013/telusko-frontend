import React, { Component } from 'react';
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error('Uncaught error:', error, errorInfo);
  }

  public resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback;
      if (FallbackComponent) {
        return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
      }
      return (
        <div className="flex items-center justify-center p-6 min-h-75">
          <Card className="w-full max-w-lg border-destructive/50 shadow-sm">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <AlertCircle className="size-6" />
              </div>
              <div className="grid gap-1">
                <CardTitle>Something went wrong</CardTitle>
                <CardDescription>The application encountered an unexpected error.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-muted text-muted-foreground rounded-md p-4 text-xs font-mono overflow-auto max-h-37.5">
                {this.state.error.message}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="destructive" onClick={this.resetError} className="w-full">
                Try again
              </Button>
            </CardFooter>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}