import { Roboto } from "next/font/google";
import { AuthProvider } from "@/providers/AuthProvider";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextTopLoader color="#7B5B3A" height={3} showSpinner={false} />
        <Toaster />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
