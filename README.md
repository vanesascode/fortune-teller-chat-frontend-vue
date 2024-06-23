# 💫 YES or NO Fortune Teller Chat built with VUE

Simple chat that answers Yes or No to your questions. Built with VUE and using the `https://yesno.wtf/api`API.

![Screenshot 2024-06-22 at 15 49 52](https://github.com/vanesascode/fortune-teller-chat-frontend-vue/assets/131259155/e2707a4d-4a9f-49fc-9fdd-33e6e88c5f2f)

## SASS

`npm install -D`

## Tailwind

`npm install -D tailwindcss postcss autoprefixer`

`npx tailwindcss init -p`

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

#### JSDOM

JSDOM is often used in unit testing to simulate a browser environment and test the behavior of JavaScript code that interacts with the DOM.

#### @vue/test-utils

Testing utility library for Vue.js. Vue Test Utils (VTU) is a set of utility functions aimed to simplify `testing Vue.js components`. It provides some methods to mount and interact with Vue components in an isolated manner.

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
