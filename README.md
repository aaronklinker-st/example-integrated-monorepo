# Example Integrated Monorepo

Basic integrated monorepo with an electron app, web extension, and shared ui/background packages.

How does it work? There are paths listed as aliases in the `tsconfig.json`.

https://github.com/aaronklinker-st/example-integrated-monorepo/blob/be62a4a76a3c5e56f1d7e6d60068da0201e19f60/tsconfig.json#L14-L23

Workspace modules, like `@ui`, are imported using those aliases. This means they are imported as relative paths (just like any other local TS file), instead of NPM packages inside the node_modules directory. This way, you don't need to build any shared packages.

> In fact, none of the `packages/*/package.json` contain a `build` script.

That said, every app needs to include the build configuration to build all their dependencies. So even though the `apps/desktop` app doesn't include any `.vue` files, it still needs to include the `@vitejs/plugin-vue` plugin to use the `@ui` package. We can get around this by sharing a build configuration so we aren't rewriting our vite config for every app.

https://github.com/aaronklinker-st/example-integrated-monorepo/blob/be62a4a76a3c5e56f1d7e6d60068da0201e19f60/vite.shared.cts#L29-L31

Another thing to point out is that there are no dependencies in any of the `package.json`s other than the root. All dependencies for all apps and packages are listed in the root `package.json`.

## Setup

```sh
pnpm i
cd apps/extension
pnpm dev
```

In dev mode, you can save changes to the `packages/ui` module and see the changes in real time. Same if you had started the electron app:

```sh
cd apps/desktop
pnpm dev
```
