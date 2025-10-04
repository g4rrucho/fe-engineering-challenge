import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';

import usePokedex from '@/hooks/usePokedex';
import { generateShareUrl, TSharedPokemonData } from '@/utils/shareUtils';

import { Button } from '@/components/ui/button';

type TShareButtonProps = {
  pokemonId: number;
  isVisible?: boolean;
};

const ShareButton: React.FC<TShareButtonProps> = ({
  pokemonId,
  isVisible = true,
}) => {
  const [copied, setCopied] = useState(false);
  const { getPokemonCaught } = usePokedex();

  const handleShare = () => {
    const pokemonCaught = getPokemonCaught(pokemonId);
    const pokemonData: TSharedPokemonData = {
      caught: !!pokemonCaught,
      notes: pokemonCaught?.notes,
      caughtAt: pokemonCaught?.caughtAt,
    };
    const shareUrl = generateShareUrl(pokemonId, pokemonData);

    void navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((error) => {
        console.error('Failed to copy to clipboard:', error);
      });
  };

  if (!isVisible) return null;

  return (
    <Button
      variant="outline"
      onClick={handleShare}
      className="gap-2"
      data-testid="share-button"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          Copied!
        </>
      ) : (
        <>
          <Share2 className="h-4 w-4" />
          Share
        </>
      )}
    </Button>
  );
};

export default ShareButton;
