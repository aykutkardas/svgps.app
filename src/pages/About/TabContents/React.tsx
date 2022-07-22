import Highlighter from "src/components/Highlighter";

import styles from "../About.module.css";

const TabContentReact = () => (
  <div>
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
    <p>
      <a
        className={styles.Link}
        href="https://github.com/aykutkardas/react-icomoon"
        target="_blank"
        rel="noopener noreferrer"
      >
        react-icomoon
      </a>
    </p>
  </div>
);

export default TabContentReact;
