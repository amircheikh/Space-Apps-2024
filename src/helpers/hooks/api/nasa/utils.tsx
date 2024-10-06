import { handleJSONResponse } from '../utils';
import { HorizonsResponse } from './types';

export async function getHorizonsRoute(): Promise<HorizonsResponse> {
  try {
    const url = `/api/horizons`;
    const resp = await fetch(url);

    return handleJSONResponse(resp);
  } catch (error) {
    console.error('Error fetching Horizons data', error);
    return null;
  }
}
