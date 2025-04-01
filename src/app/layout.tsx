import { ToastfyContainer } from "@/components/toastfy-container";
import { QueryProvider } from "@/providers/query-client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";

interface RootLayoutProps {
  children: React.ReactNode;
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  const allCookies = await cookies();
  const theme = allCookies.get("theme")?.value || "light";

  return (
    <html lang="en" className={theme}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} 
        antialiased dark:from-zinc-950 dark:to-zinc-950 bg-radial from-gray-100 to-white text-gray-600 dark:text-gray-200`}
      >
        <QueryProvider>{children}</QueryProvider>
        <ToastfyContainer />
      </body>
    </html>
  );
}
