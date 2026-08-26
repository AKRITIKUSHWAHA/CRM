import React from 'react';
import { EmptyState } from './EmptyState';
import { cx } from '../../utils/classNames';

export const Table = ({ children, className = '' }) => (
  <div className="table-container">
    <table className={cx('table', className)}>{children}</table>
  </div>
);

export const TableHeader = ({ children }) => <thead>{children}</thead>;

export const TableBody = ({ children, emptyMessage = 'No record data found.', isEmpty = false, colSpan = 5 }) => {
  if (isEmpty) {
    return (
      <tbody>
        <tr>
          <td colSpan={colSpan}>
            <EmptyState title="No Data Available" description={emptyMessage} />
          </td>
        </tr>
      </tbody>
    );
  }
  return <tbody>{children}</tbody>;
};

export const TableRow = ({ children, onClick, className = '' }) => (
  <tr
    onClick={onClick}
    className={cx(className)}
    style={{ cursor: onClick ? 'pointer' : 'default' }}
  >
    {children}
  </tr>
);

export const TableCell = ({ children, isHeader = false, align = 'left', className = '' }) => {
  const Tag = isHeader ? 'th' : 'td';
  return <Tag className={cx(className)} style={{ textAlign: align }}>{children}</Tag>;
};
