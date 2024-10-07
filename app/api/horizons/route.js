import { NextResponse } from 'next/server';
import pLimit from 'p-limit';

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

  const today = new Date();
  const yyyy = today.getUTCFullYear();
  const mm = String(today.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(today.getUTCDate()).padStart(2, '0');
  const dateString = `${yyyy}-${mm}-${dd}`;
  const startTime = `${dateString} 00:00:00`;
  const stopTime = `${dateString} 00:01:00`;

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  try {
    const limit = pLimit(2);

    const fetchPromises = Object.entries(planetCommands).map(([planetName, command], index) => {
      return limit(async () => {
        // we add delay between requests
        await delay(index * 100);

        const params = {
          format: 'text',
          COMMAND: `'${command}'`,
          OUT_UNITS: "'AU-D'",
          OBJ_DATA: "'NO'",
          MAKE_EPHEM: "'YES'",
          EPHEM_TYPE: "'VECTORS'",
          CENTER: "'500@10'",
          START_TIME: `'${startTime}'`,
          STOP_TIME: `'${stopTime}'`,
          STEP_SIZE: "'1d'",
        };

        const queryString = Object.keys(params)
          .map((key) => `${key}=${encodeURIComponent(params[key])}`)
          .join('&');

        const url = `https://ssd.jpl.nasa.gov/api/horizons.api?${queryString}`;

        const apiRes = await fetch(url);

        if (!apiRes.ok) {
          const errorDetails = await apiRes.text();
          console.error(`Horizons API returned status ${apiRes.status} for ${planetName}:`, errorDetails);
          return { planetName, error: errorDetails };
        }

        const rawData = await apiRes.text();

        // Parse the response to extract data
        const resultLines = rawData.split('\n');
        const startIndex = resultLines.indexOf('$$SOE');
        const endIndex = resultLines.indexOf('$$EOE');

        if (startIndex === -1 || endIndex === -1) {
          const errorMessage = 'No data found between $$SOE and $$EOE markers.';
          console.error(`Error for ${planetName}: ${errorMessage}`);
          return { planetName, error: errorMessage };
        }

        // Extract and format the data lines
        const dataLines = resultLines.slice(startIndex + 1, endIndex);

        const parsedData = [];
        let i = 0;

        while (i < dataLines.length) {
          const line1 = dataLines[i].trim();
          const line2 = dataLines[i + 1]?.trim();
          const line3 = dataLines[i + 2]?.trim();

          const jdMatch = line1.match(/^(\d+\.\d+)\s+=\s+(.+)/);
          if (jdMatch) {
            const time = jdMatch[1];
            const datetime = jdMatch[2];

            const xyzMatch = line2.match(/X\s*=\s*([\dE+-.]+)\s+Y\s*=\s*([\dE+-.]+)\s+Z\s*=\s*([\dE+-.]+)/);
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
