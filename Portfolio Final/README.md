# Portfolio de Corentin Bulle

Portfolio interactif réalisé avec React et Vite, dans une direction visuelle inspirée de Persona 3 Reload. Il présente le parcours, les compétences, les projets, l’expérience, les passions et les certifications de Corentin.

## Développement local

Prérequis : Node.js et npm.

```bash
npm ci
npm run dev
```

Vite affiche l’adresse locale dans le terminal. Pour générer la version de production :

```bash
npm run build
npm run preview
```

## Publication sur GitHub Pages

Le workflow `.github/workflows/deploy.yml` construit et publie le site lors d’un push sur `main` ou `master`.

1. Placer le contenu de ce dossier à la racine du dépôt GitHub.
2. Dans **Settings → Pages**, choisir **GitHub Actions** comme source de publication.
3. Envoyer les changements sur la branche `main` ou `master`.

La navigation utilise des URL à ancre et Vite des chemins relatifs pour fonctionner sur un dépôt Pages.

## Remerciements

Template Persona 3 d’origine : [blairxu13](https://github.com/blairxu13). La personnalisation et les informations du portfolio ont été adaptées pour Corentin Bulle.
