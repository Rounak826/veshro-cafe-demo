import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { SplashScreen } from "@/components/features/SplashScreen";
import { CartProvider } from "@/context/CartContext";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Veshro Cafe",
  description: "Experience the best food in town. Order now via WhatsApp.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Veshro Cafe",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#e11d48", // Matches primary color
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "antialiased min-h-screen bg-zinc-100 dark:bg-zinc-900 flex justify-center"
        )}
      >
        <div className="w-full max-w-md min-h-screen bg-background shadow-2xl overflow-x-hidden flex flex-col relative">
          <CartProvider>
            <SplashScreen />
            <Navbar />
            <main className="flex-1 w-full">
              {children}
            </main>
          </CartProvider>
        </div>
      </body>
    </html>
  );
}
