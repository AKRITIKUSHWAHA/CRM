import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { Skeleton } from './Skeleton';
import { cx } from '../../utils/classNames';

export const KPICard = ({
  title,
  value,
  change,
  changeType = 'positive', // 'positive' | 'negative' | 'neutral'
  changePeriod = '',
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
        borderRadius: '14px',
        padding: '0.9rem 1rem',
        minHeight: '122px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-sm)',
        transition: 'all 0.2s ease',
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        boxSizing: 'border-box',
        minWidth: 0,
        width: '100%',
        gap: '0.35rem',
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.borderColor = 'var(--primary-border)';
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.borderColor = 'var(--border)';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        }
      }}
    >
      {/* Header Row: Title on Left, Icon on Right */}
      <div className="flex items-center justify-between gap-2 min-w-0">
        <span
          className="truncate"
          style={{
            fontSize: '11px',
            fontWeight: 700,
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          {title}
        </span>

        {Icon && (
          <div
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '8px',
              backgroundColor: iconBg,
              color: iconColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Icon size={15} />
          </div>
        )}
      </div>

      {/* Value */}
      <div
        className="truncate kpi-value"
        style={{
          fontSize: '1.35rem',
          fontWeight: 800,
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-display)',
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          margin: '2px 0',
        }}
      >
        {value}
      </div>

      {/* Contextual Growth Pill Line */}
      {(change || changePeriod) && (
        <div className="flex items-center gap-1.5 text-xs flex-wrap min-w-0">
          {change && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px',
                padding: '2px 7px',
                borderRadius: '9999px',
                backgroundColor: changeType === 'negative' ? 'rgba(220, 38, 38, 0.1)' : 'rgba(22, 163, 74, 0.1)',
                color: changeType === 'negative' ? 'var(--error)' : '#16a34a',
                fontSize: '11px',
                fontWeight: 700,
                whiteSpace: 'nowrap',
              }}
            >
              <TrendIcon size={11} />
              {change}
            </span>
          )}
          {changePeriod && (
            <span className="truncate" style={{ fontSize: '10.5px', color: 'var(--text-tertiary)', fontWeight: 500 }}>
              {changePeriod}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
