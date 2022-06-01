import Highlight from "react-highlight";

import styles from "../About.module.css";

const TabContentReact = () => (
  <div>
    <p>Install</p>
    <Highlight className="bash">{`npm install react-icomoon`}</Highlight>
    <Highlight className="bash">{`yarn add react-icomoon`}</Highlight>
    <p>Define `Icon.jsx` component</p>
    <Highlight className="react">
      {`
import IcoMoon from "react-icomoon";
import iconSet from "./selection.json";

const Icon = (props) => (
  <IcoMoon iconSet={iconSet} {...props} />
);

export default Icon;
        `}
    </Highlight>
    <p>And use</p>
    <Highlight className="react">
      {`
import Icon from "./components/Icon";

<Icon icon="pencil" size={20} color="#f00" />
        `}
    </Highlight>
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
