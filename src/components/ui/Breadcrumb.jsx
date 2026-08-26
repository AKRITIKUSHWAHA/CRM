import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Breadcrumb = ({ items = [] }) => {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-secondary mb-2" aria-label="Breadcrumb">
      <Link to="/" className="flex items-center gap-1 hover:text-primary">
        <Home size={14} />
      </Link>

      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            <ChevronRight size={12} className="text-tertiary" />
            {isLast || !item.href ? (
              <span className="font-semibold text-primary">{item.label}</span>
            ) : (
              <Link to={item.href} className="hover:text-primary">
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
