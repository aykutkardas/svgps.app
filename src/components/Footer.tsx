import packageJson from "../../package.json";

const Footer = () => (
  <footer className="text-center text-xs font-medium text-neutral-500">
    v{packageJson.version}
  </footer>
);

export default Footer;
