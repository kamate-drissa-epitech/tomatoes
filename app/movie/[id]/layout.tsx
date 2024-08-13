export const metadata = {
  title: "Movie details",
  description: "Movie details",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
