import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

type TPokemonCardErrorProps = {
  onRetry: () => void;
  message?: string;
};

const PokemonCardError: React.FC<TPokemonCardErrorProps> = ({
  onRetry,
  message = 'Failed to load',
}) => (
  <Card className="h-32 py-2" data-testid="pokemon-card-error">
    <CardContent className="flex flex-col items-center justify-center px-4 gap-2">
      <AlertCircle className="h-8 w-8 text-red-500" />
      <p className="text-sm text-gray-600">{message}</p>
      <Button
        variant="outline"
        size="sm"
        onClick={onRetry}
        data-testid="pokemon-card-retry-button"
      >
        Retry
      </Button>
    </CardContent>
  </Card>
);

export default PokemonCardError;
