import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { JsonLd } from "@/components/json-ld";
import {
  personSchema,
  organizationSchema,
  websiteSchema,
  productSchemas,
} from "@/lib/schema";
import { siteConfig, isPlaceholder } from "@/lib/site-config";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const title = `${siteConfig.name} · ${siteConfig.jobTitle}`;
const description = isPlaceholder(siteConfig.description)
  ? `${siteConfig.jobTitle} based in ${siteConfig.location.display}.`
  : siteConfig.description;

export const metadata: Metadata = {
  // Required for relative OG/canonical URLs to resolve to absolute ones.
  metadataBase: new URL(siteConfig.url),
  title: {
    default: title,
    // Sub-pages set only their own title; the brand suffix is appended here.
    template: `%s · ${siteConfig.name}`,
  },
  description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    locale: "en_NG",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.profiles.twitterHandle,
    creator: siteConfig.profiles.twitterHandle,
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Without these, Google truncates snippets and skips large-image
      // previews — both cost visibility in AI Overviews.
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-NG" suppressHydrationWarning>
      <head>
        <JsonLd
          schema={[
            personSchema(),
            organizationSchema(),
            websiteSchema(),
            ...productSchemas(),
          ]}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${GeistMono.variable} antialiased selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black`}
      >
        {children}
      </body>
    </html>
  );
}
