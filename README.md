# Minimal TypeScript project

A small Node.js TypeScript starter using npm and the TypeScript compiler directly.
There are no build frameworks or runtime dependencies.

## Requirements

- Node.js
- npm

## Get started

```sh
npm install
npm run build
npm start
```

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

The shared typed event bus is in `src/shared/eventBus.ts`. The React
`EventDemo` component in `src/components/EventDemo.tsx` demonstrates one
component sending a message to another. This starter does not include a browser
renderer or frontend build framework.
