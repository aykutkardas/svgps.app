import styles from "./AddIcon.module.css";

import UploadWrapper from "src/components/UploadWrapper";
import Icon from "src/components/Icon";
import { IconsType } from "src/types";

interface AddIconProps {
  icons: IconsType;
  setIcons: (icons: IconsType) => void;
}

const AddIcon = ({ icons, setIcons }: AddIconProps) => {
  return (
    <UploadWrapper icons={icons} setIcons={setIcons}>
      <div className={styles.AddIcon}>
        <Icon icon="cross" size={20} />
      </div>
    </UploadWrapper>
  );
};

export default AddIcon;
