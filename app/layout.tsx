import './globals.css'
import { Montserrat } from 'next/font/google'

const inter = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'Net Code',
  description: 'Platform to keep all your notes on codes and make references to them',
  keywords:'code keep, code note'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
