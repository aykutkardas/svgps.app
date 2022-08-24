import Tabs from "src/components/Tabs";
import Contributors from "src/components/Contributors";
import TabContentReact from "src/pages/About/TabContents/React";
import TabContentReactNative from "src/pages/About/TabContents/ReactNative";
import TabContentVue from "src/pages/About/TabContents/Vue";
import TabContentSvelte from "src/pages/About/TabContents/Svelte";
import TabContentCLI from "src/pages/About/TabContents/CLI";

import { ReactComponent as IntroSVG } from "./Intro.svg";

import Icon from "src/components/Icon";

const tabs = [
  {
    value: "react",
    icon: "react",
    label: "React",
    content: <TabContentReact />,
  },
  {
    value: "react-native",
    icon: "react",
    label: "React Native",
    content: <TabContentReactNative />,
  },
  {
    value: "vue",
    icon: "vue",
    label: "Vue",
    content: <TabContentVue />,
  },
  {
    value: "svelte",
    icon: "svelte",
    label: "Svelte",
    content: <TabContentSvelte />,
  },
  {
    value: "cli",
    icon: "terminal",
    label: "CLI",
    content: <TabContentCLI />,
  },
];

const About = () => (
  <div className="max-w-full md:max-w-[500px] mx-auto">
    <div className="flex flex-col items-center justify-center mx-auto h-screen">
      <h2 className="font-bold text-2xl m-2 text-neutral-900 dark:text-white">
        Introduction
      </h2>
      <p className="text-center text-neutral-600 dark:text-neutral-400">
        This app converts your icon files into a single JSON file. With this
        file, you can easily use SVG icons in your frontend and mobile projects
        or save your icon collection as a single file.
      </p>
      <IntroSVG className="opacity-50 fill-neutral-700 dark:fill-neutral-50" />
    </div>

    <div className="h-screen -mt-20">
      <Tabs tabs={tabs} />
    </div>

    <div className="flex flex-col items-center justify-center">
      <h3 className="font-bold text-sm text-neutral-900 dark:text-white mb-3">
        What's next?
      </h3>
      <ul>
        <li className="text-sm text-neutral-900 dark:text-neutral-400 aling-middle">
          <Icon icon="zap" size={13} className="text-yellow-500 mr-1" />
          Drag & Drop support
        </li>
        <li className="text-sm text-neutral-900 dark:text-neutral-400 aling-middle">
          <Icon icon="rocket" size={14} className="text-purple-500 mr-1" />
          List of free icons
        </li>
        <li className="text-sm text-neutral-900 dark:text-neutral-400 aling-middle">
          <Icon icon="angular" size={13} className="text-red-500 mr-1" />
          Angular support
        </li>
      </ul>
    </div>

    <Contributors />
  </div>
);

export default About;
