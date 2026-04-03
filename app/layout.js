import localFont from 'next/font/local'
import './globals.css'
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google'

const Lavish = localFont({
  src: '../fonts/Lavish.ttf',
})

export const metadata = {
  title: 'KeepNote',
  description: 'A lovely way to keep your notes',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-XYZ" />
      <body className={Lavish.className}>{children}</body>
      <GoogleAnalytics gaId="G-XYZ" />
    </html>
  )
}
