import Highlighter from "src/components/Highlighter";

import styles from "../About.module.css";

const TabContentReactNative = () => (
  <div>
    <p>Install</p>
    <Highlighter language="bash">{`npm install react-icomoon react-native-svg`}</Highlighter>
    <Highlighter language="bash">{`yarn add react-icomoon react-native-svg`}</Highlighter>
    <p>Define `Icon.jsx` component</p>
    <Highlighter>
      {`
import IcoMoon from "react-icomoon";
import { Svg, Path } from "react-native-svg";
import iconSet from "./selection.json";

const Icon = (props) => (
  <IcoMoon
    native
    SvgComponent={Svg}
    PathComponent={Path}
    iconSet={iconSet}
    {...props}
  />
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

export default TabContentReactNative;
