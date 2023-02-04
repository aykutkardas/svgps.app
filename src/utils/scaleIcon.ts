import svgpath from "svgpath";
import { IconSetItem } from "src/types";

export type SvgPathAttrs = {
  clipRule?: string;
  fillRule?: string;
  stroke?: string;
  strokeLinecap?: string;
  strokeLinejoin?: string;
  strokeWidth?: number;
  fill?: string;
  d?: string;
};

const scaleStrokeWidth = (attr: SvgPathAttrs, scale: number): SvgPathAttrs => {
  const newAttr = { ...attr };

  if (newAttr.strokeWidth) {
    newAttr.strokeWidth = newAttr.strokeWidth * scale;
  }

  return newAttr;
};

const scaleIcon = (data: IconSetItem, scale: number) => ({
  icon: {
    width: (data.icon.width || 1024) * scale,
    attrs: data.icon.attrs?.map((attr) => scaleStrokeWidth(attr, scale)),
    paths: data.icon.paths.map((path) =>
      svgpath(path).scale(scale).round(1).toString()
    ),
  },
  properties: data.properties,
});

export default scaleIcon;
