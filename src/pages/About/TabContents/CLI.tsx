import Highlighter from "src/components/Highlighter";

import styles from "../About.module.css";

const TabContentCLI = () => (
  <div>
    <p>Install</p>
    <Highlighter language="bash">{`npm install -g svgps-cli`}</Highlighter>
    <Highlighter language="bash">{`yarn global add svgps-cli`}</Highlighter>
    <p>Usage command</p>
    <Highlighter language="bash">
      {`
svgps <your-icons-path> <json-output-path.json> --template icomoon
        `}
    </Highlighter>
    <p>
      <a
        className={styles.Link}
        href="https://github.com/aykutkardas/svgps-cli"
        target="_blank"
        rel="noopener noreferrer"
      >
        svgps-cli
      </a>
    </p>
  </div>
);

export default TabContentCLI;
