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
      <body suppressHydrationWarning>
        <LoadingScreen />
        {children}
      </body>
    </html>
  )
}
