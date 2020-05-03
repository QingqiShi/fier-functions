const test = require('firebase-functions-test')();

import { webManifest } from './index';

beforeEach(jest.clearAllMocks);

describe('webManifest', () => {
  it('returns localised manifest based on referer', () => {
    const req = { header: jest.fn() };
    const res = { send: jest.fn() };

    req.header.mockReturnValue('https://fier.app/zh/something');
    webManifest(req as any, res as any);

    expect(req.header).toHaveBeenCalledWith('referer');

    const response = JSON.parse(res.send.mock.calls[0][0]);
    expect(response).toHaveProperty('lang', 'zh');
  });

  it('returns en manifest if no referer', () => {
    const req = { header: jest.fn() };
    const res = { send: jest.fn() };

    req.header.mockReturnValue('');
    webManifest(req as any, res as any);

    expect(req.header).toHaveBeenCalledWith('referer');

    const response = JSON.parse(res.send.mock.calls[0][0]);
    expect(response).toHaveProperty('lang', 'en');
  });
});

test.cleanup();
