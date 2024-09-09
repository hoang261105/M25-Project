import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import ClientProvider from "@/components/ClientProvider"; // Import ClientProvider

const inter = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Vio's Shop",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
          crossOrigin="anonymous"
        />
      </head>
      {/* Bọc phần client của ứng dụng bằng ClientProvider */}
      <ClientProvider>
        <body className={inter.className}>{children}</body>
      </ClientProvider>
    </html>
  );
}
