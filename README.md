# Test

Application web statique, construite avec [Vite](https://vite.dev) et publiée sur GitHub Pages.

## Développement

```bash
npm install
npm run dev
```

Le serveur local affiche l’adresse, en général `http://localhost:5173`.

```bash
npm run build
npm run preview
```

`npm run build` produit le site dans `dist/`. Les chemins sont relatifs (`base: "./"`), donc le même build fonctionne à la racine d’un dépôt GitHub Pages (`https://<utilisateur>.github.io/<dépôt>/`).

## Publication

Le workflow [`.github/workflows/pages.yml`](.github/workflows/pages.yml) construit le site et le déploie à chaque push sur `main`.

Une fois, dans le dépôt GitHub :

1. **Settings → Pages**
2. **Build and deployment → Source : GitHub Actions**

L’adresse du site sera `https://sauvagetbasile-bot.github.io/Test/`.
