import "./styles/globals.css";
import { Lato } from "next/font/google"
import { Suspense } from "react"
import { Metadata } from "next";

const lato = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
})

export const metadata: Metadata = {
  title: "Intranet ASHA Solution",
  description: "Portal interno | ASHA Solution",
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`font-sans ${lato.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  );
}
