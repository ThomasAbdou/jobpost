import type { Metadata, Viewport } from "next";
import "./globals.css";
import { QuizProvider } from "@/contexts/QuizContext";
import { Analytics } from "@vercel/analytics/next";
import MetaPixel from "@/components/MetaPixel";

export const metadata: Metadata = {
  title: "Remoteo – Find Your Perfect Part-Time Role",
  description: "Connect with part-time job opportunities that match your experience and preferences.",
};

// Prevents iOS Safari from auto-zooming when focusing inputs, which otherwise
// leaves the fixed-height quiz layout stuck zoomed-in and breaks tap targets.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
