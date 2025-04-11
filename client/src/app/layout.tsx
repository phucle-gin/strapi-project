import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../sass/main.scss";

import { getGlobalSettings,getBlogEntries,getEventEntries } from "@/data/loaders";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bloom And Play",
  description: "Welcome to Bloom And Play, where we can support each other in our journey of fostering development, learning and well-being for infants and toddlers.",
};
async function loader() {
  const [{ data: global }, blogPosts, events] = await Promise.all([
    getGlobalSettings(),
    getBlogEntries(),
    getEventEntries(),
  ]);
  if (!global) throw new Error("Failed to fetch global settings");

  return {
    header: global?.header,
    footer: global?.footer,
    blogPosts,
    events
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
const { header, footer, blogPosts, events } = await loader();
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header data={header} blogPosts={blogPosts} events={events} />
        {children}
        <Footer data={footer} />
      </body>
    </html>
  );
}
