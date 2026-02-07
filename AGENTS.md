# Repository Guidelines

## Project Structure & Module Organization
This repository is a Next.js App Router site. Main code lives under `src/app`.
- Routes and pages: `src/app/page.tsx`, `src/app/works/pages.tsx`
- App shell and global styles: `src/app/layout.tsx`, `src/app/globals.css`
- Site icons/manifest assets are currently colocated in `src/app/*` (favicons, `site.webmanifest`)
- Static public assets (if needed) belong in `public/`
- CI/CD workflow lives at `.github/workflows/nextjs.yml` and deploys to GitHub Pages.

## Build, Test, and Development Commands
Use npm (the repo includes `package-lock.json`).
- `npm ci`: install exact dependency versions for local/CI consistency
- `npm run dev`: start local dev server at `http://localhost:3000`
- `npm run lint`: run ESLint using Next.js core web vitals rules
- `npm run build`: produce production build (and static output for Pages workflow)
- `npm run start`: run the production server locally

## Coding Style & Naming Conventions
- Formatting is enforced by Prettier in `prettier.config.js`: 4-space tabs, single quotes, no semicolons, trailing commas (`es5`)
- ESLint extends `next/core-web-vitals` (`.eslintrc.json`); fix lint findings before opening a PR
- Use TypeScript (`.ts`/`.tsx`) for app code
- Keep route folders lowercase and descriptive (example: `src/app/works/`)
- Prefer clear component names in PascalCase and utility variables/functions in camelCase.

## Testing Guidelines
There is no dedicated test framework configured yet (no `test` script in `package.json`).
- Minimum quality gate today: `npm run lint` and `npm run build` must pass
- If you add tests, colocate them near feature code or under `src/` with `*.test.ts(x)` naming
- Keep tests deterministic and avoid network-dependent behavior.

## Commit & Pull Request Guidelines
Recent history uses short, imperative commit subjects (for example, `Upgrade dependencies`, `Update action`).
- Write concise, present-tense commit titles focused on one change
- In PRs, include: purpose, key file changes, validation steps run, and screenshots for UI updates
- Link related issues when applicable and note any follow-up work.
