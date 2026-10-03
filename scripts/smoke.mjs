/**
 * Starts the production build and checks that every public route still
 * responds. Run after `yarn build`: `node scripts/smoke.mjs`.
 */
import { spawn } from "node:child_process";

const port = process.env.PORT || "3123";
const base = `http://localhost:${port}`;

// [route, text that must be in the server-rendered HTML, expected <title>]
// `href="/store"` comes from the Header nav and proves the page is not
// bailing out to client-side rendering.
const header = 'href="/store"';
const defaultTitle = "SVGPS - Your Icon Store and Storage";
const collectionTitle = "SVGPS - Create your own icon collection";
const routes = [
  ["/", "No need for", defaultTitle],
  ["/store", header, "SVGPS - Icon Store"],
  ["/store/feather", header, "SVGPS - Feather - Icon Store"],
  [
    "/store/google-material-icons/outlined",
    header,
    "SVGPS - Google Material Icons - Icon Store",
  ],
  ["/collection", header, collectionTitle],
  ["/collection/some-id", header, collectionTitle],
  ["/auth-redirect", "Redirecting", defaultTitle],
];

const server = spawn(
  "node",
  ["node_modules/next/dist/bin/next", "start", "-p", port],
  {
    stdio: "inherit",
  },
);

const waitForServer = async () => {
  for (let i = 0; i < 60; i++) {
    try {
      await fetch(base);
      return;
    } catch {
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  throw new Error("Server did not start");
};

let failed = false;

try {
  await waitForServer();
  for (const [route, text, expectedTitle] of routes) {
    const res = await fetch(base + route);
    const html = await res.text();
    const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
    const ok =
      res.status === 200 && title === expectedTitle && html.includes(text);
    if (!ok) failed = true;
    console.log(`${ok ? "ok  " : "FAIL"} ${res.status} ${route} (${title})`);
  }
} catch (error) {
  console.error(error);
  failed = true;
} finally {
  server.kill();
}

process.exit(failed ? 1 : 0);
