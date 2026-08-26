import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
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
      <div className={cx('kpi-card', className)} style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.75rem' }}>
        <Skeleton width="50%" height="10px" />
        <Skeleton width="40%" height="20px" style={{ margin: '6px 0' }} />
        <Skeleton width="60%" height="10px" />
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
        borderRadius: '10px',
        padding: '0.75rem 0.875rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '0.375rem',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.02)',
        transition: 'all 0.15s ease',
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        boxSizing: 'border-box',
        minWidth: 0,
        width: '100%',
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.borderColor = 'var(--primary-border)';
          e.currentTarget.style.boxShadow = '0 3px 8px 0 rgba(0, 0, 0, 0.04)';
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.borderColor = 'var(--border)';
          e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.02)';
        }
      }}
    >
      {/* Top Header: Custom Color Icon Only (No 3 dots button) */}
      <div className="flex items-center justify-between">
        {Icon ? (
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '7px',
              backgroundColor: iconBg,
              color: iconColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Icon size={14} />
          </div>
        ) : <div />}
      </div>

      {/* Label & Value */}
      <div className="flex flex-col gap-0.5">
        <span
          className="truncate"
          style={{
            fontSize: '10px',
            fontWeight: 700,
            color: 'var(--text-tertiary)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          {title}
        </span>
        <div
          style={{
            fontSize: '1.25rem',
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

      {/* Contextual Growth Pill Line */}
      {(change || changePeriod) && (
        <div className="flex items-center gap-1.5 text-xs flex-wrap">
          {change && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1px',
                padding: '1px 5px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(22, 163, 74, 0.1)',
                color: '#16a34a',
                fontSize: '10px',
                fontWeight: 700,
                whiteSpace: 'nowrap',
              }}
            >
              <TrendIcon size={11} />
              {change}
            </span>
          )}
          {changePeriod && (
            <span className="truncate" style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 500 }}>
              {changePeriod}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
