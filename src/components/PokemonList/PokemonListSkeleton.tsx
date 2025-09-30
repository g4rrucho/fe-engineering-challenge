const PokemonListSkeleton: React.FC = () => (
  <div className="flex flex-col items-center gap-2 rounded-lg p-4 shadow-md">
    <div className="h-16 w-16 animate-pulse rounded bg-gray-300" />
    <div className="mb-1 h-4 w-3/4 animate-pulse rounded bg-gray-300" />
    <div className="h-3 w-1/2 animate-pulse rounded bg-gray-300" />
  </div>
);

export default PokemonListSkeleton;
