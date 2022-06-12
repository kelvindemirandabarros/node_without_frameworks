import { DEFAULT_HEADER } from '../util/util.js';

const hero_routes = ({ heroes_service }) => ({
  '/heroes:get': async (request, response) => {
    // response.writeHead(200, DEFAULT_HEADER);
    response.write('Heroes');
    response.end();
  },

  '/heroes:post': async (request, response) => {
    // response.writeHead(201, DEFAULT_HEADER);
    response.write('Heroes');
    response.end();
  },
});

export { hero_routes };
