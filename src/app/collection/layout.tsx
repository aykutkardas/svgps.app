import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SVGPS - Create your own icon collection",
};

export default function CollectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
