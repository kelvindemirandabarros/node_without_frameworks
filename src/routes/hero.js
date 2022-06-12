import { once } from 'node:events';

import { DEFAULT_HEADER } from '../util/util.js';
import Hero from '../entities/hero.js';

const hero_routes = ({ heroes_service }) => ({
  '/heroes:get': async (request, response) => {
    // response.writeHead(200, DEFAULT_HEADER);
    response.write('GET Heroes');
    return response.end();
  },

  '/heroes:post': async (request, response) => {
    const data = await once(request, 'data');
    const item = JSON.parse(data);
    const hero = new Hero(item);
    const id = hero.id;

    response.writeHead(201, DEFAULT_HEADER);
    response.write(
      JSON.stringify({
        id,
        success: 'Hero created with success!',
      })
    );
    return response.end();
  },
});

export { hero_routes };
