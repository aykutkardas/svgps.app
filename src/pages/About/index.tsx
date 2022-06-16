import styles from "./About.module.css";

import Tabs from "src/components/Tabs";
import Contributors from "src/components/Contributors";
import TabContentReact from "src/pages/About/TabContents/React";
import TabContentReactNative from "src/pages/About/TabContents/ReactNative";
import TabContentVue from "src/pages/About/TabContents/Vue";
import TabContentSvelte from "src/pages/About/TabContents/Svelte";

import { ReactComponent as IntroSVG } from "./Intro.svg";

const About = () => {
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
  ];

  return (
    <div className={styles.About}>
      <div className={styles.Introduction}>
        <h2 className={styles.AboutTitle}>Introduction</h2>
        <p className={styles.AboutDescription}>
          This app converts your icon files into a single JSON file. With this
          file, you can easily use SVG icons in your frontend and mobile
          projects or save your icon collection as a single file.
        </p>
        <IntroSVG className={styles.IntroSVG} />
      </div>
      <Tabs tabs={tabs} />
      <Contributors />
    </div>
  );
};

export default About;
