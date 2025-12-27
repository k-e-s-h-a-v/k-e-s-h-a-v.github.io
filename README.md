# Keshav — Portfolio (HTMX)

This is a minimal portfolio scaffold using HTMX for progressive enhancement and Vite for local development.

## Quickstart

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the dev server:

   ```bash
   npm run dev
   ```

3. Visit `http://localhost:5173`.

Notes:
- Partials are placed under `public/partials` so HTMX can fetch them directly.
- Replace `/assets/avatar.svg` with your own images.

Tailwind is set up with PostCSS; styles live in `src/main.css` and are processed by Vite.

Deployment via GitHub Pages
- A GitHub Actions workflow is included at `.github/workflows/pages.yml` that builds the site and deploys the `dist/` folder to GitHub Pages on push to `main` or `master` (via `peaceiris/actions-gh-pages`).
- To enable Pages for the repository, go to your repo Settings → Pages and ensure you're publishing from the `gh-pages` branch (the action will create/update it automatically).

To try it locally:

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run dev server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```

If you want, I can run `npm install` here and verify the dev server starts; say “Go ahead” to proceed.
