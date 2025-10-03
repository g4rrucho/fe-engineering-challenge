import { useCallback, useState } from 'react';

type TUseBulkSelectionsParams = {
  allItems: number[];
  onBulkDelete: (ids: number[]) => void;
};

type TUseBulkSelectionReturn = {
  selectedIDs: Set<number>;
  isSelectionMode: boolean;
  toggleSelection: (id: number) => void;
  toggleSelectAll: () => void;
  clearSelection: () => void;
  toggleSelectionMode: () => void;
  handleBulkDelete: () => void;
};

const useBulkSelection = ({
  allItems,
  onBulkDelete,
}: TUseBulkSelectionsParams): TUseBulkSelectionReturn => {
  const [selectedIDs, setSelectedIDs] = useState<Set<number>>(new Set());
  const [isSelectionMode, setIsSelectionMode] = useState<boolean>(false);

  const toggleSelection = useCallback((id: number) => {
    setSelectedIDs((prev) => {
      const next = new Set(prev);

      if (next.has(id)) next.delete(id);
      else next.add(id);

      return next;
    });
  }, []);

  const toggleSelectAll = useCallback(() => {
    if (selectedIDs.size === allItems.length) setSelectedIDs(new Set());
    else setSelectedIDs(new Set(allItems));
  }, [allItems, selectedIDs.size]);

  const clearSelection = useCallback(() => {
    setSelectedIDs(new Set());
  }, []);

  const toggleSelectionMode = useCallback(() => {
    setIsSelectionMode((prev) => !prev);
    setSelectedIDs(new Set());
  }, []);

  const handleBulkDelete = useCallback(() => {
    if (selectedIDs.size === 0) return;

    if (confirm('Are you sure you want to release the selected Pokémon?')) {
      onBulkDelete(Array.from(selectedIDs));
      setSelectedIDs(new Set());
      setIsSelectionMode(false);
    }
  }, [onBulkDelete, selectedIDs]);

  return {
    selectedIDs,
    isSelectionMode,
    toggleSelection,
    toggleSelectAll,
    clearSelection,
    toggleSelectionMode,
    handleBulkDelete,
  };
};

export default useBulkSelection;
