import IcoMoon, { type IconProps } from "react-icomoon";
import type { IconSet, IconSetItem } from "src/types";

import iconSet from "./selection.json";

interface WithIconSet extends IconProps {
  iconSet?: IconSet;
}

// camelCase SVG attributes React knows. Other camelCase keys in imported data
// (e.g. iconfont's `pId`) are not valid on <path> and make React warn.
const KNOWN_CAMEL_CASE_ATTRS = new Set([
  "clipPath",
  "clipRule",
  "fillOpacity",
  "fillRule",
  "markerEnd",
  "markerMid",
  "markerStart",
  "paintOrder",
  "shapeRendering",
  "stopColor",
  "stopOpacity",
  "strokeDasharray",
  "strokeDashoffset",
  "strokeLinecap",
  "strokeLinejoin",
  "strokeMiterlimit",
  "strokeOpacity",
  "strokeWidth",
  "transformOrigin",
  "vectorEffect",
]);

const isRenderableAttr = (key: string) =>
  key === key.toLowerCase() || KNOWN_CAMEL_CASE_ATTRS.has(key);

const sanitizedIcons = new WeakMap<IconSetItem, IconSetItem>();

/**
 * Returns the icon with path attributes that are safe to render. Only affects
 * rendering; the stored/exported icon data keeps every attribute.
 */
const toRenderableIcon = (icon: IconSetItem): IconSetItem => {
  const cached = sanitizedIcons.get(icon);
  if (cached) return cached;

  const attrs = icon.icon.attrs;
  const needsCleanup = attrs?.some((attr) =>
    Object.keys(attr).some((key) => !isRenderableAttr(key)),
  );

  const renderable = needsCleanup
    ? {
        ...icon,
        icon: {
          ...icon.icon,
          attrs: attrs?.map((attr) =>
            Object.fromEntries(
              Object.entries(attr).filter(([key]) => isRenderableAttr(key)),
            ),
          ),
        },
      }
    : icon;

  sanitizedIcons.set(icon, renderable);
  return renderable;
};

const Icon = ({ iconSet: customIconSet, ...props }: WithIconSet) => {
  if (!customIconSet) return <IcoMoon iconSet={iconSet} {...props} />;

  const icon = customIconSet.icons?.find(
    (item) => item.properties.name === props.icon,
  );
  if (!icon) return null;

  return <IcoMoon iconSet={{ icons: [toRenderableIcon(icon)] }} {...props} />;
};

export default Icon;
