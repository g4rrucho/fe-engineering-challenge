import BulkOperationsBar from '@/components/Pokedex/BulkOperationsBar';
import { Button } from '@/components/ui/button';

type PokedexSelectionControlProps = {
  isSelectionMode: boolean;
  selectedCount: number;
  totalCount: number;
  onToggleSelectionMode: () => void;
  onSelectAll: () => void;
  onDelete: () => void;
  onCancel: () => void;
};

const PokedexSelectionControl = ({
  isSelectionMode,
  selectedCount,
  totalCount,
  onToggleSelectionMode,
  onSelectAll,
  onDelete,
  onCancel,
}: PokedexSelectionControlProps) => {
  if (isSelectionMode) {
    return (
      <BulkOperationsBar
        selectedCount={selectedCount}
        totalCount={totalCount}
        onSelectAll={onSelectAll}
        onDelete={onDelete}
        onCancel={onCancel}
      />
    );
  }

  return (
    <div className="mb-4">
      <Button variant="outline" onClick={onToggleSelectionMode}>
        Select Pokémon
      </Button>
    </div>
  );
};

export default PokedexSelectionControl;
