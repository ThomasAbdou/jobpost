import type { Metadata } from "next";
import "./globals.css";
import { QuizProvider } from "@/contexts/QuizContext";
import { Analytics } from "@vercel/analytics/next";
import MetaPixel from "@/components/MetaPixel";

export const metadata: Metadata = {
  title: "Remoteo – Find Your Perfect Part-Time Role",
  description: "Connect with part-time job opportunities that match your experience and preferences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MetaPixel />
        <QuizProvider>{children}</QuizProvider>
        <Analytics />
      </body>
    </html>
  );
}
