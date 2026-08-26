import React from 'react';
import { cx } from '../../utils/classNames';

export const Card = ({ children, className = '', ...props }) => (
  <div className={cx('surface-card', className)} {...props}>
    {children}
  </div>
);

export const CardHeader = ({ title, subtitle, action, className = '' }) => (
  <div
    className={cx('flex items-center justify-between p-4 border-b border-subtle', className)}
    style={{ borderBottom: '1px solid var(--border)' }}
  >
    <div>
      {title && <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>{title}</h4>}
      {subtitle && <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', margin: 0 }}>{subtitle}</p>}
    </div>
    {action && <div>{action}</div>}
  </div>
);

export const CardBody = ({ children, className = '' }) => (
  <div className={cx('p-4', className)}>{children}</div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div
    className={cx('p-4 border-t border-subtle flex items-center justify-end gap-2', className)}
    style={{ borderTop: '1px solid var(--border)', backgroundColor: 'var(--surface-secondary)' }}
  >
    {children}
  </div>
);
