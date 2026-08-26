import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';
import { Select } from './Select';

export const Pagination = ({
  currentPage = 1,
  totalPages = 10,
  pageSize = 10,
  totalItems = 100,
  onPageChange,
  onPageSizeChange,
}) => {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="pagination">
      <div className="flex items-center gap-2 text-xs text-secondary">
        <span>Showing {startItem} to {endItem} of {totalItems} entries</span>
        {onPageSizeChange && (
          <div className="flex items-center gap-1 ml-4">
            <span>Rows:</span>
            <Select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              options={[10, 25, 50, 100]}
              style={{ height: '28px', padding: '0 0.5rem', fontSize: '12px' }}
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          isIconOnly
          icon={ChevronLeft}
          isDisabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
        />
        
        <span className="text-xs font-semibold px-2">
          Page {currentPage} of {totalPages}
        </span>

        <Button
          variant="outline"
          size="sm"
          isIconOnly
          icon={ChevronRight}
          isDisabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        />
      </div>
    </div>
  );
};
