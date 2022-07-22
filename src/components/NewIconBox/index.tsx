import ImportWrapper from "src/components/ImportWrapper";
import Icon from "src/components/Icon";

import styles from "./NewIconBox.module.css";

const NewIconBox = () => (
  <ImportWrapper>
    <div className={styles.NewIconBox}>
      <Icon icon="cross" size={20} />
    </div>
  </ImportWrapper>
);

export default NewIconBox;
