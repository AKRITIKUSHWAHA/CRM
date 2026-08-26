import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { Skeleton } from './Skeleton';
import { cx } from '../../utils/classNames';

export const KPICard = ({
  title,
  value,
  change,
  changeType = 'positive', // 'positive' | 'negative' | 'neutral'
  changePeriod = 'vs last month',
  icon: Icon,
  isLoading = false,
  className = '',
}) => {
  if (isLoading) {
    return (
      <div className={cx('kpi-card', className)}>
        <Skeleton width="60%" height="12px" />
        <Skeleton width="40%" height="22px" />
        <Skeleton width="70%" height="12px" />
      </div>
    );
  }

  const TrendIcon = changeType === 'positive' ? ArrowUpRight : changeType === 'negative' ? ArrowDownRight : Minus;
  const trendColor = changeType === 'positive' ? 'var(--success)' : changeType === 'negative' ? 'var(--error)' : 'var(--text-tertiary)';

  return (
    <div
      className={cx('kpi-card', className)}
      style={{
        padding: '0.875rem 1rem',
        gap: '0.375rem',
      }}
    >
      <div className="flex items-center justify-between">
        <span className="kpi-title" style={{ fontSize: '11px', letterSpacing: '0.04em' }}>{title}</span>
        {Icon && (
          <div
            style={{
              padding: '6px',
              borderRadius: 'var(--radius-xs)',
              backgroundColor: 'var(--surface-secondary)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon size={15} />
          </div>
        )}
      </div>

      <div className="kpi-value" style={{ fontSize: '1.35rem', fontWeight: 700, margin: '2px 0' }}>{value}</div>

      {(change || changePeriod) && (
        <div className="flex items-center gap-1 text-xs" style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
          {change && (
            <span className="flex items-center font-semibold" style={{ color: trendColor }}>
              <TrendIcon size={13} />
              {change}
            </span>
          )}
          {changePeriod && <span className="text-tertiary">{changePeriod}</span>}
        </div>
      )}
    </div>
  );
};
