import packageJson from "../../package.json";

const Footer = () => (
  <footer className="flex h-12 items-end justify-center text-xs font-medium text-neutral-500">
    <span className="mt-1 font-bold">v {packageJson.version}</span>
  </footer>
);

export default Footer;
