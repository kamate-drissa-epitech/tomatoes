export const metadata = {
  title: 'Home page',
  description: 'Plateform of movies',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      <script src="https://cdn.tailwindcss.com" defer></script>
      <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js" defer></script>
      </head>
      <body>{children}</body>
    </html>
  )
}
