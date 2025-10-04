import React from 'react';
import { AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type TPokemonDetailsCardErrorProps = {
  onRetry: () => void;
};

const PokemonDetailsCardError: React.FC<TPokemonDetailsCardErrorProps> = ({
  onRetry,
}) => {
  return (
    <Card className="m-4" data-testid="pokemon-details-error">
      <CardContent className="flex flex-col items-center gap-4 py-8">
        <div className="flex items-center gap-2 text-red-600">
          <AlertCircle className="h-6 w-6" />
          Error Loading Pokémon
        </div>
        <p className="text-center text-sm text-gray-500">
          Please check your internet connection and try again.
        </p>
        <Button
          onClick={onRetry}
          variant="default"
          data-testid="pokemon-details-retry-button"
        >
          Retry
        </Button>
      </CardContent>
    </Card>
  );
};

export default PokemonDetailsCardError;
