/**
 * Starts the production build and checks that every public route still
 * responds. Run after `yarn build`: `node scripts/smoke.mjs`.
 */
import { spawn } from "node:child_process";

const port = process.env.PORT || "3123";
const base = `http://localhost:${port}`;

// Every page currently bails out to client-side rendering (useSearchParams in
// Header without <Suspense>), so only the document shell can be asserted.
// Add page-specific text checks once pages render on the server again.
const routes = [
  ["/", null],
  ["/store", null],
  ["/store/feather", null],
  ["/store/google-material-icons/outlined", null],
  ["/collection", null],
  ["/collection/some-id", null],
  ["/auth-redirect", null],
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
  for (const [route, text] of routes) {
    const res = await fetch(base + route);
    const html = await res.text();
    const ok =
      res.status === 200 &&
      html.includes("<title>SVGPS") &&
      (!text || html.includes(text));
    if (!ok) failed = true;
    console.log(`${ok ? "ok  " : "FAIL"} ${res.status} ${route}`);
  }
} catch (error) {
  console.error(error);
  failed = true;
} finally {
  server.kill();
}

process.exit(failed ? 1 : 0);
