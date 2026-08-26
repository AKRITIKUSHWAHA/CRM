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
        <Skeleton width="60%" height="14px" />
        <Skeleton width="40%" height="28px" />
        <Skeleton width="70%" height="14px" />
      </div>
    );
  }

  const TrendIcon = changeType === 'positive' ? ArrowUpRight : changeType === 'negative' ? ArrowDownRight : Minus;
  const trendColor = changeType === 'positive' ? 'var(--success)' : changeType === 'negative' ? 'var(--error)' : 'var(--text-tertiary)';

  return (
    <div className={cx('kpi-card', className)}>
      <div className="flex items-center justify-between">
        <span className="kpi-title">{title}</span>
        {Icon && (
          <div
            style={{
              padding: '8px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--surface-secondary)',
              color: 'var(--primary)',
            }}
          >
            <Icon size={18} />
          </div>
        )}
      </div>

      <div className="kpi-value">{value}</div>

      {(change || changePeriod) && (
        <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
          {change && (
            <span className="flex items-center font-semibold" style={{ color: trendColor }}>
              <TrendIcon size={14} />
              {change}
            </span>
          )}
          {changePeriod && <span>{changePeriod}</span>}
        </div>
      )}
    </div>
  );
};
