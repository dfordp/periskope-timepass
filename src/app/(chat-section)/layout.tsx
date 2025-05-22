import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "../globals.css";
import { Sidebar } from "@/components/sidebar";
import { TopBar } from "@/components/top-bar";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Periskope Chat",
  description: "WhatsApp Business Chat Interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.className} antialiased`}>
        <div className="flex flex-col h-screen w-full bg-white overflow-hidden">
          <TopBar />
          <div className="flex-1 flex">
            <Sidebar />
            <main className="flex-1 relative bg-slate-50">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}