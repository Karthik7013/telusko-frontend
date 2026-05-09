import React from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, RefreshCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ApiErrorProps {
  error: string;
  onRetry?: () => void;
  className?: string;
  title?: string;
}

export const ApiError: React.FC<ApiErrorProps> = ({ error, onRetry, className, title = "Error" }) => {
  return (
    <Alert variant="destructive" className={cn("shadow-sm", className)}>
      <AlertCircle className="h-4 w-4" />
      <div className="flex w-full items-start justify-between gap-4">
        <div>
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription className="mt-1 opacity-90">{error}</AlertDescription>
        </div>
        {onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="h-8 shrink-0 bg-background/50 hover:bg-background"
          >
            <RefreshCcw className="mr-2 h-3.5 w-3.5" />
            Retry
          </Button>
        )}
      </div>
    </Alert>
  );
};

export const ApiErrorWithDetails: React.FC<ApiErrorProps> = ({ error, onRetry, className, title = "System Error" }) => {
  return (
    <Card className={cn("border-destructive/30 overflow-hidden", className)}>
      <CardHeader className="bg-destructive/5 space-y-1">
        <CardTitle className="text-destructive flex items-center gap-2 text-lg">
          <AlertCircle className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="details" className="border-none">
            <AccordionTrigger className="py-0 hover:no-underline font-medium text-sm text-muted-foreground">
              Technical details
            </AccordionTrigger>
            <AccordionContent className="pt-3">
              <div className="bg-muted text-muted-foreground font-mono text-xs p-3 rounded-md border">
                {error}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      {onRetry && (
        <CardFooter className="bg-muted/30 pt-4">
          <Button onClick={onRetry} className="w-full" variant="destructive">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export const NetworkError: React.FC<{ onRetry: () => void }> = ({ onRetry }) => {
  return (
    <ApiError
      error="Network error. Please check your connection and try again."
      onRetry={onRetry}
    />
  );
};

export const ServerError: React.FC<{ onRetry: () => void }> = ({ onRetry }) => {
  return (
    <ApiError
      error="Server error. Please try again later."
      onRetry={onRetry}
    />
  );
};

export const NotFoundError: React.FC = () => {
  return (
    <ApiError
      error="Resource not found."
    />
  );
};

export const UnknownError: React.FC<{ onRetry: () => void }> = ({ onRetry }) => {
  return (
    <ApiError
      error="An unexpected error occurred. Please try again."
      onRetry={onRetry}
    />
  );
};