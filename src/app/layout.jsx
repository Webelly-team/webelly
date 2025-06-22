import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

export const metadata = {
  title: {
    default: "Webelly - Craft Exceptional Digital Solutions",
    template: "%s | Webelly"
  },
  description: "Transform your vision into stunning digital realities with Webelly. We specialize in web development, mobile apps, and digital marketing solutions for businesses of all sizes.",
  keywords: ["web development", "digital solutions", "mobile apps", "digital marketing", "business websites", "custom software","websites","webelly","ecommerce"],
  authors: [{ name: "Webelly Team", url: "https://webelly.vercel.app" }],
  creator: "Webelly",
  publisher: "Webelly",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://webelly.vercel.app',
    title: 'Webelly - Craft Exceptional Digital Solutions',
    description: 'Transform your vision into stunning digital realities with Webelly. Professional web development and digital solutions.',
    siteName: 'Webelly',
    images: [
      {
        url: '/webelly-og.png',
        width: 1200,
        height: 630,
        alt: 'Webelly - Digital Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Webelly - Craft Exceptional Digital Solutions',
    description: 'Transform your vision into stunning digital realities with Webelly.',
    images: ['/webelly-og.png'],
    creator: '@webelly',
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#000000" },
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: 'https://webelly.com',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <link rel="preload" as="image" href="/webelly.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}