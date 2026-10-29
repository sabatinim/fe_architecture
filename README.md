# Minimal TypeScript project

A small TypeScript starter with a Node.js example and a React search page built
with Material UI.

## Requirements

- Node.js
- npm

## Get started

```sh
npm install
npm run build
npm start
```

Start the React app in development mode:

```sh
npm run dev
```

Vite watches the app files and automatically updates the browser when they
change, using React Fast Refresh for component edits.

Build the browser app for production with `npm run build:web`, then serve it
locally with `npm run preview`.

Run the TypeScript type check without emitting files:

```sh
npm run check
```

Run the unit tests:

```sh
npm test
```

Put application source files in `src/`. Compiled JavaScript is written to `dist/`.
TypeScript tests live in `test/`, are compiled to `dist-test/`, and run with
Node.js's built-in test runner.

The shared typed event bus is in `src/shared/eventBus.ts`. The browser app is
mounted from `src/main.tsx` into the root element in `index.html`.
