import type { Metadata } from "next";
import "@/app/globals.css";
import Navbar from "@/components/Navbar";


export const metadata: Metadata = {
  title: "Anonymous Fb",
  description: "Real feedback from real people.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
 

        <>
          <Navbar />

          {children}

        </>


  );
}
