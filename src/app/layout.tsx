import type { Metadata } from "next";
import "../styles/globals.css";


export const metadata: Metadata = {
  title: "HSpace",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`antialiased`}
        >
        {children}
      </body>
    </html>
  );
}
