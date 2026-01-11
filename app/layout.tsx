import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "TravelTrucks",
  description: "Camper rental web application",
  openGraph: {
    title: "TravelTrucks",
    description: "Camper rental web application",
    url: "https://all-possible-front-production.up.railway.app",
    images: [
      {
        url: "https://all-possible-front-production.up.railway.app/images/auth-login-bg.png",
        width: 1200,
        height: 630,
        alt: "TravelTrucks",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
     <link
  rel="preconnect"
  href="https://fonts.googleapis.com"
/>
<link
  rel="preconnect"
  href="https://fonts.gstatic.com"
  crossOrigin="anonymous"
/>
<link
  href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap"
  rel="stylesheet"
/>
<link rel="icon" href="/favicon.ico" />

      </head>
      <body>
        <Header />
        {children}
        <Toaster position="top-right"/>
        <div id="datepicker-portal" />
      </body>
    </html>
  );
}
