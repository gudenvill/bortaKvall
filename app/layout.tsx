import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { CartProvider } from "@/context/cart-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Borta Kväll",
  description: "Hemma bra men borta bäst med Borta Kväll",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <CartProvider><body className={inter.className}>{children}</body></CartProvider>
      </html>
  );
}
