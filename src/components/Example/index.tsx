import { useState } from "react";
import cx from "classnames";

import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierCaveDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

import Icon from "src/components/Icon";

import { data } from "./data";

const Example = () => {
  const [selected, setSelect] = useState(data[0]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex justify-center overflow-hidden rounded-lg border border-neutral-800/50 bg-gradient-to-t from-neutral-800 to-neutral-900 shadow-lg">
        {data.map((item) => (
          <div
            key={item.label}
            className={cx(
              "group m-1 flex cursor-pointer select-none flex-col items-center justify-between rounded-md p-4 text-neutral-200 transition-all duration-300  hover:opacity-100 md:h-24 md:w-32",
              {
                "bg-gradient-to-tr from-fuchsia-700/50 to-purple-700/70 opacity-100 shadow-inner":
                  item.value === selected.value,
                "opacity-30": item.value !== selected.value,
              }
            )}
            onClick={() => setSelect(item)}
          >
            <Icon
              icon={item.icon}
              color={"white"}
              className={"mb-1 h-6 w-6 text-white md:h-[35px] md:w-[35px]"}
            />
            <span className="text-center text-sm text-current">
              {item.label}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-center overflow-hidden rounded-lg border border-neutral-800/50 bg-gradient-to-t from-neutral-800 to-neutral-900 shadow-lg">
        <div className="max-h-52 w-full overflow-auto [&>pre]:!bg-transparent [&>pre>code]:!font-fira [&>pre>code]:!text-xs [&>pre>code]:sm:!text-sm">
          {
            <SyntaxHighlighter
              language={selected.syntax}
              style={atelierCaveDark}
              showLineNumbers
            >
              {selected.example}
            </SyntaxHighlighter>
          }
        </div>
      </div>
      <a
        href={selected.link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex items-center text-neutral-400 hover:text-neutral-200"
      >
        <Icon size={20} icon="github" className="mr-1" />
        {selected.link.title}
      </a>
    </div>
  );
};

export default Example;
