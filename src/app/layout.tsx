import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Invoice & Quote App",
  description: "Generate invoices and quotes easily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <header className="bg-gray-800 text-white p-4">
          <nav className="container mx-auto flex justify-between">
            <Link href="/" className="text-2xl font-bold">
              Invoice & Quote App
            </Link>
            <div className="space-x-4">
              <Link href="/quote" className="hover:text-gray-300">
                見積書
              </Link>
              <Link href="/invoice" className="hover:text-gray-300">
                請求書
              </Link>
              <Link href="/documents" className="hover:text-gray-300">
                保存されたドキュメント
              </Link>
            </div>
          </nav>
        </header>
        <main className="flex-grow container mx-auto p-4">{children}</main>
        <footer className="bg-gray-800 text-white p-4 text-center">
          &copy; 2024 Invoice & Quote App
        </footer>
      </body>
    </html>
  );
}
