import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

// Brand font is Codec Pro (Zetafonts), Regular and Medium, letter-spacing 0%.
// The webfont licence is not purchased yet. Outfit is the closest free match —
// geometric sans, single-storey `a`. When the licence lands, swap this for a
// next/font/local loader; nothing else in the codebase needs to change.
const brandSans = Outfit({
  variable: "--font-brand-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

// Reserved for federal identifiers only — UEI, CAGE, DUNS, contract vehicle
// numbers. Not a brand font, so it never appears in headings or eyebrows.
const brandMono = JetBrains_Mono({
  variable: "--font-brand-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.compqsoft.com"),
  title: {
    default: "CompQsoft: IT Services and Consulting Company",
    template: "%s | CompQsoft",
  },
  description:
    "CompQsoft is an IT services and consulting company specializing in digital transformation, cloud solutions, data and AI, automation, and next-generation technologies like generative AI. Over 25 years serving startups, SMBs, enterprises, and federal agencies including the Department of Defense.",
  openGraph: {
    type: "website",
    siteName: "CompQsoft",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${brandSans.variable} ${brandMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
