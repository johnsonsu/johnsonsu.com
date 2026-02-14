'use client'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import TerminalShell from '@/components/terminal-shell'

type ScriptSegment = {
    text: string
    href?: string
    external?: boolean
}

const typingScript: ScriptSegment[] = [
    { text: '$ booting profile runtime...\n' },
    { text: '$ loading identity map...\n\n' },
    { text: 'Hello, I am Johnson Su.\n' },
    {
        text: 'I am a full-stack software engineer in Toronto focused on building clean products and reliable systems.\n\n',
    },
    { text: 'Network:\n' },
    {
        text: '[GitHub]',
        href: 'https://github.com/johnsonsu',
        external: true,
    },
    { text: '  ' },
    {
        text: '[LinkedIn]',
        href: 'https://www.linkedin.com/in/johnsonsu/',
        external: true,
    },
    { text: '\n\n' },
    { text: 'Current mission: building a crypto perpetual exchange at ' },
    { text: 'Rails', href: 'https://rails.xyz', external: true },
    { text: '.\n\n' },
    { text: 'Thanks for visiting.' },
]

const baseDelayMs = 28

function getDelay(char: string) {
    if (char === '\n') return 120
    if (char === '.' || char === ',') return 85
    if (char === ':' || char === ';') return 95
    return baseDelayMs
}

export default function Home() {
    const [segmentIndex, setSegmentIndex] = useState(0)
    const [charIndex, setCharIndex] = useState(0)
    const [reduceMotion, setReduceMotion] = useState(false)

    const isDone = segmentIndex >= typingScript.length

    const visibleSegments = useMemo(() => {
        if (reduceMotion) return typingScript

        const complete = typingScript.slice(0, segmentIndex)
        if (isDone) return complete

        const active = typingScript[segmentIndex]
        if (!active) return complete

        return [...complete, { ...active, text: active.text.slice(0, charIndex) }]
    }, [charIndex, isDone, reduceMotion, segmentIndex])

    useEffect(() => {
        const query = window.matchMedia('(prefers-reduced-motion: reduce)')
        const updatePreference = () => setReduceMotion(query.matches)

        updatePreference()
        query.addEventListener('change', updatePreference)
        return () => query.removeEventListener('change', updatePreference)
    }, [])

    useEffect(() => {
        if (reduceMotion || isDone) return

        const active = typingScript[segmentIndex]
        if (!active) return

        if (charIndex >= active.text.length) {
            const advanceSegment = window.setTimeout(() => {
                setSegmentIndex((index) => index + 1)
                setCharIndex(0)
            }, 0)
            return () => window.clearTimeout(advanceSegment)
        }

        const char = active.text[charIndex]
        const timeout = window.setTimeout(
            () => setCharIndex((index) => index + 1),
            getDelay(char)
        )

        return () => window.clearTimeout(timeout)
    }, [charIndex, isDone, reduceMotion, segmentIndex])

    function renderSegment(segment: ScriptSegment, index: number) {
        const key = `${segment.href || 'text'}-${index}`
        if (!segment.href) return <span key={key}>{segment.text}</span>
        if (!segment.external) {
            return (
                <Link key={key} className="typed-link" href={segment.href}>
                    {segment.text}
                </Link>
            )
        }
        return (
            <a
                key={key}
                className="typed-link"
                href={segment.href}
                rel="noreferrer"
                target="_blank"
            >
                {segment.text}
            </a>
        )
    }

    return (
        <TerminalShell activeTab="home">
            <div className="terminal-output" aria-live="polite">
                {visibleSegments.map(renderSegment)}
                <span
                    className={`terminal-cursor ${isDone ? 'terminal-cursor-idle' : ''}`}
                    aria-hidden="true"
                >
                    █
                </span>
            </div>
        </TerminalShell>
    )
}
