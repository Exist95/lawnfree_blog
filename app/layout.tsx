import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/x-common/header";
import { ThemeProvider } from "@/components/x-common/theme-provider";

export const metadata: Metadata = {
  title: "블로그 웹 애플리케이션 개발",
  description: "로앤프리 과제전형",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
