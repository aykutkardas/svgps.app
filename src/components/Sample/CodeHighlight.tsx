import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierCaveDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface CodeHighlightProps {
  data: {
    syntax: string;
    sample: string;
    [key: string]: any;
  };
}

const CodeHighlight = ({ data }: CodeHighlightProps) => (
  // @ts-expect-error
  <SyntaxHighlighter
    language={data.syntax}
    style={atelierCaveDark}
    showLineNumbers
    customStyle={{ margin: 0, padding: "0.5rem 1rem 0.5rem 0.25rem" }}
  >
    {data.sample}
  </SyntaxHighlighter>
);

export default CodeHighlight;
