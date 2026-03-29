export const metadata = {
  title: 'Tharunpp Playground',
  description: 'Online playground for Tharunpp — Tamil cinema powered programming language',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
