import React from 'react';
import { cx } from '../../utils/classNames';

export const Tabs = ({ tabs = [], activeTab, onChange, className = '' }) => {
  return (
    <div className={cx('tabs-header', className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cx('tab-btn', isActive && 'tab-btn-active')}
          >
            {Icon && <Icon size={16} />}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                style={{
                  fontSize: '11px',
                  padding: '2px 6px',
                  borderRadius: '10px',
                  backgroundColor: isActive ? 'var(--primary-light)' : 'var(--surface-secondary)',
                  color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                  marginLeft: '4px',
                }}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
