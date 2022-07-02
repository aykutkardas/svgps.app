import ReactTooltip from "react-tooltip";

import styles from "./ReportIcon.module.css";

import Icon from "src/components/Icon";
import { IconSetItem } from "src/types";

interface ReportIconProps {
  icon: IconSetItem;
}

const ReportIcon = ({ icon }: ReportIconProps) => {
  const content = icon.__meta.content
    .replace(/#/g, ":number_sign:")
    .replace(/;/g, ":semicolon:");

  const labels = ["parse"];
  const body = encodeURI(`
  **SVG:**
  \`\`\`html
  ${content}
  \`\`\`

  *Some characters above were converted when creating the issue.*
  
  \`:number_sign:\`, \`:semicolon:\`
  
  ---

  **What is the problem you are experiencing?**

  `);

  return (
    <>
      <ReactTooltip />
      <a
        className={styles.ReportIcon}
        href={`https://github.com/aykutkardas/svgps.app/issues/new?labels=${labels}&body=${body}`}
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
