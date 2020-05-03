import localeAwareManifest from './localeAwareManifest';

test('en locale', () => {
  const manifest = localeAwareManifest('/dashboard');
  expect(JSON.parse(manifest)).toEqual(
    expect.objectContaining({
      lang: 'en',
      name: 'Fier - Budget made easy',
      start_url: '.',
    })
  );
});

test('zh locale', () => {
  const manifest = localeAwareManifest('/zh/dashboard');
  expect(JSON.parse(manifest)).toEqual(
    expect.objectContaining({
      lang: 'zh',
      name: 'Fier - 轻松理财',
      start_url: '/zh',
    })
  );
});

test('empty pathname is equivalent to en', () => {
  const manifest = localeAwareManifest();
  expect(JSON.parse(manifest)).toEqual(
    expect.objectContaining({
      lang: 'en',
    })
  );
});
