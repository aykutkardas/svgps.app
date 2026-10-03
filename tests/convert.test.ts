/**
 * Golden tests: the exact strings produced for copy/download must not change
 * while the project is being modernized. Any intentional change to an output
 * format has to update these snapshots in its own, reviewed commit.
 */
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { convertToSVG } from "src/utils/convertToSVG";
import { convertToJSX } from "src/utils/convertToJSX";
import {
  convertToReactComponent,
  toPascalCase,
} from "src/utils/convertToReactComponent";
import { IconSet } from "src/types";

const demoDir = path.resolve(__dirname, "../src/assets/icons/demo");
const demoSets = fs
  .readdirSync(demoDir)
  .filter((file) => file.endsWith(".json"))
  .sort();

describe.each(demoSets)("%s", (file) => {
  const iconSet: IconSet = JSON.parse(
    fs.readFileSync(path.join(demoDir, file), "utf8"),
  );

  it("converts every icon to SVG, JSX and React component", () => {
    const output = iconSet.icons.map((icon) => ({
      name: icon.properties.name,
      svg: convertToSVG(icon),
      svg24: convertToSVG(icon, 24),
      svgFile: convertToSVG(icon, 32, true),
      jsx: convertToJSX(icon),
      react: convertToReactComponent(icon, 16, icon.properties.name),
      pascal: toPascalCase(icon.properties.name),
    }));

    expect(output).toMatchSnapshot();
  });
});
