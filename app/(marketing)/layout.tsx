import { Playfair_Display, Work_Sans } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "../../styles/globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair-display",
});

const worksans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function Layout({ children }) {
  return (
    <html className={`${playfair.variable} ${worksans.className}`}>
      <body className="!pointer-events-auto">{children}</body>
    </html>
  );
}
