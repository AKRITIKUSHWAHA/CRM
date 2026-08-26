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
  badgeText,
  isLoading = false,
  className = '',
  onClick,
}) => {
  if (isLoading) {
    return (
      <div className={cx('kpi-card', className)}>
        <Skeleton width="60%" height="14px" />
        <Skeleton width="40%" height="24px" />
        <Skeleton width="70%" height="14px" />
      </div>
    );
  }

  const TrendIcon = changeType === 'positive' ? ArrowUpRight : changeType === 'negative' ? ArrowDownRight : Minus;
  
  const trendBg = changeType === 'positive'
    ? 'rgba(22, 163, 74, 0.08)'
    : changeType === 'negative'
    ? 'rgba(220, 38, 38, 0.08)'
    : 'var(--surface-secondary)';

  const trendColor = changeType === 'positive'
    ? '#16a34a'
    : changeType === 'negative'
    ? '#dc2626'
    : 'var(--text-tertiary)';

  return (
    <div
      onClick={onClick}
      className={cx('kpi-card', className)}
      style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: '1.125rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '0.75rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.03)',
        transition: 'all 0.15s ease',
        cursor: onClick ? 'pointer' : 'default',
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.borderColor = 'var(--primary-border)';
          e.currentTarget.style.boxShadow = '0 4px 12px 0 rgba(0, 0, 0, 0.05)';
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.borderColor = 'var(--border)';
          e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.03)';
        }
      }}
    >
      <div className="flex items-center justify-between">
        <span
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </span>
        {Icon && (
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '9px',
              backgroundColor: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Icon size={17} />
          </div>
        )}
      </div>

      <div
        style={{
          fontSize: '1.5rem',
          fontWeight: 800,
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-display)',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
        }}
      >
        {value}
      </div>

      <div className="flex items-center justify-between gap-2" style={{ fontSize: '12px' }}>
        {change && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '2px',
              padding: '2px 7px',
              borderRadius: '9999px',
              backgroundColor: trendBg,
              color: trendColor,
              fontWeight: 600,
              fontSize: '11px',
            }}
          >
            <TrendIcon size={13} />
            <span>{change}</span>
          </div>
        )}

        {changePeriod && (
          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 500 }}>
            {changePeriod}
          </span>
        )}

        {badgeText && (
          <span
            style={{
              fontSize: '10px',
              fontWeight: 600,
              padding: '2px 6px',
              borderRadius: '4px',
              backgroundColor: 'var(--surface-secondary)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border)',
            }}
          >
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
};
