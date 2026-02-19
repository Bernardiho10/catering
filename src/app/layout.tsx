
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme-provider";

import { CartBottomBar } from "@/features/cart/components/CartBottomBar";

export const metadata: Metadata = {
  title: "The A Cake | Abraham's Delight",
  description: "Wholesome Ingredients. Family Roots. A Blessing in Every Slice. Experience 100% organic, homemade cakes crafted with care.",
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
            <Header />
            <main className="flex-1 flex flex-col pt-32">
              {children}
            </main>
            <Footer />
          </div>
          <CartBottomBar />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
