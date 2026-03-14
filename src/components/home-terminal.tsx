'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import TerminalShell from '@/components/terminal-shell'
import { getTerminalToneClass, type TerminalTone } from '@/components/terminal-tone'

type ScriptSegment = {
    text: string
    tone?: TerminalTone
    href?: string
    external?: boolean
}

const typingScript: ScriptSegment[] = [
    { text: '$ booting profile runtime...\n', tone: 'command' },
    { text: '$ loading identity map...\n\n', tone: 'command' },
    { text: 'Hello, I am ' },
    { text: 'Johnson Su', tone: 'entity' },
    { text: '.\n' },
    {
        text: 'I am a full-stack software engineer in Toronto focused on building clean products and reliable systems.\n\n',
    },
    { text: 'Network:\n', tone: 'label' },
    {
        text: '[GitHub]',
        href: 'https://github.com/johnsonsu',
        external: true,
        tone: 'entity',
    },
    { text: '  ' },
    {
        text: '[LinkedIn]',
        href: 'https://www.linkedin.com/in/johnsonsu/',
        external: true,
        tone: 'entity',
    },
    { text: '\n\n' },
    { text: 'Current mission: ', tone: 'label' },
    { text: 'building a crypto perpetual exchange at ' },
    { text: 'Rails', href: 'https://rails.xyz', external: true, tone: 'entity' },
    { text: '.\n\n' },
    { text: 'Thanks for visiting.' },
]

const baseDelayMs = 28
const skipHomeTypingKey = 'skip-home-typing-on-tab-nav'

function getDelay(char: string) {
    if (char === '\n') return 120
    if (char === '.' || char === ',') return 85
    if (char === ':' || char === ';') return 95
    return baseDelayMs
}

export default function HomeTerminal() {
    const [segmentIndex, setSegmentIndex] = useState(0)
    const [charIndex, setCharIndex] = useState(0)
    const [reduceMotion, setReduceMotion] = useState(false)
    const [skipTypingFromTab] = useState(() => {
        if (typeof window === 'undefined') return false
        const shouldSkipTyping = window.sessionStorage.getItem(skipHomeTypingKey) === '1'
        if (shouldSkipTyping) {
            window.sessionStorage.removeItem(skipHomeTypingKey)
        }
        return shouldSkipTyping
    })

    const isDone = skipTypingFromTab || segmentIndex >= typingScript.length

    const visibleSegments = useMemo(() => {
        if (reduceMotion || skipTypingFromTab) return typingScript

        const complete = typingScript.slice(0, segmentIndex)
        if (isDone) return complete

        const active = typingScript[segmentIndex]
        if (!active) return complete

        return [...complete, { ...active, text: active.text.slice(0, charIndex) }]
    }, [charIndex, isDone, reduceMotion, segmentIndex, skipTypingFromTab])

    useEffect(() => {
        const query = window.matchMedia('(prefers-reduced-motion: reduce)')
        const updatePreference = () => setReduceMotion(query.matches)

        updatePreference()
        query.addEventListener('change', updatePreference)
        return () => query.removeEventListener('change', updatePreference)
    }, [])

    useEffect(() => {
        if (reduceMotion || skipTypingFromTab || isDone) return

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
    }, [charIndex, isDone, reduceMotion, segmentIndex, skipTypingFromTab])

    function renderSegment(segment: ScriptSegment, index: number) {
        const key = `${segment.href || 'text'}-${index}`
        const className = segment.href
            ? `typed-link ${getTerminalToneClass(segment.tone)}`
            : getTerminalToneClass(segment.tone)

        if (!segment.href) {
            return (
                <span className={className} key={key}>
                    {segment.text}
                </span>
            )
        }
        if (!segment.external) {
            return (
                <Link key={key} className={className} href={segment.href}>
                    {segment.text}
                </Link>
            )
        }
        return (
            <a
                key={key}
                className={className}
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
