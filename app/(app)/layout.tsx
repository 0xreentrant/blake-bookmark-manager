import { GeistSans } from "geist/font/sans";
import "../../styles/globals.css";
export default function Layout({ children }) {
  return (
    <html className={GeistSans.className}>
      <body>{children}</body>
    </html>
  );
}
