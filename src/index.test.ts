const test = require('firebase-functions-test')();

import { helloWorld } from './index';

it('helloWorld', () => {
  const req = null;
  const res = {
    send: jest.fn()
  };

  helloWorld(req as any, res as any);

  expect(res.send).toHaveBeenCalledWith('Hello world!');
});

test.cleanup();
