import * as functions from 'firebase-functions';
import localeAwareManifest from './functions/localeAwareManifest';

export const webManifest = functions.https.onRequest(
  async (request, response) => {
    const referer = request.header('referer');
    const url = referer && new URL(referer);
    response.send(localeAwareManifest(url ? url.pathname : '/'));
  }
);
