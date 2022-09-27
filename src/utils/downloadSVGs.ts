import { download } from "./download";
import JSZip from "jszip";

export type IconObj = { name: string; svg: string };

export async function downloadSVGs(icons: IconObj[], name: string) {
  if (!icons.length) return;

  const zip = new JSZip();

  for (const { name, svg } of icons) {
    zip.file(`${name}.svg`, svg);
  }

  const blob = await zip.generateAsync({ type: "blob" });
  download(blob, `${name}-svg.zip`);
}
