import packageJson from "../../package.json";

const Footer = () => (
  <footer className="flex flex-col items-center justify-center text-xs font-medium text-neutral-500">
    <a
      href="https://github.com/aykutkardas/svgps.app#become-a-sponsor-to-core-maintainers-"
      className="text-purple-500"
    >
      Become a Sponsor
    </a>
    <span className="mt-1 font-roboto">v{packageJson.version}</span>
  </footer>
);

export default Footer;
