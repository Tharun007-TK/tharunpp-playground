export const metadata = {
  title: 'Tharunpp Playground',
  description: 'Online playground for Tharunpp — Tamil cinema powered programming language',
}

import LoadingScreen from "./components/LoadingScreen";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          html, body { margin: 0; padding: 0; overflow-x: hidden; }
        `}</style>
      </head>
      <body suppressHydrationWarning>
        <LoadingScreen />
        {children}
      </body>
    </html>
  )
}
