"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import clsx from "clsx";

import data from "./data";

import Icon from "src/components/Icon";
import { copyText } from "src/utils/copyText";

const CodeHighlight = dynamic(
  () => import("src/components/Sample/CodeHighlight"),
  { ssr: false },
);

const fileNames = {
  vue: "Icon.vue",
  svelte: "Icon.svelte",
};

const Sample = ({ className }: { className?: string }) => {
  const [selected, setSelect] = useState(data[0]);
  const [isCodeCopied, setCodeCopied] = useState(false);

  const copySelectedCodeSnippet = async () => {
    if (!(await copyText(selected.sample, "Code copied!"))) return;
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 1500);
  };

  return (
    <div className={clsx("flex flex-col gap-3", className)}>
      <div
        role="tablist"
        aria-label="Framework"
        className="grid grid-cols-5 gap-1 rounded-2xl border border-line bg-surface/80 p-1.5 shadow-elevated backdrop-blur-md"
      >
        {data.map((item) => {
          const active = item.value === selected.value;
          return (
            <button
              key={item.label}
              role="tab"
              aria-selected={active}
              className={clsx(
                "group flex flex-col items-center gap-2 rounded-xl px-2 py-3 transition duration-200",
                active
                  ? "bg-linear-to-b from-violet-500/30 to-violet-600/20 text-fg shadow-[inset_0_0_0_1px_rgb(167_139_250/0.35)]"
                  : "text-fg-subtle hover:bg-white/[0.04] hover:text-fg-muted",
              )}
              onClick={() => setSelect(item)}
            >
              <Icon
                icon={item.icon}
                className={clsx(
                  "size-7 transition",
                  "[&_path]:fill-neutral-100 [&_path[fill='#aaa']]:fill-neutral-400 [&_path[fill='#ffffff']]:fill-neutral-800",
                  active ? "opacity-100" : "opacity-40 group-hover:opacity-80",
                )}
              />
              <span className="text-xs font-medium whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
      <div className="overflow-hidden rounded-2xl border border-line bg-[#0f0f13]/90 shadow-elevated backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
          <div className="flex items-center gap-3">
            <span className="flex gap-1.5" aria-hidden>
              <span className="size-2.5 rounded-full bg-white/10" />
              <span className="size-2.5 rounded-full bg-white/10" />
              <span className="size-2.5 rounded-full bg-white/10" />
            </span>
            <span className="font-fira text-xs text-fg-subtle">
              {fileNames[selected.value] || "Icon.jsx"}
            </span>
          </div>
          <button
            onClick={copySelectedCodeSnippet}
            aria-label="Copy code"
            className={clsx(
              "flex size-7 items-center justify-center rounded-md transition hover:bg-white/[0.06]",
              isCodeCopied
                ? "text-emerald-400"
                : "text-fg-subtle hover:text-fg",
            )}
          >
            <Icon size={16} icon={isCodeCopied ? "check" : "copy"} />
          </button>
        </div>
        <div
          className={clsx(
            "h-56 w-full overflow-auto py-2",
            "[&_pre]:bg-transparent! [&_code]:font-fira! [&_code]:text-xs! sm:[&_code]:text-[13px]!",
            "[&_.linenumber]:w-8! [&_.linenumber]:text-white/15!",
          )}
        >
          <CodeHighlight data={selected} />
        </div>
      </div>
      <div className="flex gap-2 text-sm">
        <a
          href={selected.link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-fg-muted transition hover:bg-white/[0.05] hover:text-fg"
        >
          <Icon size={16} icon="github" />
          {selected.link.title}
        </a>
        <a
          href={selected.demo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-fg-muted transition hover:bg-white/[0.05] hover:text-fg"
        >
          <Icon size={16} icon={selected.demo.icon} className="text-white" />
          Live demo
        </a>
      </div>
    </div>
  );
};

export default Sample;
