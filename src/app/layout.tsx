import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "InternNova",
  description: "University-powered internship platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full light">
      <body className="h-full bg-[#F8FAFC] text-slate-900 antialiased m-0 p-0">
        {children}
      </body>
    </html>
  );
}
