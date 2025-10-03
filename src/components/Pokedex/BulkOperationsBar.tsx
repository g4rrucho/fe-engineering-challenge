import React, { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, X } from 'lucide-react';

type TBulkOperationsBarProps = {
  selectedCount: number;
  totalCount: number;
  onSelectAll: () => void;
  onDelete: () => void;
  onCancel: () => void;
};

const BulkOperationsBar: React.FC<TBulkOperationsBarProps> = ({
  selectedCount,
  totalCount,
  onSelectAll,
  onDelete,
  onCancel,
}) => {
  return (
    <div className="sticky top-0 z-10 mb-4 flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50 px-4 py-3">
      <div className="flex items-center gap-4">
        <span className="font-medium text-blue-900">
          {selectedCount} selected
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onSelectAll}
          className="text-blue-700 hover:text-blue-900"
        >
          {selectedCount === totalCount ? 'Deselect all' : 'Select all'}
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="destructive"
          size="sm"
          onClick={onDelete}
          disabled={selectedCount === 0}
          className="flex items-center justify-center gap-2"
        >
          <Trash2 className="h-4 w-4" />
          <span className="hidden sm:block">Delete</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={onCancel} className="gap-2">
          <X className="h-4 w-4" />
          <span className="hidden sm:block">Cancel</span>
        </Button>
      </div>
    </div>
  );
};

export default memo(BulkOperationsBar);
