
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface OnboardingStepProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

const OnboardingStep: React.FC<OnboardingStepProps> = ({
  title,
  description,
  icon,
  isSelected,
  onClick,
}) => {
  return (
    <div
      className={`p-6 rounded-lg border ${
        isSelected
          ? "border-primary bg-primary/5"
          : "border-border bg-card"
      } cursor-pointer transition-colors`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      tabIndex={0}
      role="button"
      aria-selected={isSelected}
      aria-label={`View ${title} details`}
    >
      <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">
        {description}
      </p>
    </div>
  );
};

export default OnboardingStep;
