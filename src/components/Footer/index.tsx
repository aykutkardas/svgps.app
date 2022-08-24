import packageJson from "../../../package.json";

const Footer = () => (
  <div className="w-full flex flex-column items-center justify-center h-6 text-xs font-medium text-neutral-600 dark:text-neutral-400">
    <span>v{packageJson.version}</span>
  </div>
);

export default Footer;
