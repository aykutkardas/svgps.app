import Highlight from "react-highlight";

import styles from "../About.module.css";

const TabContentReactNative = () => (
  <div>
    <p>Install</p>
    <Highlight className="bash">{`npm install react-icomoon react-native-svg`}</Highlight>
    <Highlight className="bash">{`yarn add react-icomoon react-native-svg`}</Highlight>
    <p>Define `Icon.jsx` component</p>
    <Highlight className="react">
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

export default TabContentReactNative;
