# Interio & Trade associates

Frontend-only luxury interior design website built with Next.js, TypeScript, Tailwind CSS, Framer Motion, GSAP, Lenis, and next-themes.

This project is configured for static export, so the production build can be uploaded to GitHub, Netlify, Vercel, GitHub Pages, or any static host.

## Run locally

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Export

```bash
npm run export
```

The static site is emitted to the `out/` folder.

## Folder Structure

- `src/app` - application shell, global styles, loading and transition files
- `src/components` - reusable UI blocks and the luxury homepage
- `src/lib` - shared utilities
- `public` - static assets

## Notes

- The project is intentionally frontend-only.
- Motion, filters, lightbox, theme toggle, and loading states are all client-side.
- Replace placeholder contact details and imagery when final brand assets are available.

## Deploy

### Vercel

1. Push the repository to GitHub.
2. Import the repo in Vercel.
3. Use `npm run build` as the build command.
4. Deploy the generated static site.

### Netlify

1. Push the repository to GitHub.
2. Connect the repo in Netlify.
3. Use `npm run build` as the build command.
4. Set the publish directory to `out`.

### GitHub Pages

1. Push the repository to GitHub.
2. Enable GitHub Pages in the repository settings and choose the GitHub Actions source.
3. Keep the included workflow at [.github/workflows/deploy-github-pages.yml](.github/workflows/deploy-github-pages.yml).
4. The workflow builds with `NEXT_PUBLIC_BASE_PATH` set automatically from the repository name and publishes the `out/` folder.
5. If you deploy to a user site or custom root domain, set `NEXT_PUBLIC_BASE_PATH` to an empty string.

### Any Static Host

1. Run `npm run build`.
2. Upload the `out/` folder to your host.
3. Serve it as a static website.

## Commands Summary

```bash
npm install
npm run dev
npm run build
npm run export
```

