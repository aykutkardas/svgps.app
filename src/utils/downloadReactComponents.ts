import { download } from "./download";
import JSZip from "jszip";

export type IconObj = { name: string; component: string };

export async function downloadReactComponents(icons: IconObj[], name: string) {
  if (!icons.length) return;

  const zip = new JSZip();

  for (const { name, component } of icons) {
    zip.file(`${name}.jsx`, component);
  }

  const blob = await zip.generateAsync({ type: "blob" });
  download(blob, `${name}-jsx.zip`);
}
