import type { Metadata } from "next";

import iconSets from "src/iconSets";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ iconSet: string }>;
}): Promise<Metadata> {
  const { iconSet } = await params;
  const iconSetData = iconSets.find(({ slug }) => slug === iconSet);

  return {
    title: iconSetData
      ? `SVGPS - ${iconSetData.name} - Icon Store`
      : "SVGPS - Icon Store",
  };
}

export default function IconSetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
