import styles from "./LandingSection.module.css";

import Tabs from "../Tabs";
import { ReactComponent as IntroSVG } from "./Intro.svg";

const LandingSection = () => {
  const tabs = [
    { name: "react", label: "React", content: "" },
    { name: "react", label: "React Native", content: "" },
    { name: "vue", label: "Vue", content: "" },
    { name: "svelte", label: "Svelte", content: "" },
    { name: "angular", label: "Angular", content: "" },
  ];

  return (
    <div className={styles.LandingSection}>
      <Tabs tabs={tabs} />
      <h2 className={styles.LandingSectionTitle}>Introduction</h2>
      <p>
        This app converts your icon files into a single JSON file. With this
        file, you can easily use SVG icons in your frontend and mobile projects
        or save your icon collection as a single file.
      </p>
      <p>
        <b>Note:</b> Currently in <span>BETA</span> and still in development.
      </p>
      <IntroSVG className={styles.IntroSVG} />

      <h4>Related Modules</h4>
      <a
        href="https://github.com/aykutkardas/react-icomoon"
        target="_blank"
        rel="noopener noreferrer"
      >
        react-icomoon
      </a>
      <a
        href="https://github.com/aykutkardas/vue-icomoon"
        target="_blank"
        rel="noopener noreferrer"
      >
        vue-icomoon
      </a>
      <a
        href="https://github.com/aykutkardas/svelte-icomoon"
        target="_blank"
        rel="noopener noreferrer"
      >
        svelte-icomoon
      </a>
    </div>
  );
};

export default LandingSection;
