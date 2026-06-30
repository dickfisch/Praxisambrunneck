import { defineConfig } from 'astro/config';

// Statische Seite. build.format: 'file' erzeugt /impressum.html statt /impressum/
// -> alle bestehenden relativen Links (impressum.html, datenschutz.html, index.html) bleiben gültig.
export default defineConfig({
  site: 'https://www.praxisambrunneck.de',
  build: { format: 'file' },
});
