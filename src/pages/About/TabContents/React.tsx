import Highlighter from "src/components/Highlighter";
import Icon from "src/components/Icon";

const TabContentReact = () => (
  <div>
    <p>
      <img
        src="https://camo.githubusercontent.com/b29ce5842da5de535c02a4cef083cd450288abce77f9fec99c1d2830c80f4588/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f64772f72656163742d69636f6d6f6f6e"
        alt="weekly downloads"
        height={18}
      />
      <a
        className="text-white"
        href="https://github.com/aykutkardas/react-icomoon"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon icon="github" size={18} />
        react-icomoon
      </a>
      <a
        className="text-white"
        href="https://www.npmjs.com/package/react-icomoon"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon icon="npm" size={16} color="#ea2039" />
        npm
      </a>
    </p>
    <p>Install</p>
    <Highlighter language="bash">{`npm install react-icomoon`}</Highlighter>
    <Highlighter language="bash">{`yarn add react-icomoon`}</Highlighter>
    <p>Define `Icon.jsx` component</p>
    <Highlighter>
      {`
import IcoMoon from "react-icomoon";
import iconSet from "./selection.json";

const Icon = (props) => (
  <IcoMoon iconSet={iconSet} {...props} />
);

export default Icon;
        `}
    </Highlighter>
    <p>And use</p>
    <Highlighter>
      {`
import Icon from "./components/Icon";

<Icon icon="pencil" size={20} color="#f00" />
        `}
    </Highlighter>
  </div>
);

export default TabContentReact;
