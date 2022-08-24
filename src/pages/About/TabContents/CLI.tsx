import Highlighter from "src/components/Highlighter";
import Icon from "src/components/Icon";

const TabContentCLI = () => (
  <div>
    <p>
      <a
        className="text-white"
        href="https://github.com/aykutkardas/svgps-cli"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon icon="github" size={18} />
        svgps-cli
      </a>
      <a
        className="text-white"
        href="https://www.npmjs.com/package/svgps-cli"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon icon="npm" size={16} color="#ea2039" />
        npm
      </a>
    </p>
    <p>Install</p>
    <Highlighter language="bash">{`npm install -g svgps-cli`}</Highlighter>
    <Highlighter language="bash">{`yarn global add svgps-cli`}</Highlighter>
    <p>And use</p>
    <Highlighter language="bash">
      {`
svgps <your-icons-path> <json-output-path.json> --template icomoon
        `}
    </Highlighter>
  </div>
);

export default TabContentCLI;
