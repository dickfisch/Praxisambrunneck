import { defineConfig } from 'astro/config';

// Statische Seite. build.format: 'file' erzeugt /impressum.html statt /impressum/
// -> alle bestehenden relativen Links (impressum.html, datenschutz.html, index.html) bleiben gültig.
export default defineConfig({
  site: 'https://www.praxisambrunneck.de',
  build: { format: 'file' },
  // Nur für den lokalen Dev-Server: Zugriff über Cloudflare-Tunnel (trycloudflare.com)
  // erlauben, damit man die Vorschau z. B. am Handy testen kann. Wirkt NICHT auf die
  // gebaute Live-Seite. Der führende Punkt erlaubt alle wechselnden Tunnel-Adressen.
  vite: { server: { allowedHosts: ['.trycloudflare.com'] } },
});
