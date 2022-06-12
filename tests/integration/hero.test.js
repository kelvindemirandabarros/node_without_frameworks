import test from 'node:test';
import assert from 'node:assert';
import { promisify } from 'node:util';

test('Hero Integration Test Suite', async (t) => {
  const test_port = 9009;

  process.env.PORT = test_port;
  const { server } = await import('../../src/index.js');
  const test_server_address = `http://localhost:${test_port}/heroes`;

  await t.test('it should create a hero', async (t) => {
    const hero = {
      name: 'Batman',
      age: 50,
      power: 'rich',
    };

    const request = await fetch(test_server_address, {
      method: 'POST',
      body: JSON.stringify(hero),
    });

    // 'deepStrictEqual' for Objects.
    // Checks if the application returned a json response.
    assert.deepStrictEqual(
      request.headers.get('content-type'),
      'application/json'
    );

    // 'strictEqual' for primitive values.
    // Checks if the application returned the 'created' status code.
    assert.strictEqual(request.status, 201);

    const result = await request.json();
    // Checks the body.
    assert.deepStrictEqual(
      result.success,
      'Hero created with success!',
      'it should return a valid text message.'
    );

    // Checks if an ID was returned.
    assert.ok(result.id.length > 30, 'it should return a valid text message');
  });

  // Closes the server with await.
  await promisify(server.close.bind(server))();
});
