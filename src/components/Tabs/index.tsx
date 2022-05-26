import { useState } from "react";
import cx from "classnames";

import styles from "./Tabs.module.css";

import Icon from "src/components/Icon";

interface TabsProps {
  tabs: { name: string; label: string; content: string }[];
}

const Tabs = ({ tabs }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(null);

  return (
    <>
      <div className={styles.Tabs}>
        {tabs.map((tab) => (
          <div
            key={tab.label}
            className={cx(styles.Tab, {
              [styles.ActiveTab]: activeTab === tab,
            })}
            role="button"
            onClick={() => setActiveTab(tab)}
          >
            <Icon icon={tab.name} size={15} />
            <span>{tab.label}</span>
          </div>
        ))}
      </div>
      <div className={styles.TabContent}>{activeTab?.content}</div>
    </>
  );
};

export default Tabs;
