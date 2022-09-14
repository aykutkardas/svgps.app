import IcoMoon, { IconProps } from "react-icomoon";
import { IconSet } from "src/types";

import iconSet from "../assets/selection.json";

interface WithIconSet extends IconProps {
  iconSet?: IconSet;
}

const Icon = (props: WithIconSet) => <IcoMoon iconSet={iconSet} {...props} />;

export default Icon;
