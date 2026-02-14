# johnsonsu.com

Personal website built with Next.js App Router and deployed as a static export to GitHub Pages.

This README is optimized for both human contributors and AI coding agents so routine tasks are faster and more predictable.

## Quick Facts

- Framework: Next.js `16` + React `19` + TypeScript
- Rendering mode: static export (`output: 'export'` in `next.config.js`)
- Deployment target: GitHub Pages via `.github/workflows/nextjs.yml`
- Package manager: `npm` (lockfile is `package-lock.json`)
- Source root: `src/app`

## Current App Shape

- Home route: `src/app/page.tsx`
  - Client component (`'use client'`)
  - Terminal-style typing intro UI
  - Theme chooser (`auto` / `light` / `dark`) stored in `localStorage`
  - Reduced-motion support via `prefers-reduced-motion`
- App shell + metadata: `src/app/layout.tsx`
- Global styles: `src/app/globals.css`
- Static icons + manifest are colocated in `src/app/`
- `src/app/works/pages.tsx` currently exists but is empty and not a valid App Router page file (`page.tsx` is expected)

## Repository Layout

- `src/app/` app routes and global styles
- `public/` static public assets (only add files here when they are not route/metadata assets)
- `.github/workflows/nextjs.yml` CI build and Pages deploy workflow
- `eslint.config.mjs` ESLint flat config (Next core web vitals preset)
- `prettier.config.js` formatting rules

## Local Development

1. Install dependencies:

```bash
npm ci
```

2. Start dev server:

```bash
npm run dev
```

3. Open:

```text
http://localhost:3000
```

## Validation Commands

Run these before opening a PR:

```bash
npm run lint
npm run build
```

Notes:

- There is currently no dedicated test runner configured in `package.json`.
- `npm run build` should generate static output compatible with GitHub Pages.

## Coding and Style Rules

- TypeScript for app code (`.ts` / `.tsx`)
- Prettier:
  - `tabWidth: 4`
  - `singleQuote: true`
  - `semi: false`
  - `trailingComma: 'es5'`
- ESLint: extends `next/core-web-vitals`
- Use lowercase route folder names in `src/app/`
- Component names: PascalCase
- Variables/functions: camelCase

## AI Agent Operating Notes

Use this checklist for efficient changes:

1. Read first:
   - `package.json`
   - `next.config.js`
   - `src/app/layout.tsx`
   - target route file(s) in `src/app/**`
2. Respect static-export constraints:
   - Avoid server-only features that require runtime hosting.
   - Prefer deterministic build-time behavior.
3. Keep changes minimal and scoped:
   - Update only touched route/components/styles.
   - Do not reshuffle folder structure without explicit request.
4. Validate every functional change:
   - `npm run lint`
   - `npm run build`
5. For UI edits:
   - Preserve current terminal aesthetic unless the task explicitly asks for redesign.
   - Keep accessibility checks for keyboard interaction and motion preferences.
6. For metadata/assets:
   - Route metadata belongs in `src/app/layout.tsx` or route-level metadata.
   - Site icons/manifest are intentionally in `src/app/`.

## Deployment

Deployment is automated on push to `main`:

- Workflow: `.github/workflows/nextjs.yml`
- Build job: installs dependencies and runs Next build
- Artifact path: `./out`
- Deploy job: publishes artifact to GitHub Pages

If deployment breaks, verify locally first:

```bash
npm ci
npm run lint
npm run build
```

## Recommended Contribution Pattern

- Keep commit messages short and imperative (example: `Refine home typing behavior`)
- Scope each PR to one logical change
- In PR description include:
  - purpose
  - key files changed
  - validation run (`npm run lint`, `npm run build`)
  - screenshot/GIF for visible UI updates
