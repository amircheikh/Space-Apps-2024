import { useQuery } from '@tanstack/react-query';
import { HorizonsQueryInput, HorizonsResponse, HorizonsRoute } from '../api/nasa/types';
import { getHorizonsRoute } from '../api/nasa/utils';
import { Loadable, loadDataFromQuery, mapLoadable, QueryOptions } from '../api/query';

export function useHorizonsRouteQuery(
  input: HorizonsQueryInput,
  options: QueryOptions,
): Loadable<HorizonsResponse | null> {
  const horizonsQuery = useQuery({
    queryKey: ['horizonsRouteQuery', input],
    queryFn: async () => getHorizonsRoute(input),
    ...options,
    enabled: options.enabled && !!input,
  });

  const horizonsRoute = loadDataFromQuery(horizonsQuery);

  return mapLoadable(horizonsRoute)((rawData): HorizonsResponse | null => {
    if (!rawData) {
      return null;
    }

    // Extract data between $$SOE and $$EOE
    const resultLines = rawData.result.split('\n');
    const startIndex = resultLines.indexOf('$$SOE');
    const endIndex = resultLines.indexOf('$$EOE');

    if (startIndex === -1 || endIndex === -1) {
      console.error('No data found between $$SOE and $$EOE markers.');
      return null;
    }

    const dataLines = resultLines.slice(startIndex + 1, endIndex); // Lines with data
    const parsedData: HorizonsRoute[] = dataLines
      .filter((line) => line.trim() !== '') // Remove empty lines
      .map((line) => {
        const parts = line.trim().split(/\s+/); // Split by whitespace
        return {
          time: parts[0] + ' ' + parts[1], // Date and time
          ra: parts[2] + ' ' + parts[3] + ' ' + parts[4], // Right ascension
          dec: parts[5] + ' ' + parts[6] + ' ' + parts[7], // Declination
          apmag: parseFloat(parts[8]), // Apparent magnitude
          delta: parseFloat(parts[9]), // Distance from observer in AU
          s_o_t: parts[11], // Sun-Observer-Target angle
        };
      });

    return {
      routes: parsedData, // Return only parsed routes
    };
  });
}
