import React, { useMemo } from 'react';

export interface BadgeProps {
  className?: string;
  size?: 'normal' | 'large';
  color?:
    | 'default'
    | 'dark'
    | 'gold'
    | 'light-gold'
    | 'silver'
    | 'bronze'
    | 'dark-green';
  disabled?: boolean;
  children: React.ReactNode;
}

function Badge({
  className,
  size = 'normal',
  color = 'default',
  disabled = false,
  children,
}: BadgeProps): JSX.Element {
  const textSize = useMemo(() => {
    switch (size) {
      case 'normal':
        return 'text-xs';
      case 'large':
        return 'text-sm';
    }
  }, [size]);

  const fontWeight = useMemo(() => {
    switch (size) {
      case 'normal':
        return 'font-semibold';
      case 'large':
        return 'font-medium';
    }
  }, [size]);

  const bgColor = useMemo(() => {
    switch (color) {
      case 'default':
        return 'bg-blue-100';
      case 'dark':
        return 'bg-gray-700';
      case 'gold':
        return 'bg-gold-400';
      case 'light-gold':
        return 'bg-gold-200';
      case 'silver':
        return 'bg-zinc-400';
      case 'bronze':
        return 'bg-yellow-700';
      case 'dark-green':
        return 'bg-green-600';
    }
  }, [color]);

  const textColor = useMemo(() => {
    switch (color) {
      case 'default':
        return 'text-blue-800';
      case 'dark':
        return 'text-gray-300';
      case 'gold':
        return 'text-slate-800';
      case 'light-gold':
        return 'text-slate-800';
      case 'silver':
        return 'text-white';
      case 'bronze':
        return 'text-white';
      case 'dark-green':
        return 'text-white';
    }
  }, [color]);

  const opacity = disabled ? 'opacity-50' : 'opacity-100';

  return (
    <span
      className={`${className || ''} ${bgColor} ${textColor} ${textSize}
      ${fontWeight} ${opacity} rounded px-2.5 py-0.5`}
    >
      {children}
    </span>
  );
}

export default Badge;
