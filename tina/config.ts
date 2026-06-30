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
                type: "number",
                name: "datum",
                label: "Tag-Nummer (1 = Montag … 5 = Freitag)",
              },
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
          { type: "boolean", name: "aktiv", label: "Banner anzeigen" },
          { type: "string", name: "titel", label: "Titel (fett)" },
          {
            type: "string",
            name: "text",
            label: "Text",
            ui: { component: "textarea" },
          },
        ],
      },
    ],
  },
});
