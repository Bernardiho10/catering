
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { DockNavigation } from "@/components/layout/DockNavigation";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Foody | Premium Catering Services",
  description: "Experience exceptional catering for your events. From intimate gatherings to corporate functions, Foody brings restaurant-quality cuisine to your venue.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen w-full flex-col">
            <DockNavigation />
            <div className="relative min-h-screen flex flex-col">
              {/* Global Particles Background (Subtle) */}
              <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
                {/* Placeholder for Particles if needed globally, but adding to page.tsx specific sections might be better for performance. */}
              </div>

              <main className="flex flex-1 flex-col">
                {children}
              </main>

              <Footer />
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
