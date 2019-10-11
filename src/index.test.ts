const test = require('firebase-functions-test')();

import { webManifest } from './index';

beforeEach(jest.clearAllMocks);

it('webManifest with en referer', () => {
  const req = { header: jest.fn() };
  const res = { send: jest.fn() };

  req.header.mockReturnValue('https://fier.app/something');
  webManifest(req as any, res as any);

  const response = JSON.parse(res.send.mock.calls[0][0]);
  expect(req.header).toHaveBeenCalledWith('referer');
  expect(response).toHaveProperty('name', 'Fier - Budget made easy');
  expect(response).toHaveProperty('lang', 'en');
  expect(response).toHaveProperty('start_url', '.');
});

it('webManifest with zh referer', () => {
  const req = { header: jest.fn() };
  const res = { send: jest.fn() };

  req.header.mockReturnValue('https://fier.app/zh/something');
  webManifest(req as any, res as any);

  const response = JSON.parse(res.send.mock.calls[0][0]);
  expect(req.header).toHaveBeenCalledWith('referer');
  expect(response).toHaveProperty('name', 'Fier - 轻松理财');
  expect(response).toHaveProperty('lang', 'zh');
  expect(response).toHaveProperty('start_url', '/zh');
});

it('webManifest handles no referer senario', () => {
  const req = { header: jest.fn() };
  const res = { send: jest.fn() };

  req.header.mockReturnValue(undefined);
  webManifest(req as any, res as any);

  const response = JSON.parse(res.send.mock.calls[0][0]);
  expect(req.header).toHaveBeenCalledWith('referer');
  expect(response).toHaveProperty('name', 'Fier - Budget made easy');
  expect(response).toHaveProperty('lang', 'en');
  expect(response).toHaveProperty('start_url', '.');
});

test.cleanup();
