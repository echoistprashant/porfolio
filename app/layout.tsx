import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-fallback",
  weight: ["400", "600", "800"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Femur Studio",
  description: "Femur Studio is a digital product agency based in Bilaspur, India."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body>{children}</body>
    </html>
  );
}
