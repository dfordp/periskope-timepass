import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "../globals.css";
import { ChatSidebar, NavigationSidebar, RightNavigationSidebar } from "@/components/sidebar";
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
        <div className="flex h-screen w-full bg-white overflow-hidden">
          <NavigationSidebar />
          <div className="pl-16 flex flex-col h-full w-full">
            <TopBar />
            <div className="flex flex-1">
              <ChatSidebar />
              <main className="flex-1 relative bg-slate-50">
                {children}
              </main>
              <RightNavigationSidebar />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}