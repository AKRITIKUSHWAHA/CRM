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
  onClick,
}) => {
  if (isLoading) {
    return (
      <div className={cx('kpi-card', className)} style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1.25rem' }}>
        <Skeleton width="50%" height="12px" />
        <Skeleton width="40%" height="26px" style={{ margin: '8px 0' }} />
        <Skeleton width="60%" height="12px" />
      </div>
    );
  }

  const TrendIcon = changeType === 'positive' ? ArrowUpRight : changeType === 'negative' ? ArrowDownRight : Minus;
  
  const trendColor = changeType === 'positive'
    ? 'var(--success)'
    : changeType === 'negative'
    ? 'var(--error)'
    : 'var(--text-tertiary)';

  return (
    <div
      onClick={onClick}
      className={cx('kpi-card', className)}
      style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '10px',
        padding: '1.125rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '0.625rem',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        transition: 'all 0.15s ease',
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.borderColor = 'var(--primary-border)';
          e.currentTarget.style.boxShadow = '0 3px 8px 0 rgba(0, 0, 0, 0.05)';
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.borderColor = 'var(--border)';
          e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.03)';
        }
      }}
    >
      {/* Top Header: Label & Icon */}
      <div className="flex items-center justify-between">
        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {title}
        </span>
        {Icon && (
          <div
            style={{
              padding: '6px',
              borderRadius: '6px',
              backgroundColor: 'var(--surface-secondary)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Icon size={16} />
          </div>
        )}
      </div>

      {/* Primary Value */}
      <div
        style={{
          fontSize: '1.625rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-display)',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
        }}
      >
        {value}
      </div>

      {/* Contextual Growth Line */}
      {(change || changePeriod) && (
        <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
          {change && (
            <span
              className="inline-flex items-center font-bold"
              style={{ color: trendColor, fontSize: '12px' }}
            >
              <TrendIcon size={14} style={{ marginRight: '1px' }} />
              {change}
            </span>
          )}
          {changePeriod && (
            <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
              {changePeriod}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
