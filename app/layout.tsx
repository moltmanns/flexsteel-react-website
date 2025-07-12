import type { Metadata } from "next";
import "./globals.css";
import GDPRBar from "./Custom/GDPRBar";
import ExitIntentPopup from "./Custom/ExitIntentPopup";
import VisitorTypeDetector from "./Custom/VisitorTypeDetector";

export const metadata: Metadata = {
  title: "Flexsteel | Retail Furniture",
  description: "Our Family of Brands",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        {children}
        <GDPRBar />
        <ExitIntentPopup />
        <VisitorTypeDetector />
      </body>
    </html>
  );
}
