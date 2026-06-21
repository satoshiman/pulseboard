# Pulseboard

## Branch status: `task1/broken`

This branch intentionally contains a broken implementation for Task 1.

- **Issue:** AppContext re-renders every consumer on every state change, resulting in 200+ re-renders.
- **Location:** `src/contexts/AppContext.tsx`
- **Goal:** Profile the app, identify the root cause, and fix the unnecessary re-renders.

## Available scripts

- `npm run dev` — start dev server
- `npm run dev:profile` — start dev server with React Profiler enabled
- `npm run build` — production build
- `npm run lint` — run ESLint

## Branches

- `main` — baseline app
- `task1/broken` — this branch, contains the performance bug
- `task1/fixed` — reference solution
