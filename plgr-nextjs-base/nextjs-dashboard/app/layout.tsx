import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";

/**
 *
 * antialiased: This class is used to smooth the font rendering on the page.
 *
 */

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
