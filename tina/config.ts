import { defineConfig } from "tinacms";

// Branch automatisch aus der Deploy-Umgebung (Vercel) – sonst Fallback "main".
const branch =
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.GITHUB_BRANCH ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  // Aus TinaCloud (in Vercel als Environment-Variablen hinterlegt):
  clientId: process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin", // Editor erreichbar unter /admin
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "assets/img",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "sprechzeiten",
        label: "Öffnungszeiten",
        path: "content",
        format: "json",
        match: { include: "sprechzeiten" },
        // Es gibt genau eine Datei – kein Anlegen/Löschen erlauben.
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "tage",
            label: "Wochentage",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.tag || "Tag" }),
            },
            fields: [
              { type: "string", name: "tag", label: "Wochentag (Anzeige)" },
              {
                type: "string",
                name: "zeiten",
                label: "Sprechzeiten (eine Zeile pro Zeitspanne)",
                list: true,
              },
            ],
          },
        ],
      },
      {
        name: "hinweis",
        label: "Hinweis-Banner",
        path: "content",
        format: "json",
        match: { include: "hinweis" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "boolean",
            name: "aktiv",
            label: "Banner anzeigen",
            description: "An = Hinweis erscheint oben auf der Startseite. Aus = ausgeblendet.",
          },
          {
            type: "string",
            name: "label",
            label: "Label (kleiner Text oben)",
            description:
              "Das kleine Wort ganz oben im Banner, z. B. „Hinweis“, „Achtung“, „Wichtig“. Leer lassen = „Hinweis“.",
          },
          { type: "string", name: "titel", label: "Titel (fett)" },
          {
            type: "string",
            name: "text",
            label: "Text",
            description: "Der Hinweistext, z. B. Urlaub oder Vertretung.",
            ui: { component: "textarea" },
          },
          {
            type: "image",
            name: "datei",
            label: "Datei (PDF/Bild) zum Anzeigen",
            description:
              "Datei hochladen. Wird als eigenes Element mit Dateiname (bei Bildern mit Vorschau) angezeigt. Klick öffnet/lädt sie herunter.",
          },
          {
            type: "string",
            name: "buttonText",
            label: "Button-Beschriftung",
            description:
              "Text auf dem Button, z. B. „Mehr erfahren“. Nur zusammen mit „Externer Link“. Leer lassen = kein Button.",
          },
          {
            type: "string",
            name: "link",
            label: "Externer Link (für den Button)",
            description:
              "Web-Adresse (https://…), auf die der Button zeigt. Unabhängig von der Datei – beides ist gleichzeitig möglich.",
          },
        ],
      },
    ],
  },
});
