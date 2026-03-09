import type { Metadata } from 'next'
import HomeTerminal from '@/components/home-terminal'

export const metadata: Metadata = {
    title: 'Home',
    description:
        'Johnson Su is a full-stack software engineer in Toronto building clean products and reliable systems.',
}

export default function Home() {
    return (
        <>
            <h1 className="sr-only">Johnson Su</h1>
            <p className="sr-only">
                Full-stack software engineer in Toronto focused on building clean products and
                reliable systems.
            </p>
            <HomeTerminal />
        </>
    )
}
