'use client';

import { ReactNode } from 'react';

interface NeoCardProps {
  children: ReactNode;
  accent?: string;
  className?: string;
  span?: 'sm' | 'md' | 'lg';
}

const spanClasses = {
  sm: '',
  md: 'md:col-span-2',
  lg: 'md:col-span-2 lg:col-span-3',
};

export default function NeoCard({ children, className = '', span = 'sm' }: NeoCardProps) {
  return (
    <div
      className={`
        glass-card
        p-6
        ${spanClasses[span]}
        ${className}
      `}
    >
      <div className="gold-accent-bar" />
      {children}
    </div>
  );
}
