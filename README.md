![SVGPS](./.github/svgps-cover.png)

## What is SVGPS?

`SVGPS` converts your icons into a single JSON file that is ready to use in your frontend or mobile projects.

## Why do you need it?

Dealing with a large number of icon files, converting them into components or using them directly as SVGs can be frustrating. You can convert your icons into fonts, but unfortunately, it deprives us of the benefits of SVG format. That is why we found a way to store all our icons in a single JSON file and use them as SVGs!

## How does it work?

Just import the icons that you want to use in your project! You can rename your icons, add new ones or remove them as you like. After creating a set of icons, SVGPS parses the data of that set and creates the single file you need. You can use that JSON file directly in your projects with the help of [react-icomoon](https://github.com/aykutkardas/react-icomoon), [vue-icomoon](https://github.com/aykutkardas/vue-icomoon) or [svelte-icomoon](https://github.com/aykutkardas/svelte-icomoon) packages.

## What is Icomoon?

[Icomoon](https://icomoon.io/) is an icon management tool that allows you to convert your icon packs into many different formats. It produces a document for your packs, and `SVGPS` is built as an alternative to smooth the conversion process by allowing you to get a JSON file directly without feeling lost.

## Supported Frameworks

- [React](https://github.com/aykutkardas/react-icomoon)
- [React Native](https://github.com/aykutkardas/react-icomoon#react-native---demo)
- [Preact](https://github.com/aykutkardas/preact-icomoon)
- [Vue](https://github.com/aykutkardas/vue-icomoon)
- [Svelte](https://github.com/aykutkardas/svelte-icomoon)

### Usage Example

Your `Icon` component and the `JSON` file you created are located in the same directory and combined with the help of `*-icomoon` packages previously mentioned.

```
Icon
|____ Icon.jsx
|____ selection.json
```

```jsx
// Icon.jsx
import IcoMoon from "react-icomoon";
import iconSet from "./selection.json";

const Icon = (props) => <IcoMoon iconSet={iconSet} {...props} />;

export default Icon;
```

See [react-icomoon](https://github.com/aykutkardas/react-icomoon) or [vue-icomoon](https://github.com/aykutkardas/vue-icomoon) for details on how to use the `Icon` component.

---

## Development

Requires Node.js 22+ and Yarn 1 (`corepack yarn`). Copy `.env.example` to `.env.local` and fill in the Supabase keys; the store pages need them, the collection works without.

```bash
yarn install
yarn dev        # http://localhost:3000
```

| Script           | What it does                                       |
| ---------------- | -------------------------------------------------- |
| `yarn check`     | Lint and format with [Biome](https://biomejs.dev), applying fixes |
| `yarn typecheck` | Generate Next.js types and run `tsc`               |
| `yarn test`      | Unit, snapshot and contract tests (Vitest)         |
| `yarn build`     | Production build                                   |
| `yarn smoke`     | Start the production build and check every route   |

The snapshot tests pin the exported `selection.json` format and SVG/JSX output. If a change alters them on purpose, update them with `yarn test -u` in a separate, reviewed commit.

---

## Become a sponsor to Core Maintainers 🥤

[![aykutkardas](https://avatars.githubusercontent.com/u/7966133?s=48&v=4)](https://www.buymeacoffee.com/aykutkardas)
[![gizemnkorkmaz](https://avatars.githubusercontent.com/u/66412137?s=48&v=4)](https://github.com/sponsors/gizemnkorkmaz)

---

### Related Links

- [svgps](https://github.com/aykutkardas/svgps)
- [svgps-cli](https://github.com/aykutkardas/svgps-cli)
