import type { Metadata } from "next";
import { defaultConfig, fontStylesheets } from "@/design-system/config";
import { antiFlashScript } from "@/design-system/anti-flash-script";
import { author, siteUrl, systemName } from "@/design-system/brand";
import { generateChromeCss, generateThemeCss } from "@/design-system/tokens";
import { StudioShell } from "@/components/studio/studio";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${systemName} — design system studio`,
  description: `${author.name}'s design system studio. Customize it, then copy a prompt, skill or shadcn registry that applies it anywhere.`,
  authors: [{ name: author.name, url: author.xUrl }],
  twitter: { card: "summary_large_image", creator: author.handle },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="motion-safe:scroll-smooth" data-style="handmade" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: antiFlashScript }} />
        <link rel="preconnect" href="https://rsms.me" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {fontStylesheets(defaultConfig).map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
        {/* Default tokens for first paint; the studio overrides them client-side. */}
        <style dangerouslySetInnerHTML={{ __html: generateThemeCss(defaultConfig) }} />
        {/* The customizer sidebar always renders in the default design. */}
        <style dangerouslySetInnerHTML={{ __html: generateChromeCss() }} />
        {/* No analytics yet. Add your own tag here when the studio has a domain. */}
      </head>
      <body>
        <StudioShell>{children}</StudioShell>
      </body>
    </html>
  );
}
