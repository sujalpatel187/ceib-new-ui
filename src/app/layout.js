import './globals.css'

export const metadata = {
  title: 'DGGI',
  description: 'A split layout application with canvas controls',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}