import * as React from 'react';
import { cn } from '@/lib/utils';

export interface GradientTextProps {
  children: React.ReactNode;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p';
  gradient?: 'primary' | 'secondary';
  className?: string;
}

const gradientClasses = {
  primary: 'bg-gradient-to-r from-accent-primary to-accent-secondary',
  secondary: 'bg-gradient-to-r from-accent-secondary to-accent-primary',
};

export function GradientText({ children, as: Component = 'span', gradient = 'primary', className }: GradientTextProps) {
  return <Component className={cn('bg-clip-text text-transparent', gradientClasses[gradient], className)}>{children}</Component>;
}
