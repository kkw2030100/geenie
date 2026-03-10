'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface NeoButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
}

const variantClasses = {
  primary: 'lux-button',
  secondary: 'lux-button-secondary',
  danger: 'lux-button-danger',
};

export default function NeoButton({ children, variant = 'primary', className = '', ...props }: NeoButtonProps) {
  return (
    <button
      className={`
        px-5 py-2.5
        font-semibold uppercase text-sm tracking-wider
        ${variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
