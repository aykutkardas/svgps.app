import React from "react";
import IcoMoon from "react-icomoon";
const iconSet = require("./selection.json");

const Icon = ({ ...props }) => (
  // [TODO]: Add reset fill feature to SVGPS!
  // Then remove "disableFill" prop.
  <IcoMoon iconSet={iconSet} disableFill {...props} />
);

export default Icon;
