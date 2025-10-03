type PokedexResultsInfoProps = {
  filteredCount: number;
  totalCount: number;
};

const PokedexResultsInfo = ({
  filteredCount,
  totalCount,
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
  </div>
);

export default PokedexResultsInfo;
