import { handleJSONResponse } from '../utils';
import { HorizonsQueryInput } from './types';

export async function getHorizonsRoute(input: HorizonsQueryInput): Promise<any> {
  try {
    const baseUrl = 'https://ssd.jpl.nasa.gov/api/horizons.api';

    const urlParams = new URLSearchParams({
      format: 'json',
      COMMAND: `'${input.COMMAND}'`,
      OBJ_DATA: `'YES'`,
      MAKE_EPHEM: `'YES'`,
      EPHEM_TYPE: `'OBSERVER'`,
      CENTER: `'${input.CENTER}'`,
      START_TIME: `'${input.START_TIME}'`,
      STOP_TIME: `'${input.STOP_TIME}'`,
      STEP_SIZE: `'1 d'`,
      QUANTITIES: `'1,9,20,23,24,29'`,
    });

    const url = `${baseUrl}?${urlParams.toString()}`;

    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    const jsonResponse = await handleJSONResponse(resp);
    return jsonResponse;
  } catch (error) {
    console.error('Error fetching Horizons data', error);
    return null;
  }
}
