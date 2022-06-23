import SyntaxHighlighter, {
  SyntaxHighlighterProps,
} from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const Highlighter = ({ children, ...props }: SyntaxHighlighterProps) => (
  // @ts-ignore [TODO]: Fix this
  <SyntaxHighlighter style={atomDark} {...props}>
    {children}
  </SyntaxHighlighter>
);

export default Highlighter;
