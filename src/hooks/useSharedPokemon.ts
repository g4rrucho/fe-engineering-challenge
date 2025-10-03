import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { decodeShareData } from '@/utils/shareUtils';

const useSharedPokemon = () => {
  const [searchParams] = useSearchParams();
  const encodedData = searchParams.get('data');
  const isShared = searchParams.get('isShared') === 'true';

  const sharedData = useMemo(() => {
    if (!encodedData) return undefined;
    return decodeShareData(encodedData);
  }, [encodedData]);

  return { isShared, sharedData };
};

export default useSharedPokemon;
