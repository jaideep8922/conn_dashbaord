import type { Metadata } from "next";
import "./globals.css";
import ClientProvider from "./clientProvider";
import { Poppins } from 'next/font/google';
import Sidebar from "@/component/Sidebar";
import Header from "@/component/Header";

const poppins = Poppins({
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700'], 
  display: 'swap', 
});

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <html lang="en">
  <body className={`${poppins.className}`}>
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar with fixed 30% width */}

      <div style={{ flex: '0 0 15%', maxWidth: '30%', backgroundColor: '#f4f4f4' }}>
        {/* <Sidebar setActivePage={() => {}} /> */}
      </div>

      {/* Main content area with 70% width */}
      <div style={{ flex: '1', padding: '16px', overflowY: 'auto' }}>
        <Header />
        <ClientProvider>
          {children}
        </ClientProvider>
      </div>
    </div>
  </body>
</html>

  );
}
