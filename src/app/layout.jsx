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
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#000000" />
        {/* Microsoft Tile Color for Windows Phone/Tiles */}
        <meta name="msapplication-TileColor" content="#000000" />
        
        {/* Preload critical images if they are used prominently on initial load */}
        {/* <link rel="preload" as="image" href="/webelly.png" /> */} 
        {/* Only include this if /webelly.png is genuinely a critical, above-the-fold image */}
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