import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NextJs fullsatck project with authentication",
  description:
    "Complete NextJs full stack project with Mongodb as a database and cloudinary for image uploads and gathering",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
