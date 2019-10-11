import * as functions from 'firebase-functions';

export const webManifest = functions
  .region('europe-west2')
  .https.onRequest(async (request, response) => {
    // Available locales
    type Locale = 'en' | 'zh';
    const locales = ['en', 'zh'] as const;

    // Function to get locale from url
    function getLocale(path: string) {
      const getLocaleRegExp = new RegExp(`^\\/(${locales.join('|')})`);
      const pathLocale = path.match(getLocaleRegExp);
      return (pathLocale && (pathLocale[1] as Locale)) || locales[0];
    }

    // Get url from referer header and get locale
    const referer = request.header('referer');
    const url = referer && new URL(referer);
    const locale = getLocale(url ? url.pathname : '/');

    // Variables
    const name = {
      en: 'Fier - Budget made easy',
      zh: 'Fier - 轻松理财'
    };
    const lang = {
      en: 'en',
      zh: 'zh'
    };
    const startUrl = {
      en: '.',
      zh: '/zh'
    };

    response.send(`{
  "short_name": "Fier",
  "name": "${name[locale]}",
  "lang": "${lang[locale]}",
  "start_url": "${startUrl[locale]}",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#1658ff",
  "background_color": "#1658ff",
  "display": "standalone"
}`);
  });
