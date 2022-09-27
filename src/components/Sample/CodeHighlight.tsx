import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierCaveDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CodeHighlight = ({ data }) => (
  <SyntaxHighlighter
    language={data.syntax}
    style={atelierCaveDark}
    showLineNumbers
  >
    {data.sample}
  </SyntaxHighlighter>
);

export default CodeHighlight;
