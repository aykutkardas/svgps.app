import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierCaveDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

import Icon from "src/components/Icon";
import Button from "../Button";

const CodeHighlight = ({ data, onCopyCode }) => (
  <div className="group relative">
    <Button onClick={onCopyCode} className="sticky left-full top-2">
      <Icon
        size={24}
        icon="copy"
        className="mr-1 text-black opacity-0 transition-all group-hover:opacity-70 dark:text-white"
      />
    </Button>
    <SyntaxHighlighter
      language={data.syntax}
      style={atelierCaveDark}
      showLineNumbers
      customStyle={{
        marginTop: -42,
      }}
    >
      {data.sample}
    </SyntaxHighlighter>
  </div>
);

export default CodeHighlight;
