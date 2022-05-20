import ReactTooltip from "react-tooltip";

import styles from "./ReportIcon.module.css";

import Icon from "src/components/Icon";
import { IconType } from "src/types";

interface ReportIconProps {
  icon: IconType;
}

const ReportIcon = ({ icon }: ReportIconProps) => {
  const title = encodeURI("[Parse]: ");
  const body = encodeURI(`
  **SVG:** 
  \`\`\`html
  ${icon.content.replace(/#/g, "-")}
  \`\`\`
  ---
  `);

  return (
    <>
      <ReactTooltip />
      <a
        className={styles.ReportIcon}
        href={`https://github.com/aykutkardas/svgps.app/issues/new?title=${title}&body=${body}`}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => e.stopPropagation()}
        data-tip="Report a Problem"
        data-background-color="var(--neutral-600)"
        data-effect="solid"
      >
        <Icon icon="bug" size={10} />
      </a>
    </>
  );
};

export default ReportIcon;
