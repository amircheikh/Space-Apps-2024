import { useQuery } from '@tanstack/react-query';
import { HorizonsResponse } from '../api/nasa/types';
import { getHorizonsRoute } from '../api/nasa/utils';
import { Loadable, loadDataFromQuery, mapLoadable, QueryOptions } from '../api/query';

export function useHorizonsRouteQuery(options: QueryOptions): Loadable<HorizonsResponse | null> {
  const horizonsQuery = useQuery({
    queryKey: ['horizonsRouteQuery'],
    queryFn: async () => getHorizonsRoute(),
    ...options,
    enabled: options.enabled,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const horizonsRoute = loadDataFromQuery(horizonsQuery);

  return mapLoadable(horizonsRoute)((data): HorizonsResponse | null => data);
}
