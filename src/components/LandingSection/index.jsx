import styles from "./LandingSection.module.css";

const LandingSection = () => (
  <div className={styles.LandingSection}>
    <h2 className={styles.Header}>Introduction</h2>
    <p>
      This app converts your icon files into a single JSON file. With this file,
      you can easily use SVG icons in your frontend and mobile projects or save
      your icon collection as a single file.
    </p>
    <p>
      <b>Note:</b> Currently in <span>BETA</span> and still in development.
    </p>
  </div>
);

export default LandingSection;
