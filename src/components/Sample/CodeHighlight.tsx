import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierCaveDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import clsx from "clsx";

import Icon from "src/components/Icon";
import Button from "../Button";

interface CodeHighlightProps {
  data: {
    syntax: string;
    sample: string;
    [key: string]: any;
  };
  onCopyCode: () => void;
  
  
}

const CodeHighlight = ({ data, onCopyCode}: CodeHighlightProps) => 
{
  const [isCodeCopied, setCodeCopied] = useState(false);
  const handleCopyCode=()=>{
    setCodeCopied(true)
    onCopyCode();
    setTimeout(()=>setCodeCopied(false),1500)
  }
  return(
  <div className="group relative">
    <Button
      variant="icon"
      onClick={handleCopyCode}
      className={clsx("sticky left-full top-2 mr-2", isCodeCopied ? "text-green-500" :" text-neutral-500" ,"opacity-0 group-hover:opacity-50")}
    >
    <Icon size={24} icon={isCodeCopied ? "check" :"copy"} /> 
    </Button>
    {/* @ts-ignore */}
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
);}

export default CodeHighlight;
