import type { Metadata } from "next";
import "./globals.css";
import { QuizProvider } from "@/contexts/QuizContext";

export const metadata: Metadata = {
  title: "Inritch – Find Your Perfect Part-Time Role",
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
        <QuizProvider>{children}</QuizProvider>
      </body>
    </html>
  );
}
