import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import clsx from "clsx";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";

import data from "./data";

import Icon from "src/components/Icon";

const CodeHighlight = dynamic(
  () => import("src/components/Sample/CodeHighlight"),
  { ssr: false }
);

const Sample = ({ className }) => {
  const [selected, setSelect] = useState(data[0]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [tabPosition, setTabPosition] = useState(0);
  const [isCodeCopied, setCodeCopied] = useState(false);

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (wrapperRef.current) {
      const elementWidth = wrapperRef.current.clientWidth / data.length;
      setTabPosition(elementWidth * selectedIndex);
    }
  }, [wrapperRef, selectedIndex]);

  const copySelectedCodeSnippet = () => {
    setCodeCopied(true)
    copy(selected.sample);
    toast.success("Code copied!");
    setTimeout(()=>setCodeCopied(false),1500)
  };

  return (
    <div className={clsx("flex h-full flex-col justify-center", className)}>
      <div
        ref={wrapperRef}
        className={clsx(
          "relative flex justify-center overflow-hidden rounded-lg border bg-gradient-to-t shadow-lg",
          "border-neutral-200/50 from-neutral-200 to-neutral-100",
          "dark:border-neutral-800/50 dark:from-neutral-800 dark:to-neutral-900"
        )}
      >
        <div
          className="absolute left-1 top-1 mr-1 h-24 w-[110px] rounded-md bg-gradient-to-tr from-purple-500/70 to-violet-500/70 shadow-inner transition-all duration-300 dark:from-purple-700/50 dark:to-violet-700/70"
          style={{
            transform:
              selectedIndex === 0 ? "none" : `translateX(${tabPosition}px)`,
          }}
        />
        {data.map((item, index) => (
          <div
            key={item.label}
            className={clsx(
              "group z-10 m-1 flex h-24 w-[110px] cursor-pointer select-none flex-col items-center justify-between rounded-md p-3 transition-all duration-300 hover:opacity-100",
              item.value === selected.value
                ? "text-neutral-50 opacity-100"
                : "text-neutral-500 opacity-70 dark:text-neutral-200 dark:opacity-30 hover:dark:opacity-100"
            )}
            onClick={() => {
              setSelect(item);
              setSelectedIndex(index);
            }}
          >
            <Icon
              icon={item.icon}
              className={clsx(
                "h-6 w-6 md:h-[35px] md:w-[35px]",
                "[&_path]:fill-neutral-400 dark:[&_path]:fill-neutral-100",
                "[&_path[fill='#aaa']]:fill-neutral-200 dark:[&_path[fill='#aaa']]:fill-neutral-400",
                "[&_path[fill='#ffffff']]:fill-neutral-200 dark:[&_path[fill='#ffffff']]:fill-neutral-800",
                { "[&_path]:fill-neutral-50": item.value === selected.value }
              )}
            />
            <span className="text-center text-sm text-current">
              {item.label}
            </span>
          </div>
        ))}
      </div>
      <div
        className={clsx(
          "mt-3 flex justify-center overflow-hidden rounded-lg border bg-gradient-to-t shadow-lg",
          "border-neutral-200/50 from-neutral-200 to-neutral-100",
          "dark:border-neutral-800/50 dark:from-neutral-800 dark:to-neutral-900"
        )}
      >
        <div
          className={clsx(
            "h-52 w-full overflow-auto",
            "[&_pre]:!bg-transparent [&_code]:!font-fira [&_code]:!text-xs [&_code]:sm:!text-sm",
            "[&_.linenumber]:!w-8 [&_.linenumber]:!text-neutral-300 dark:[&_.linenumber]:!text-neutral-700"
          )}
        >
          <CodeHighlight onCopyCode={copySelectedCodeSnippet} data={selected} isCodeCopied={isCodeCopied} />
        </div>
      </div>
      <div className="mt-2 flex gap-4 text-sm ">
        <a
          href={selected.link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-neutral-600 hover:text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-200"
        >
          <Icon size={20} icon="github" className="mr-1" />
          {selected.link.title}
        </a>
        <a
          href={selected.demo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center text-neutral-600 hover:text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-200"
        >
          <Icon
            size={19}
            icon={selected.demo.icon}
            className="mr-1 text-black opacity-70 group-hover:opacity-100 dark:text-white"
          />
          demo
        </a>
      </div>
    </div>
  );
};

export default Sample;
