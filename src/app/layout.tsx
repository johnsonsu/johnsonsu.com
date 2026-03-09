import type { Metadata } from 'next'
import { IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const ibmPlexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400'] })

export const metadata: Metadata = {
    metadataBase: new URL('https://johnsonsu.com'),
    title: {
        default: 'Johnson Su',
        template: '%s | Johnson Su',
    },
    description:
        "Full-stack software engineer in Toronto focused on building clean products and reliable systems.",
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: 'Johnson Su',
        description:
            'Full-stack software engineer in Toronto focused on building clean products and reliable systems.',
        url: 'https://johnsonsu.com',
        siteName: 'Johnson Su',
        locale: 'en_CA',
        type: 'website',
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={ibmPlexMono.className}>{children}</body>
        </html>
    )
}
