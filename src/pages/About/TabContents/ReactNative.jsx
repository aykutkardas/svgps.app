import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import styles from "../About.module.css";

const TabContentReactNative = () => (
  <div>
    <p>Install</p>
    <SyntaxHighlighter
      language="bash"
      style={a11yDark}
    >{`npm install react-icomoon react-native-svg`}</SyntaxHighlighter>
    <SyntaxHighlighter
      language="bash"
      style={a11yDark}
    >{`yarn add react-icomoon react-native-svg`}</SyntaxHighlighter>
    <p>Define `Icon.jsx` component</p>
    <SyntaxHighlighter style={a11yDark}>
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
    </SyntaxHighlighter>
    <p>And use</p>
    <SyntaxHighlighter style={a11yDark}>
      {`
import Icon from "./components/Icon";

<Icon icon="pencil" size={20} color="#f00" />
        `}
    </SyntaxHighlighter>
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
