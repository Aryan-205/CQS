import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

// Brand font is Codec Pro (Zetafonts), Regular and Medium, letter-spacing 0%.
// The webfont licence is not purchased yet. Geist is the stand-in — a neo-
// grotesque that holds up at 17px over a 70ch measure, where Outfit's wide
// geometric counters went soft. Self-hosted from app/fonts/ so the build needs
// no network. Variable across 100-900; the 400/500 ladder is enforced by the
// type tokens in globals.css, not by what the file can render.
// Latin subset only (U+0000-00FF plus punctuation, currency and quotes) —
// anything outside it falls back to system-ui.
const brandSans = localFont({
  src: "./fonts/Geist-Variable.woff2",
  variable: "--font-brand-sans",
  weight: "100 900",
  style: "normal",
  display: "swap",
});

// Reserved for federal identifiers only — UEI, CAGE, DUNS, contract vehicle
// numbers. Not a brand font, so it never appears in headings or eyebrows.
// Geist Mono rather than JetBrains Mono: it shares the sans skeleton, so a
// code string sits in a line of body copy without reading as a foreign font.
const brandMono = localFont({
  src: "./fonts/GeistMono-Variable.woff2",
  variable: "--font-brand-mono",
  weight: "100 900",
  style: "normal",
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
