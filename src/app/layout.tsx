import type { Metadata } from "next";
import { ThemeProvider } from "@/lib/theme/ThemeProvider";
import { getNoFlashScript } from "@/lib/theme/noFlashScript";
import { siteConfig } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.tagline,
  icons: { icon: siteConfig.logo.favicon },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Blocking on purpose - must run before first paint to avoid a
            light-mode flash. suppressHydrationWarning above covers the
            .dark class + inline style attrs this script adds to <html> */}
        <script dangerouslySetInnerHTML={{ __html: getNoFlashScript() }} />
      </head>
      <body className="min-h-screen bg-surface-1 text-text-primary antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
