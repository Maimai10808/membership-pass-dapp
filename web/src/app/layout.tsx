import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "../providers/providers";

export const metadata: Metadata = {
  title: "Membership Pass DApp",
  description:
    "Whitelist and membership pass demo built with Hardhat and Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Providers> {children}</Providers>
      </body>
    </html>
  );
}
