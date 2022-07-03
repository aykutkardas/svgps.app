import ImportWrapper from "src/components/ImportWrapper";
import Icon from "src/components/Icon";

import styles from "./AddIcon.module.css";

const AddIcon = () => (
  <ImportWrapper>
    <div className={styles.AddIcon}>
      <Icon icon="cross" size={20} />
    </div>
  </ImportWrapper>
);

export default AddIcon;
