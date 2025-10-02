import { Button } from '@/components/ui/button';

type TPokemonDetailsCardErrorProps = {
  onRetry: () => void;
};

const PokemonDetailsCardError: React.FC<TPokemonDetailsCardErrorProps> = ({
  onRetry,
}) => {
  return (
    <div>
      <p>TODO pokemon details card error</p>
      <Button onClick={onRetry}>Retry</Button>
    </div>
  );
};

export default PokemonDetailsCardError;
