import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

type PokedexResultsInfoProps = {
  filteredCount: number;
  totalCount: number;
  onExport?: () => void;
};

const PokedexResultsInfo = ({
  filteredCount,
  totalCount,
  onExport,
}: PokedexResultsInfoProps) => (
  <div className="mb-4 flex items-center justify-between">
    <div className="text-sm text-gray-600">
      {filteredCount !== totalCount ? (
        <>
          Showing {filteredCount} of {totalCount} Pokémon
        </>
      ) : (
        <>{totalCount} Pokémon in your Pokédex</>
      )}
    </div>
    {filteredCount > 0 && (
      <Button variant="outline" size="sm" onClick={onExport} className="gap-2">
        <Download className="h-4 w-4" />
        <span className="hidden sm:inline">Export CSV</span>
      </Button>
    )}
  </div>
);

export default PokedexResultsInfo;
