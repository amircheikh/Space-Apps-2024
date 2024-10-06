import https from 'https';
import { NextResponse } from 'next/server';

export async function GET(req) {
  
  const planetCommands = {
    Mercury: '199',
    Venus: '299',
    Earth: '399',
    Mars: '499',
    Jupiter: '599',
    Saturn: '699',
    Uranus: '799',
    Neptune: '899',
    Sun: '10',
  };

  const agent = new https.Agent({ maxSockets: 20 });

  try {
    // we fetch data for all planets concurrently
    const fetchPromises = Object.entries(planetCommands).map(async ([planetName, command]) => {
      const url = `https://ssd.jpl.nasa.gov/api/horizons.api?format=json&COMMAND=%27${encodeURIComponent(
        command
      )}%27&OBJ_DATA=%27YES%27&MAKE_EPHEM=%27YES%27&EPHEM_TYPE=%27OBSERVER%27&CENTER=%27500@10%27&START_TIME=%272024-10-01%27&STOP_TIME=%272024-10-02%27&STEP_SIZE=%271+d%27&QUANTITIES=%271,9,20,23,24,29%27`;

      const apiRes = await fetch(url, { agent });

      if (!apiRes.ok) {
        const errorDetails = await apiRes.text();
        console.error(`Horizons API returned status ${apiRes.status} for ${planetName}: ${errorDetails}`);
        return { planetName, error: errorDetails };
      }

      const rawData = await apiRes.json();

      // parse the response to extract data 
      const resultLines = rawData.result.split('\n');
      const startIndex = resultLines.indexOf('$$SOE');
      const endIndex = resultLines.indexOf('$$EOE');

      if (startIndex === -1 || endIndex === -1) {
        const errorMessage = 'No data found between $$SOE and $$EOE markers.';
        console.error(`Error for ${planetName}: ${errorMessage}`);
        return { planetName, error: errorMessage };
      }

      // extract and format the data lines
      const dataLines = resultLines.slice(startIndex + 1, endIndex);
      const parsedData = dataLines
        .filter((line) => line.trim() !== '')
        .map((line) => {
          const parts = line.trim().split(/\s+/);
          return {
            time: `${parts[0]} ${parts[1]}`, 
            ra: `${parts[2]} ${parts[3]} ${parts[4]}`, 
            dec: `${parts[5]} ${parts[6]} ${parts[7]}`, 
            apmag: parseFloat(parts[8]), 
            delta: parseFloat(parts[9]), 
            s_o_t: parts[11], 
          };
        });

      return { planetName, data: parsedData };
    });

    const results = await Promise.all(fetchPromises);

    const dataByPlanet = {};
    const errors = [];

    results.forEach((result) => {
      if (result.error) {
        errors.push({ planet: result.planetName, error: result.error });
      } else {
        dataByPlanet[result.planetName] = result.data;
      }
    });

    const responseData = {
      data: dataByPlanet,
      ...(errors.length > 0 && { errors }), 
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error fetching data from Horizons API:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
