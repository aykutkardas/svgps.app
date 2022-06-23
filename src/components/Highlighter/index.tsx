import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const Highlighter = ({ children, ...props }) => (
  <SyntaxHighlighter style={a11yDark} {...props}>
    {children}
  </SyntaxHighlighter>
);

export default Highlighter;
