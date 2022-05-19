import ReactTooltip from "react-tooltip";

import styles from "./ReportIcon.module.css";

import Icon from "src/components/Icon";
import { IconType } from "src/types";

interface ReportIconProps {
  icon: IconType;
}

const ReportIcon = ({ icon }: ReportIconProps) => {
  const title = encodeURI("[Parse]: Type the title here...");
  const body = encodeURI(`
  **User Agent:** 
  \`${window.navigator.userAgent.replace(/;/g, ",")}\`

  **Icon Detail:** 
  \`\`\`js
  \`${JSON.stringify(icon, null, 2)}\`
  \`\`\`
  ---
  What is the problem you are experiencing?
  `);

  return (
    <>
      <ReactTooltip />
      <div className={styles.ReportIcon}>
        <a
          className={styles.ReportIconLink}
          href={`https://github.com/aykutkardas/svgps.app/issues/new?title=${title}&body=${body}`}
          target="_blank"
          rel="noreferrer"
        >
          <Icon
            icon="bug"
            size={10}
            data-tip="Report Icon"
            data-background-color="var(--neutral-600)"
            onClick={(e) => e.stopPropagation()}
          />
        </a>
      </div>
    </>
  );
};

export default ReportIcon;
