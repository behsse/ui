import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import { Navbar } from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Behsse UI",
  description: "Documentation for the Behsse UI project, which allows you to add modern React components, icons, and themes to your projects while respecting UI/UX principles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased w-full h-full overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
          <Navbar />
          <div className="pt-32 lg:pt-28 border-x border-x-border border-dashed w-full 3xl:max-w-[1550px] 3xl:mx-auto min-h-screen">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
