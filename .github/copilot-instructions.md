# Copilot Project Instructions

Guidelines for Copilot suggestions that match this Next.js portfolio project.

## General Principles
- Keep solutions readable, maintainable, and reusable; favor composition over inheritance.
- Write new code in TypeScript/TSX and use descriptive, PascalCase component names.
- Use project import aliases (`@/...`) instead of deep relative paths.
- Prefer pure, single-purpose functions and extract shared logic into helpers or custom hooks.
- Reuse existing UI building blocks from `@/components/ui/*` and `@/components/layout/*` before adding new primitives.
- Respect accessibility: semantic HTML, ARIA where needed, focus visibility, and reduced-motion support.
- Follow the established formatting (Prettier defaults: 2 spaces, double quotes in TSX/TS).
- Use `npm` for scripts and dependency updates (`npm run dev`, `npm run build`, `npm run lint`).

## React & State Management
- Stick to functional components with hooks; avoid class components unless absolutely necessary (e.g., error boundaries).
- Destructure props in the signature and define prop types with `type` aliases located near the component unless they are shared broadly.
- Keep components focused on a single responsibility; split large ones into smaller pieces or extract hooks.
- Store local state with `useState`/`useReducer`; rely on existing context (`useLanguage`, theme) for shared state instead of prop drilling.
- Favour custom hooks (`@/lib/hooks`) for reusable stateful logic.

## Styling & UI
- Use Tailwind CSS v4 utilities; prefer the canonical class names (e.g., `aspect-video`) over arbitrary values when available.
- Co-locate additional styling via Tailwind or component props; avoid introducing global CSS beyond `app/globals.css`.
- Preserve existing motion patterns and respect `useReducedMotion` checks when adding animations.

## Next.js Practices
- Follow the App Router structure already in place; prefer Server Components for static content and client components only when interaction is required.
- For data fetching, use the native `fetch` with `revalidate` or `cache` options in Server Components; reserve client-side fetching for truly dynamic, user-specific data.
- Keep route organization consistent with existing folders and use route groups only when necessary.
- Always use `next/image` for images and `next/font` (or existing font setup) for typography.

## Project Structure & Types
- Group logic by feature: colocate components, hooks, and utilities that change together under `components/sections`, `lib/`, etc.
- Place shared utilities in `lib/` and keep context/hooks under their existing subfolders.
- When introducing shared types, define them in a nearby `types` file within the relevant feature or in `lib/` if the type is widely reused.
- Avoid barrel files; import directly from the module that exports the needed symbol.

## Quality Gates
- Run `npm run lint` before submitting changes; ensure ESLint passes without disabling rules unless explicitly justified.
- Prefer localized strings via `lib/i18n.ts`; avoid hard-coded copy in components.
- Remove unused scaffolding or variables; keep comments focused on clarifying non-obvious logic.

## Commits & Docs
- Use conventional-commit style messages consistent with the repo (e.g., `fix(component): clarify aria labels`).
- Update or add documentation inline or in feature-specific notes as needed; no dedicated `docs/` folder is required unless one already exists.
