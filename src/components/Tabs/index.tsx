import { useState } from "react";
import cx from "classnames";

import styles from "./Tabs.module.css";

import Icon from "src/components/Icon";

interface TabsProps {
  tabs: {
    value: string;
    label: string;
    icon: string;
    content: string | React.ReactElement;
  }[];
}

const getActiveTab = (value, tabs) => tabs.find((tab) => tab.value === value);

const Tabs = ({ tabs }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(tabs?.[0]?.value);

  return (
    <>
      <div className={styles.Tabs}>
        {tabs.map((tab) => (
          <div
            key={tab.label}
            className={cx(styles.Tab, {
              [styles.ActiveTab]: activeTab === tab.value,
            })}
            role="button"
            onClick={() => setActiveTab(tab.value)}
          >
            <Icon icon={tab.icon} size={15} />
            <span>{tab.label}</span>
          </div>
        ))}
      </div>
      <div className={styles.TabContent}>
        {getActiveTab(activeTab, tabs)?.content}
      </div>
    </>
  );
};

export default Tabs;
