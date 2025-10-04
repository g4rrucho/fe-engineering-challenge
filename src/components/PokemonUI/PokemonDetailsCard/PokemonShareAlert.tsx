import React from 'react';
import { Check, Share2 } from 'lucide-react';

import { formatDateString } from '@/utils/formatDateString';
import { TSharedPokemonData } from '@/utils/shareUtils';

type TPokemonShareAlertProps = {
  sharedData?: TSharedPokemonData;
  isShared?: boolean;
};

const PokemonShareAlert: React.FC<TPokemonShareAlertProps> = ({
  sharedData,
  isShared,
}) => {
  if (!isShared) return null;

  return (
    <div
      className="mb-2 flex flex-col items-center justify-center rounded-lg bg-blue-50 p-3"
      data-testid="shared-alert"
    >
      <div className="flex gap-2">
        <Share2 className="h-5 w-5 text-blue-600" />
        <span className="text-sm font-medium text-blue-600">
          Shared Pokémon
        </span>
      </div>

      {sharedData?.caughtAt && (
        <div
          className="mt-4 w-full rounded-lg border border-green-200 bg-green-50 p-4"
          data-testid="shared-caught-info"
        >
          <p className="flex w-full text-sm font-medium text-green-800">
            <Check />
            <span>
              This Pokémon was caught by the original owner
            </span>
            {sharedData.caughtAt &&
              ` on ${formatDateString(sharedData.caughtAt)}`}
          </p>
        </div>
      )}

      {sharedData?.notes && (
        <div
          className="mt-4 w-full rounded-lg border p-4"
          data-testid="shared-notes"
        >
          <h3 className="mb-2 text-sm font-semibold text-gray-700">
            Original Owner's Notes:
          </h3>
          <p className="text-sm text-gray-600">{sharedData.notes}</p>
        </div>
      )}
    </div>
  );
};

export default PokemonShareAlert;
