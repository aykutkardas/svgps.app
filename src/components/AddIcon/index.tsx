import styles from "./AddIcon.module.css";

import ImportWrapper from "src/components/ImportWrapper";
import Icon from "src/components/Icon";
import { IconsType } from "src/types";

interface AddIconProps {
  icons: IconsType;
  setIcons: (icons: IconsType) => void;
}

const AddIcon = ({ icons, setIcons }: AddIconProps) => {
  return (
    <ImportWrapper icons={icons} setIcons={setIcons}>
      <div className={styles.AddIcon}>
        <Icon icon="cross" size={20} />
      </div>
    </ImportWrapper>
  );
};

export default AddIcon;
