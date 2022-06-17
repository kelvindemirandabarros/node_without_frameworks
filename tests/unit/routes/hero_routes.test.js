import test from 'node:test';
import assert from 'node:assert';

import { hero_routes } from '../../../src/routes/hero.js';
import { DEFAULT_HEADER } from '../../../src/util/util.js';

const call_tracker = new assert.CallTracker();
process.on('exit', () => {
  call_tracker.verify();
});

test('Hero routes - endpoints test suite', async (t) => {
  await t.test('it should call /heroes:get route', async () => {
    const database_mock = [
      {
        id: '2bbbc600-ff6b-4e2f-ba3e-ab95392d42ce',
        name: 'Batman',
        age: 50,
        power: 'rich'
      }
    ];

    const hero_service_stub = {
      find: async () => database_mock
    };

    const endpoints = hero_routes({
      heroes_service: hero_service_stub
    });

    const endpoint = '/heroes:get';
    const request = {};
    const response = {
      write: call_tracker.calls((item) => {
        const expected = JSON.stringify({
          heroes: database_mock
        });
        assert.strictEqual(
          item,
          expected,
          'write should be called with the correct payload.'
        );
      }),
      end: call_tracker.calls((item) => {
        assert.strictEqual(
          item,
          undefined,
          'end should be called without params.'
        );
      })
    };

    const route = endpoints[endpoint];
    await route(request, response);
  });
  await t.todo('it should call /heroes:post route');
});
