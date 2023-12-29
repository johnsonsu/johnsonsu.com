import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const inter = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Johnson Su 🧑🏻‍💻",
  description:
    "Hi there 👋, I'm a full-stack software engineer from Toronto. Nice meeting you!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8"></meta>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
