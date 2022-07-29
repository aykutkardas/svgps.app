import { useContext } from "react";
import SyntaxHighlighter, {
  SyntaxHighlighterProps,
} from "react-syntax-highlighter";

import {
  atomOneDark,
  atomOneLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";

import { ThemeContext } from "src/context/themeContext";

const Highlighter = ({ children, ...props }: SyntaxHighlighterProps) => {
  const { theme } = useContext(ThemeContext);

  const highlighterTheme = theme === "dark" ? atomOneDark : atomOneLight;

  return (
    // @ts-ignore [TODO]: Fix type error
    <SyntaxHighlighter style={highlighterTheme} {...props}>
      {typeof children === "string" ? children.trim() : children}
    </SyntaxHighlighter>
  );
};

export default Highlighter;
