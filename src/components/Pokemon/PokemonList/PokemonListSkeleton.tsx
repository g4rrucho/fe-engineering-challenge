import { Card, CardContent } from '@/components/ui/card';

const PokemonListSkeleton: React.FC = () => (
  <Card className="py-2">
    <CardContent className="flex flex-col items-center justify-center px-4">
      <div className="h-16 w-16 animate-pulse rounded bg-gray-300" />
      <div className="mt-2">
        <div className="mb-1 h-4 w-20 animate-pulse rounded bg-gray-300" />{' '}
        <div className="h-3 w-16 animate-pulse rounded bg-gray-300" />{' '}
      </div>
    </CardContent>
  </Card>
);

export default PokemonListSkeleton;
