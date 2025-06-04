import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Franky Agents",
  description: "Monetize your old devices by powering efficient AI agents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
