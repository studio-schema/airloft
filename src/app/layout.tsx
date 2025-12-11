import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConvexClerkProvider } from "@/providers/convex-clerk-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Airloft | Experience Events Inside a Giant Balloon",
  description:
    "Airloft transforms a massive hot air balloon into an extraordinary 250-person event venue. From sound baths to DJ parties, experience events like never before.",
  keywords: [
    "hot air balloon events",
    "unique venue",
    "sound bath",
    "DJ party",
    "silent disco",
    "yoga",
    "meditation",
    "immersive experience",
  ],
  openGraph: {
    title: "Airloft | Experience Events Inside a Giant Balloon",
    description:
      "Airloft transforms a massive hot air balloon into an extraordinary 250-person event venue.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Airloft | Experience Events Inside a Giant Balloon",
    description:
      "Airloft transforms a massive hot air balloon into an extraordinary 250-person event venue.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ConvexClerkProvider>{children}</ConvexClerkProvider>
      </body>
    </html>
  );
}
