import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export const metadata = {
  title: "JobFindr | Find Your Future Job",
  description: "Find Your Future Job",
};

export default RootLayout;
