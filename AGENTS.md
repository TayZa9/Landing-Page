# AGENTS.md

## 1. Project Overview

This repository contains multiple design/dev artifacts, but the active web application is the Next.js app in `reflect-clone/`.

- Framework: Next.js 16 App Router
- Language: TypeScript + React 19
- Styling: CSS in `src/app/globals.css` plus utility-class-driven components
- Linting: ESLint via `eslint.config.mjs`
- Package manager: `npm` (lockfile present: `reflect-clone/package-lock.json`)

Agent default: work inside `reflect-clone/` unless the task explicitly targets another folder.

## 2. Setup & Install Commands

Run all app commands from `reflect-clone/`.

```bash
cd reflect-clone
npm install
```

Do not install dependencies at repo root unless the task explicitly requires the root `package.json`.

## 3. Development Commands

From `reflect-clone/`:

```bash
npm run dev
npm run build
npm run start
npm run lint
```

Use:

- `npm run dev` for local development
- `npm run build` to validate production compilation
- `npm run lint` before finishing code changes
- `npm run start` only after a successful production build

## 4. Testing Instructions

There is no dedicated test runner configured in the app right now.

Required validation for most code changes:

```bash
cd reflect-clone
npm run lint
npm run build
```

Rules:

- Treat `lint` + `build` as the minimum verification gate
- For UI changes, also verify the affected route in `npm run dev`
- If you add a real test framework later, update this file and document the exact commands

## 5. Code Style Guidelines

Follow the existing codebase, not generic defaults.

- Use TypeScript for app code
- Prefer functional React components
- Keep imports using the `@/` alias when importing from `src`
- Match the existing style: double quotes, semicolons, concise component files
- Reuse shared helpers such as `src/lib/utils.ts`
- Keep components focused and composable; do not create large monolithic page files unless necessary
- Preserve the existing visual language unless the task explicitly requests a redesign
- Avoid unnecessary comments; add brief comments only when a block is genuinely non-obvious

## 6. Folder Structure Explanation

Primary app structure inside `reflect-clone/`:

- `src/app/`: App Router pages, layout, global styles
- `src/components/home/`: landing-page-specific sections
- `src/components/layout/`: navigation and shared layout pieces
- `src/components/ui/`: reusable UI primitives
- `src/components/developer/`: developer/team-related sections
- `src/lib/`: shared utilities
- `src/types/`: local type declarations
- `public/`: static assets served by Next.js

Repository-level note:

- Root-level folders outside `reflect-clone/` may contain experiments, assets, screenshots, or legacy material
- Do not restructure or delete non-app folders unless the task explicitly asks for it

## 7. Rules For Making Changes

These rules are mandatory.

- Default working directory: `reflect-clone/`
- Make the smallest change that fully solves the task
- Do not rewrite unrelated files
- Do not remove assets, folders, or experiments outside the task scope
- Do not upgrade dependencies unless required for the requested change
- Do not introduce a new state library, CSS framework, or UI system without explicit instruction
- Preserve route structure unless the task explicitly calls for navigation or routing changes
- If a file is already user-modified, work with the current content and do not revert unrelated edits
- If a task touches visuals, keep desktop and mobile behavior intact
- Before finishing, run the relevant verification commands and report anything you could not verify
- If the task reveals missing scripts, missing tests, or broken project setup, note that clearly instead of guessing

## 8. Security / Environment Variable Handling

Current state: no `.env*` files are present in the repository root or `reflect-clone/`.

Rules:

- Never hardcode secrets, API keys, tokens, or credentials
- Never commit `.env` files
- If environment variables are introduced, prefer Next.js conventions:
  - server-only secrets without `NEXT_PUBLIC_`
  - `NEXT_PUBLIC_` only for values that are safe to expose to the browser
- Access env vars in one place when practical and validate required values early
- If a feature depends on a secret that is missing, document the expected variable name instead of inserting placeholder secrets

## Agent Operating Notes

- Assume `reflect-clone/` is the source of truth for implementation work
- Ignore root-level `node_modules/` unless a root-level task explicitly needs it
- When describing commands to users or other agents, include `cd reflect-clone` unless already inside that directory
- Keep changes strict, production-minded, and easy to review
