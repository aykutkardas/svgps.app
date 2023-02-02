import copy from "copy-to-clipboard";
import { klona } from "klona";
import { nanoid } from "nanoid";
import toast from "react-hot-toast";

import { convertToJSX } from "./convertToJSX";
import {
  convertToReactComponent,
  toPascalCase,
} from "./convertToReactComponent";
import { convertToSVG } from "./convertToSVG";
import { downloadReactComponents } from "./downloadReactComponents";
import downloadSVG from "./downloadSVG";
import { downloadSVGs } from "./downloadSVGs";

export const copyName = (icon) => {
  const iconName = icon.properties.name;
  copy(iconName);
  toast.success(`"${iconName}" copied!`);
};

export const copyAsSVG = (icon, size) => {
  window?.hardal?.trackEvent("COP1QHLS1");
  copy(convertToSVG(icon, size));
  toast.success("SVG Copied!");
};

export const copyAsJSX = (icon, size) => {
  window?.hardal?.trackEvent("COPIRQWSB");
  copy(convertToJSX(icon, size));
  toast.success("JSX Copied!");
};

export const downloadAsSVG = (icon, size) => {
  downloadSVG(icon?.properties.name, convertToSVG(icon, size));
};

export const downloadMultipleSVG = (name, icons, size = 32) => {
  const _icons = icons.map((icon) => ({
    name: icon.properties.name,
    svg: convertToSVG(icon, size),
  }));

  downloadSVGs(_icons, name);
};

export const downloadAsReactComponents = (name, icons, size) => {
  const _icons = icons.map((icon) => ({
    name: toPascalCase(icon.properties.name),
    component: convertToReactComponent(icon, size, icon?.properties.name),
  }));

  downloadReactComponents(_icons, name);
};

export const sendToApp = (icons, appIcons, callback) => {
  const oldIcons = [...appIcons].map((icon) => {
    const matchedIcon = icons.find(
      ({ properties }) => properties.name === icon.properties.name
    );

    return matchedIcon || icon;
  });

  const newIcons = icons.filter(
    ({ properties }) =>
      !oldIcons.find((oldIcon) => oldIcon.properties.name === properties.name)
  );

  if (!newIcons.length) {
    return toast.error("Icons already exist!");
  }

  callback([
    ...oldIcons,
    ...newIcons.map((icon) => {
      const newIcon = klona(icon);
      newIcon.__meta = { id: nanoid() };
      return newIcon;
    }),
  ]);
  toast.success(
    `${newIcons.length > 1 ? "Icons" : "Icon"} added to Collection!`
  );
};

export const selectAll = (icons, callback) => {
  const deselectedIcons = icons.map((icon) => {
    icon.__meta = {
      ...(icon.__meta ?? {}),
      _selected: true,
    };
    return icon;
  });

  callback(deselectedIcons);
};

export const deselectAll = (icons, callback) => {
  const deselectedIcons = icons.map((icon) => {
    icon.__meta = {
      ...(icon.__meta ?? {}),
      _selected: false,
    };
    return icon;
  });

  callback(deselectedIcons);
};

export const select = (icon, icons, callback) => {
  const selected = icon.__meta?._selected;
  const selectState = !selected;

  const newIcons = icons.map((item) => {
    if (item.properties.name !== icon.properties.name) return item;

    item.__meta = { ...item.__meta, _selected: selectState };
    return item;
  });

  callback(newIcons, "select");
};
