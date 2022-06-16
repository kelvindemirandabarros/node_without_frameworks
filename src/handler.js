import { fileURLToPath, parse } from 'node:url';
import { join, dirname } from 'node:path';

// import data from './database/data.json';
import { DEFAULT_HEADER } from './util/util.js';
import { hero_routes } from './routes/hero.js';
import { generate_instance } from './factories/hero.js';

const current_directory = dirname(fileURLToPath(import.meta.url));
const file_path = join(current_directory, './../database', 'data.json');

const hero_service = generate_instance({
  file_path
});
const heroes = hero_routes({
  heroes_service: hero_service
});

const all_routes = {
  ...heroes,
  // 404 routes:
  default: (request, response) => {
    response.writeHead(404, { 'content-type': 'application/json' });
    response.write('Ooops, route not found.');
    response.end();
  }
};

const handler = (request, response) => {
  const { url, method } = request;

  const { pathname } = parse(url, true);

  const key = `${pathname}:${method.toLowerCase()}`;
  const chosen_route = all_routes[key] || all_routes.default;

  return Promise.resolve(chosen_route(request, response)).catch(
    error_handler(response)
  );
};

const error_handler = (response) => {
  return (error) => {
    console.log('An error occurred:', error.stack);
    response.writeHead(500, DEFAULT_HEADER);
    response.write(
      JSON.stringify({
        error: 'Some error happened.'
      })
    );

    return response.end();
  };
};

export default handler;
