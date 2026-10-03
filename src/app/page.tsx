import Link from "next/link";

import Header from "src/components/Header";
import Footer from "src/components/Footer";
import Icon from "src/components/Icon";
import SupportButton from "src/components/SupportButton";
import Sample from "src/components/Sample";
import { buttonClassName } from "src/components/Button";
import iconSets from "src/iconSets";

const iconCount = iconSets.reduce((acc, iconSet) => acc + iconSet.count, 0);
const formatCount = (count: number) =>
  new Intl.NumberFormat("en", { notation: "compact" }).format(count);

const steps = [
  {
    icon: "upload",
    title: "Import",
    text: "Drop in SVG files or an existing IcoMoon selection.json.",
  },
  {
    icon: "squares-plus",
    title: "Collect",
    text: "Pick icons from the store, rename and organize them.",
  },
  {
    icon: "filetype-json",
    title: "Export",
    text: "Download one JSON file and render it with react, vue or svelte-icomoon.",
  },
];

const HomePage = () => (
  <div className="container mx-auto flex min-h-screen flex-col">
    <Header />
    <main className="flex flex-1 flex-col justify-center gap-16 py-10 lg:py-16">
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        <div className="flex max-w-[600px] animate-fade-in flex-col items-start">
          <a
            href="https://github.com/aykutkardas/svgps.app"
            target="_blank"
            rel="noreferrer"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/[0.04] py-1 pr-3 pl-1 text-xs text-fg-muted transition hover:border-accent/50 hover:text-fg"
          >
            <span className="rounded-full bg-accent-soft px-2 py-0.5 font-medium text-accent-fg">
              Free
            </span>
            Open source on GitHub
            <Icon icon="arrow-up-right" size={12} />
          </a>
          <h1 className="text-[44px] leading-[1.05] font-bold tracking-tight text-fg sm:text-6xl">
            No need for
            <span className="block bg-linear-to-r from-violet-300 via-purple-400 to-fuchsia-400 bg-clip-text pb-1 text-transparent">
              a bunch of files!
            </span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-fg-muted lg:text-lg">
            <span className="font-semibold text-fg">SVGPS</span> removes the
            burden of working with a cluster of SVG files by converting your
            icons into{" "}
            <span className="text-emerald-300 underline decoration-emerald-400/50 decoration-dotted underline-offset-4">
              a single JSON file.
            </span>{" "}
            You can easily use this file in your{" "}
            <span className="text-violet-300 underline decoration-violet-400/50 decoration-dotted underline-offset-4">
              frontend
            </span>{" "}
            or{" "}
            <span className="text-pink-300 underline decoration-pink-400/50 decoration-dotted underline-offset-4">
              mobile
            </span>{" "}
            projects.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/collection"
              className={buttonClassName("primary", "h-11 px-5 text-[15px]")}
            >
              Start Converting
              <Icon icon="chevron-right" size={16} />
            </Link>
            <Link
              href="/store"
              className={buttonClassName("secondary", "h-11 px-5 text-[15px]")}
            >
              Explore Store
            </Link>
          </div>
          <dl className="mt-10 flex gap-8 text-sm">
            <div>
              <dt className="text-fg-subtle">Icons</dt>
              <dd className="mt-0.5 text-xl font-semibold text-fg">
                {formatCount(iconCount)}+
              </dd>
            </div>
            <div>
              <dt className="text-fg-subtle">Icon sets</dt>
              <dd className="mt-0.5 text-xl font-semibold text-fg">
                {iconSets.length}
              </dd>
            </div>
            <div>
              <dt className="text-fg-subtle">Frameworks</dt>
              <dd className="mt-0.5 text-xl font-semibold text-fg">5</dd>
            </div>
          </dl>
        </div>
        <div className="hidden animate-fade-in [animation-delay:120ms] lg:block">
          <Sample />
        </div>
      </div>
      <ol className="grid gap-3 sm:grid-cols-3">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="flex gap-4 rounded-2xl border border-line bg-surface/60 p-5 backdrop-blur-sm"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-fg">
              <Icon icon={step.icon} size={20} />
            </span>
            <div>
              <h2 className="text-sm font-semibold text-fg">
                <span className="mr-1.5 text-fg-subtle">{index + 1}.</span>
                {step.title}
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-fg-muted">
                {step.text}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </main>
    <SupportButton />
    <Footer />
  </div>
);

export default HomePage;
