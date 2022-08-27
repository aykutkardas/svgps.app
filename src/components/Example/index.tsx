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
      <div
        className={cx(
          "flex justify-center overflow-hidden rounded-lg border bg-gradient-to-t shadow-lg",
          "border-neutral-300/50 from-neutral-300 to-neutral-200",
          "dark:border-neutral-800/50 dark:from-neutral-800 dark:to-neutral-900"
        )}
      >
        {data.map((item) => (
          <div
            key={item.label}
            className={cx(
              "group m-1 flex cursor-pointer select-none flex-col items-center justify-between rounded-md p-4 transition-all duration-300 hover:opacity-100 md:h-24 md:w-32",
              {
                "bg-gradient-to-tr from-fuchsia-500/70 to-purple-500/70 text-neutral-50 opacity-100 shadow-inner dark:from-fuchsia-700/50 dark:to-purple-700/70":
                  item.value === selected.value,
                "text-neutral-800 opacity-60 dark:text-neutral-200 dark:opacity-30 hover:dark:opacity-100":
                  item.value !== selected.value,
              }
            )}
            onClick={() => setSelect(item)}
          >
            <Icon
              icon={item.icon}
              className={
                "mb-1 h-6 w-6 text-neutral-800 dark:text-neutral-200 md:h-[35px] md:w-[35px]"
              }
            />
            <span className="text-center text-sm text-current">
              {item.label}
            </span>
          </div>
        ))}
      </div>
      <div
        className={cx(
          "mt-3 flex justify-center overflow-hidden rounded-lg border bg-gradient-to-t shadow-lg",
          "border-neutral-300/50 from-neutral-300 to-neutral-200",
          "dark:border-neutral-800/50 dark:from-neutral-800 dark:to-neutral-900"
        )}
      >
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
        className="mt-2 inline-flex items-center text-neutral-600 hover:text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-200"
      >
        <Icon size={20} icon="github" className="mr-1" />
        {selected.link.title}
      </a>
    </div>
  );
};

export default Example;
