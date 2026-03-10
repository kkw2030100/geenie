'use client';

import { ReactNode } from 'react';

interface NeoBadgeProps {
  children: ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info';
}

const variantClasses = {
  success: 'lux-badge-success',
  warning: 'lux-badge-warning',
  error: 'lux-badge-error',
  info: 'lux-badge-info',
};

export default function NeoBadge({ children, variant = 'info' }: NeoBadgeProps) {
  return (
    <span className={`lux-badge ${variantClasses[variant]}`}>
      {children}
    </span>
  );
}
