import packageJson from "../../package.json";

const Footer = () => (
  <footer className="flex h-14 shrink-0 items-center justify-center gap-3 text-xs text-fg-subtle">
    <span>Open source icon store &amp; converter</span>
    <span aria-hidden className="size-1 rounded-full bg-line-strong" />
    <a
      href="https://github.com/aykutkardas/svgps.app/releases"
      target="_blank"
      rel="noreferrer"
      className="font-medium transition hover:text-fg-muted"
    >
      v{packageJson.version}
    </a>
  </footer>
);

export default Footer;
