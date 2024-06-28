import type { Metadata } from "next";
import "./globals.css";
import { WordsProvider } from "@/src/lib/words/wordsContext";

export const metadata: Metadata = {
  title: "English Imagination Learning",
  description: "English Imagination Learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <WordsProvider>
        {children}
        </WordsProvider>  
      </body>
    </html>
  );
}
