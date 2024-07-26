import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Helpdesk",
  description: "Ticketing system for a helpdesk",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-screen w-full`}>
      <body className="h-full w-full  font-inter text-text font-[200]">
        <Navbar />
        <div className="page-container absolute top-[4rem] min-h-[calc(100vh-4rem)] flex w-full overflow-scroll">
          {children}
        </div>
      </body>
    </html>
  );
}
