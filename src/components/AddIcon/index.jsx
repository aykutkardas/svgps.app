import styles from "./AddIcon.module.css";

import UploadWrapper from "src/components/UploadWrapper";
import Icon from "src/components/Icon";

export default function AddIcon({ icons, setIcons }) {
  return (
    <UploadWrapper icons={icons} setIcons={setIcons}>
      <div className={styles.AddIcon}>
        <Icon icon="cross" size={20} />
      </div>
    </UploadWrapper>
  );
}
