import Icon from "src/components/Icon";

import { ReactComponent as IntroSVG } from "./Intro.svg";

const tabs = [
  {
    value: "react",
    icon: "react",
    label: "React",
    link: "https://github.com/aykutkardas/react-icomoon",
  },
  {
    value: "react-native",
    icon: "react",
    label: "React Native",
    link: "https://github.com/aykutkardas/react-icomoon#react-native---demo",
  },
  {
    value: "vue",
    icon: "vue",
    label: "Vue",
    link: "https://github.com/aykutkardas/vue-icomoon",
  },
  {
    value: "svelte",
    icon: "svelte",
    label: "Svelte",
  },
  {
    value: "cli",
    icon: "terminal",
    label: "CLI",
    link: "https://github.com/aykutkardas/svelte-icomoon",
  },
];

const About = () => (
  <div className="max-w-full md:max-w-[500px] mx-auto h-full my-auto">
    <div className="flex flex-col items-center justify-center mx-auto">
      <h2 className="font-bold text-2xl m-2 text-neutral-900 dark:text-white">
        Introduction
      </h2>
      <p className="text-center text-neutral-600 dark:text-neutral-400">
        This app converts your icon files into a single JSON file. With this
        file, you can easily use SVG icons in your frontend and mobile projects
        or save your icon collection as a single file.
      </p>
      <IntroSVG className="opacity-50 fill-neutral-700 dark:fill-neutral-50" />
      <div className="absolute bottom-0 flex justify-center">
        {tabs.map((tab) => (
          <a
            key={tab.label}
            href={tab.link}
            className="inline-flex items-center select-none p-2 opacity-75 hover:opacity-100 dark:text-white group text-sm sm:text-base"
            target="_blank"
            rel="noreferrer"
            role="button"
          >
            <Icon
              icon={tab.icon}
              className="mr-1 w-3 h-3 sm:w-4 sm:h-4  grayscale group-hover:grayscale-0"
            />
            <span>{tab.label}</span>
          </a>
        ))}
      </div>
    </div>
  </div>
);

export default About;
