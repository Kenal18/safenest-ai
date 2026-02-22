import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SafeNest AI | Smart & Safe Investing for GenZ",
  description: "AI-powered platform providing safe, conservative investment recommendations for Indian GenZ students.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} font-sans antialiased bg-slate-950 text-slate-50 min-h-screen`}
      >
        <div className="fixed inset-0 z-[-1] bg-slate-950">
          <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-blue-900/20 rounded-full blur-[120px] mix-blend-screen"></div>
          <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-purple-900/20 rounded-full blur-[120px] mix-blend-screen"></div>
        </div>
        {children}
      </body>
    </html>
  );
}
