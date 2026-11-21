import { defineConfig } from "vite";

// Chemins relatifs : le site fonctionne à la racine du dépôt
// (https://<user>.github.io/<repo>/) sans connaître le nom du repo.
export default defineConfig({
  base: "./",
});
