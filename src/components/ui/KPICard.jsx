import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus, MoreVertical } from 'lucide-react';
import { Skeleton } from './Skeleton';
import { cx } from '../../utils/classNames';

export const KPICard = ({
  title,
  value,
  change,
  changeType = 'positive', // 'positive' | 'negative' | 'neutral'
  changePeriod = 'vs last 7 days',
  icon: Icon,
  iconBg = 'rgba(22, 163, 74, 0.1)',
  iconColor = '#16a34a',
  isLoading = false,
  className = '',
  onClick,
}) => {
  if (isLoading) {
    return (
      <div className={cx('kpi-card', className)} style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.25rem' }}>
        <Skeleton width="50%" height="12px" />
        <Skeleton width="40%" height="26px" style={{ margin: '8px 0' }} />
        <Skeleton width="60%" height="12px" />
      </div>
    );
  }

  const TrendIcon = changeType === 'positive' ? ArrowUpRight : changeType === 'negative' ? ArrowDownRight : Minus;

  return (
    <div
      onClick={onClick}
      className={cx('kpi-card', className)}
      style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '0.875rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.02)',
        transition: 'all 0.15s ease',
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
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
          e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.02)';
        }
      }}
    >
      {/* Top Header: Custom Color Icon & 3 Vertical Dots */}
      <div className="flex items-center justify-between">
        {Icon ? (
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: iconBg,
              color: iconColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Icon size={18} />
          </div>
        ) : <div />}

        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); }}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-tertiary)',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MoreVertical size={16} />
        </button>
      </div>

      {/* Label & Value */}
      <div className="flex flex-col gap-1">
        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            color: 'var(--text-tertiary)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {title}
        </span>
        <div
          style={{
            fontSize: '1.75rem',
            fontWeight: 800,
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-display)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {value}
        </div>
      </div>

      {/* Contextual Growth Green Pill Line */}
      {(change || changePeriod) && (
        <div className="flex items-center gap-2 text-xs">
          {change && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2px',
                padding: '2px 8px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(22, 163, 74, 0.1)',
                color: '#16a34a',
                fontSize: '11px',
                fontWeight: 700,
              }}
            >
              <TrendIcon size={12} />
              {change}
            </span>
          )}
          {changePeriod && (
            <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 500 }}>
              {changePeriod}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
