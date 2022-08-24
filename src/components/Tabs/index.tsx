import { useState } from "react";
import cx from "classnames";

import Icon from "src/components/Icon";

import styles from "./Tabs.module.css";

type Tab = {
  value: string;
  label: string;
  icon: string;
  content: string | React.ReactElement;
};

interface TabsProps {
  tabs: Tab[];
}

const getActiveTab = (value, tabs) => tabs.find((tab) => tab.value === value);

const Tabs = ({ tabs }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(tabs?.[0]?.value);

  const selectTab = (event, tab) => {
    setActiveTab(tab.value);
    event.target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-center my-0 mx-auto">
        {tabs.map((tab) => (
          <div
            key={tab.label}
            className={cx(
              "inline-flex items-center select-none p-2 opacity-60 hover:opacity-100 text-white grayscale text-sm sm:text-base",
              {
                "grayscale-0 opacity-100": activeTab === tab.value,
              }
            )}
            role="button"
            onClick={(e) => selectTab(e, tab)}
          >
            <Icon icon={tab.icon} className="mr-1 w-3 h-3 sm:w-4 sm:h-4" />
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
