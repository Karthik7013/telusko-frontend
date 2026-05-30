import React from 'react';
import { Button } from '@/components/ui/button';
import { SearchAlert } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, description, action, className }) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
        {/* You can add an icon here */}
        <SearchAlert />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4 max-w-md">{description}</p>
      {action && (
        <Button onClick={action.onClick}>{action.label}</Button>
      )}
    </div>
  );
};

export const EmptyCourses: React.FC<{ onRefresh: () => void }> = ({ onRefresh }) => {
  return (
    <EmptyState
      title="No Courses Found"
      description="There are no courses available at the moment. Try again later or check your filters."
      action={{
        label: "Refresh",
        onClick: onRefresh
      }}
    />
  );
};

export const EmptySearch: React.FC<{ onClearSearch: () => void }> = ({ onClearSearch }) => {
  return (
    <EmptyState
      title="No Results Found"
      description="Your search didn't match any courses. Try different keywords or clear the search."
      action={{
        label: "Clear Search",
        onClick: onClearSearch
      }}
    />
  );
};

export const EmptyCategory: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <EmptyState
      title="No Courses in This Category"
      description="There are no courses available in this category. Try a different category."
      action={{
        label: "Back to Categories",
        onClick: onBack
      }}
    />
  );
};
