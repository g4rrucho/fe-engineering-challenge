import { Card, CardContent, CardHeader } from '@/components/ui/card';

const PokemonDetailsCardSkeleton = () => {
  return (
    <Card className="m-4" data-testid="pokemon-details-skeleton">
      <CardHeader>
        {/* Header Section with Image and Basic Info */}
        <div className="mb-8 flex flex-col items-center gap-2 sm:gap-8 md:flex-row md:gap-2">
          {/* Pokemon Image Skeleton */}
          <div className="flex-shrink-0">
            <div className="h-24 w-24 animate-pulse rounded-full bg-gray-300 sm:h-48 sm:w-48" />
          </div>

          {/* Basic Info Skeleton */}
          <div className="flex flex-col items-center gap-2 text-center">
            {/* Name */}
            <div className="h-10 w-48 animate-pulse rounded bg-gray-300" />
            {/* ID */}
            <div className="h-7 w-24 animate-pulse rounded bg-gray-300" />
            {/* Types */}
            <div className="mt-2 flex gap-2">
              <div className="h-8 w-20 animate-pulse rounded-full bg-gray-300" />
              <div className="h-8 w-20 animate-pulse rounded-full bg-gray-300" />
            </div>
          </div>

          {/* Buttons Skeleton */}
          <div className="mt-4 flex flex-col gap-2 md:ml-auto md:flex-row">
            <div className="h-10 w-32 animate-pulse rounded bg-gray-300" />
            <div className="h-10 w-24 animate-pulse rounded bg-gray-300" />
          </div>
        </div>

        {/* Physical Stats Skeleton */}
        <div className="mb-4 grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center gap-2">
            <div className="h-4 w-16 animate-pulse rounded bg-gray-300" />
            <div className="h-6 w-20 animate-pulse rounded bg-gray-300" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="h-4 w-16 animate-pulse rounded bg-gray-300" />
            <div className="h-6 w-20 animate-pulse rounded bg-gray-300" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="h-4 w-24 animate-pulse rounded bg-gray-300" />
            <div className="h-6 w-20 animate-pulse rounded bg-gray-300" />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Base Stats Skeleton */}
        <div className="space-y-4">
          <div className="h-6 w-32 animate-pulse rounded bg-gray-300" />
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="h-4 w-32 animate-pulse rounded bg-gray-300" />
              <div className="h-4 flex-1 animate-pulse rounded bg-gray-300" />
              <div className="h-4 w-12 animate-pulse rounded bg-gray-300" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PokemonDetailsCardSkeleton;
