import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <script
          defer
          src="https://cdn.jsdelivr.net/npm/uikit@3.20.8/dist/js/uikit.min.js"
        ></script>
        <script
          defer
          src="https://cdn.jsdelivr.net/npm/uikit@3.20.8/dist/js/uikit-icons.min.js"
        ></script>
      </body>
    </html>
  );
}
