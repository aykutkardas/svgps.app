import ReactTooltip from "react-tooltip";

import styles from "./ReportIcon.module.css";

import Icon from "src/components/Icon";
import { IconType } from "src/types";

interface ReportIconProps {
  icon: IconType;
}

const ReportIcon = ({ icon }: ReportIconProps) => {
  const body = encodeURI(`
  **SVG:** 
  \`\`\`html
  ${icon.content}
  \`\`\`
  ---
  `);

  return (
    <>
      <ReactTooltip />
      <a
        className={styles.ReportIcon}
        href={`https://github.com/aykutkardas/svgps.app/issues/new?&body=${body}`}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => e.stopPropagation()}
      >
        <Icon
          icon="bug"
          size={10}
          data-tip="Report a Problem"
          data-background-color="var(--neutral-600)"
          data-effect="solid"
        />
      </a>
    </>
  );
};

export default ReportIcon;