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
  metadataBase: new URL('https://veshro-cafe.vercel.app'), // Placeholder production URL
  title: {
    default: "Veshro Cafe",
    template: "%s | Veshro Cafe"
  },
  description: "Experience the best food in town. Order now via WhatsApp.",
  keywords: ["Food", "Delivery", "Cafe", "WhatsApp Ordering", "Veshro Cafe"],
  authors: [{ name: "Veshro Cafe" }],
  openGraph: {
    title: "Veshro Cafe",
    description: "Experience the best food in town. Order now via WhatsApp.",
    url: 'https://veshro-cafe.vercel.app',
    siteName: 'Veshro Cafe',
    images: [
      {
        url: '/og_image.png',
        width: 1200,
        height: 630,
        alt: 'Veshro Cafe',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Veshro Cafe",
    description: "Experience the best food in town. Order now via WhatsApp.",
    images: ['/og_image.png'],
  },
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
          "antialiased min-h-screen bg-zinc-100 dark:bg-zinc-900"
        )}
      >
        <div className="w-full min-h-screen bg-background shadow-2xl overflow-x-hidden flex flex-col relative">
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
