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
  };

  const agent = new https.Agent({ maxSockets: 20 });

  try {
    // we fetch data for all planets concurrently
    const fetchPromises = Object.entries(planetCommands).map(async ([planetName, command]) => {
      const url = `https://ssd.jpl.nasa.gov/api/horizons.api?format=text&COMMAND=%27${encodeURIComponent(command)}%27&OUT_UNITS=%27AU-D%27&OBJ_DATA=%27NO%27&MAKE_EPHEM=%27YES%27&EPHEM_TYPE=%27VECTORS%27&CENTER=%27500@0%27&START_TIME=%272024-10-01%27&STOP_TIME=%272024-10-02%27&STEP_SIZE=%271d%27 `;

      const apiRes = await fetch(url, { agent });

      if (!apiRes.ok) {
        const errorDetails = await apiRes.text();
        console.error(`Horizons API returned status ${apiRes.status} for ${planetName}: ${errorDetails}`);
        return { planetName, error: errorDetails };
      }

      const rawData = await apiRes.text();

      // parse the response to extract data
      const resultLines = rawData.split('\n');
      const startIndex = resultLines.indexOf('$$SOE');
      const endIndex = resultLines.indexOf('$$EOE');

      if (startIndex === -1 || endIndex === -1) {
        const errorMessage = 'No data found between $$SOE and $$EOE markers.';
        console.error(`Error for ${planetName}: ${errorMessage}`);
        return { planetName, error: errorMessage };
      }

      // extract and format the data lines
      const dataLines = resultLines.slice(startIndex + 1, endIndex);

      const parsedData = [];
      let i = 0;

      while (i < dataLines.length) {
        const line1 = dataLines[i].trim();
        const line2 = dataLines[i + 1]?.trim();
        const line3 = dataLines[i + 2]?.trim();
        const line4 = dataLines[i + 3]?.trim();

        const jdMatch = line1.match(/^(\d+\.\d+)\s+=\s+(.+)/);
        if (jdMatch) {
          const time = jdMatch[1];
          const datetime = jdMatch[2];

          // Parse X, Y, Z
          const xyzMatch = line2.match(/X\s*=\s*([\dE+-.]+)\s+Y\s*=\s*([\dE+-.]+)\s+Z\s*=\s*([\dE+-.]+)/);
          // Parse VX, VY, VZ
          const vxvyvzMatch = line3.match(/VX\s*=\s*([\dE+-.]+)\s+VY\s*=\s*([\dE+-.]+)\s+VZ\s*=\s*([\dE+-.]+)/);

          if (xyzMatch && vxvyvzMatch) {
            const x = parseFloat(xyzMatch[1]);
            const y = parseFloat(xyzMatch[2]);
            const z = parseFloat(xyzMatch[3]);

            const vx = parseFloat(vxvyvzMatch[1]);
            const vy = parseFloat(vxvyvzMatch[2]);
            const vz = parseFloat(vxvyvzMatch[3]);

            parsedData.push({ time, datetime, x, y, z, vx, vy, vz });
          }

          i += 4;
        } else {
          i++;
        }
      }

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
