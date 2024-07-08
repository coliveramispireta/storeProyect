import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MundoStore",
  description: "Encuentre miles de marcas y productos a precios increíbles en MundoStore.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <AuthProvider>
        <CartProvider>
        <html lang="en">
          <body className={`${inter.className} min-h-screen flex flex-col`}>
            <Navbar />
            <main className="flex-grow">
            {children}
            </main>
            <Footer />
            </body>
        </html>
        </CartProvider>
    </AuthProvider>

  );
}
