import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  minify: false,
  sourcemap: true,
  banner: {
    js: "#!/usr/bin/env node",
  },
  // Copier les templates dans le dossier dist
  onSuccess: async () => {
    const fs = await import("fs");
    const path = await import("path");
    const templatesDir = path.join("src", "templates");
    const distTemplatesDir = path.join("dist", "templates");

    if (!fs.existsSync(distTemplatesDir)) {
      fs.mkdirSync(distTemplatesDir, { recursive: true });
    }

    const templates = fs.readdirSync(templatesDir);
    templates.forEach((template) => {
      fs.copyFileSync(
        path.join(templatesDir, template),
        path.join(distTemplatesDir, template)
      );
    });
  },
});
