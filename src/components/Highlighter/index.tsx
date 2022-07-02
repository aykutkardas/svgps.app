import { useContext } from "react";

import SyntaxHighlighter, {
  SyntaxHighlighterProps,
} from "react-syntax-highlighter";
import {
  atomDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

import { ThemeContext } from "src/context/themeContext";

const Highlighter = ({ children, ...props }: SyntaxHighlighterProps) => {
  const { theme } = useContext(ThemeContext);

  const highlighterTheme = theme === "dark" ? atomDark : oneLight;

  return (
    // @ts-ignore [TODO]: Fix this
    <SyntaxHighlighter style={highlighterTheme} {...props}>
      {children}
    </SyntaxHighlighter>
  );
};

export default Highlighter;
