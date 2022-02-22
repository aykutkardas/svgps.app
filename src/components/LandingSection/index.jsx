import styles from "./LandingSection.module.css";

const LandingSection = () => (
  <div className={styles.LandingSection}>
    <h1 className={styles.Header}>SVGPS</h1>
    <p>
      Online <span className={styles.Highlight}>selection.json</span> file
      generator.
    </p>
  </div>
);

export default LandingSection;
