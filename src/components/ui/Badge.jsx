import React from 'react';
import { cx } from '../../utils/classNames';

export const Badge = ({
  children,
  variant = 'default', // 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'
  icon: Icon,
  className = '',
}) => {
  return (
    <span className={cx('badge', `badge-${variant}`, className)}>
      {Icon && <Icon size={12} />}
      <span>{children}</span>
    </span>
  );
};
