import { once } from 'node:events';

import { DEFAULT_HEADER } from '../util/util.js';
import Hero from '../entities/hero.js';

const hero_routes = ({ heroes_service }) => ({
  '/heroes:get': async (request, response) => {
    const heroes = await heroes_service.find();

    response.write(JSON.stringify({ heroes }));
    return response.end();
  },

  '/heroes:post': async (request, response) => {
    const data = await once(request, 'data');
    const item = JSON.parse(data);
    const hero = new Hero(item);

    const id = await heroes_service.create(hero);

    response.writeHead(201, DEFAULT_HEADER);
    response.write(
      JSON.stringify({
        id,
        success: 'Hero created with success!'
      })
    );
    return response.end();
  }
});

export { hero_routes };
