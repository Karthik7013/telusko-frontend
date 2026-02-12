import React from 'react';
import { Button } from '@/components/ui/button';

interface ApiErrorProps {
  error: string;
  onRetry?: () => void;
  className?: string;
}

export const ApiError: React.FC<ApiErrorProps> = ({ error, onRetry, className }) => {
  return (
    <div className={`p-6 bg-red-50 border border-red-200 rounded-lg ${className}`}>
      <div className="mb-4">
        <h3 className="text-red-600 font-semibold mb-2">Error</h3>
        <p className="text-sm text-red-800">{error}</p>
      </div>
      {onRetry && (
        <Button 
          onClick={onRetry}
          className="w-full"
        >
          Retry
        </Button>
      )}
    </div>
  );
};

export const ApiErrorWithDetails: React.FC<ApiErrorProps> = ({ error, onRetry, className }) => {
  return (
    <div className={`p-6 bg-red-50 border border-red-200 rounded-lg ${className}`}>
      <div className="mb-4">
        <h3 className="text-red-600 font-semibold mb-2">Error</h3>
        <p className="text-sm text-red-800">{error}</p>
      </div>
      {onRetry && (
        <Button 
          onClick={onRetry}
          className="w-full"
        >
          Retry
        </Button>
      )}
    </div>
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