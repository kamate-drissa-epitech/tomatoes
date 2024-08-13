export const metadata = {
  title: "Login",
  description: "Login users",
}; 

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
