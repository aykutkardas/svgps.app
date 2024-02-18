import { Metadata } from "next";

import "src/index.css";
import "nprogress/nprogress.css";

export const metadata: Metadata = {
  title: "SVGPS - Your Icon Store and Storage",
  description: "Welcome to Next.js",
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <body>{children}</body>
    </html>
  );
}
