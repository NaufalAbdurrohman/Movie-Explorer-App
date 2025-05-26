import React, { forwardRef } from 'react';
import styles from './Button.module.scss';
import clsx from 'clsx';

type ButtonProps = {
  children?: React.ReactNode;
  variant: 'primary' | 'secondary';
  className?: string;
  fullWidth?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, variant = 'primary', className, fullWidth = true, ...rest },
    ref
  ) => (
    <button
      ref={ref}
      className={clsx(
        styles.button,
        styles[variant],
        fullWidth && styles.fullWidth,
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
);

Button.displayName = 'Button';