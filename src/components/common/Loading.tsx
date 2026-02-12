import React from 'react';
import { Spinner } from '@/components/ui/spinner';

interface LoadingProps {
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({ className }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Spinner className="size-4 text-blue-600" />
      <span className="ml-2 text-sm text-muted-foreground">Loading...</span>
    </div>
  );
};

export const LoadingCard: React.FC<LoadingProps> = ({ className }) => {
  return (
    <div className={`p-6 bg-muted rounded-lg ${className}`}>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Spinner className="size-4 text-blue-600" />
          <span className="text-sm text-muted-foreground">Loading...</span>
        </div>
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-2/3" />
        <div className="h-4 bg-muted rounded w-1/2" />
      </div>
    </div>
  );
};

export const LoadingSkeleton: React.FC<LoadingProps> = ({ className }) => {
  return (
    <div className={`p-6 bg-muted rounded-lg ${className}`}>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Spinner className="size-4 text-blue-600" />
          <span className="text-sm text-muted-foreground">Loading...</span>
        </div>
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-2/3" />
        <div className="h-4 bg-muted rounded w-1/2" />
      </div>
    </div>
  );
};