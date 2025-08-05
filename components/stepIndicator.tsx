'use client';

import { cn } from '../lib/utils';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex flex-col items-center">
          <div
            className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center',
              index <= currentStep ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
            )}
          >
            {index + 1}
          </div>
          <span
            className={cn(
              'text-sm mt-2',
              index === currentStep ? 'font-medium text-primary' : 'text-gray-500'
            )}
          >
            {step}
          </span>
        </div>
      ))}
    </div>
  );
};