// Available locales
type Locale = 'en' | 'zh';
const locales = ['en', 'zh'] as const;

// Helper function to get locale from url
function getLocale(path: string) {
  const getLocaleRegExp = new RegExp(`^\\/(${locales.join('|')})`);
  const pathLocale = path.match(getLocaleRegExp);
  return (pathLocale && (pathLocale[1] as Locale)) || locales[0];
}

// Locale manifest diff
const localeManifest = {
  en: {
    name: 'Fier - Budget made easy',
    lang: 'en',
    start_url: '.',
  },
  zh: {
    name: 'Fier - 轻松理财',
    lang: 'zh',
    start_url: '/zh',
  },
};

export default function (pathname?: string) {
  const locale = getLocale(pathname ?? '/');
  return JSON.stringify({
    short_name: 'Fier',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    theme_color: '#1658ff',
    background_color: '#1658ff',
    display: 'standalone',
    ...localeManifest[locale],
  });
}
