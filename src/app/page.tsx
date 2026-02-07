'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'

type Theme = 'light' | 'dark'
type ThemePreference = Theme | 'auto'

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
    { text: '  ' },
    // { text: '[Works]', href: '/works' },
    { text: '\n\n' },
    { text: 'Current mission: building a crypto perpetual exchange at ' },
    { text: 'Rails', href: 'https://rails.xyz', external: true },
    { text: '.\n\n' },
    { text: 'Thanks for visiting.' },
]

const baseDelayMs = 28
const themeStorageKey = 'preferred-theme'

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
    const [theme, setTheme] = useState<ThemePreference>('auto')
    const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false)
    const themeMenuRef = useRef<HTMLDivElement | null>(null)

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
        const themeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const stored = window.localStorage.getItem(themeStorageKey)

        const applyThemePreference = (nextTheme: ThemePreference) => {
            setTheme(nextTheme)
            if (nextTheme === 'auto') {
                document.documentElement.removeAttribute('data-theme')
                return
            }
            document.documentElement.setAttribute('data-theme', nextTheme)
        }

        if (stored === 'auto' || stored === 'light' || stored === 'dark') {
            applyThemePreference(stored)
        } else {
            applyThemePreference('auto')
        }

        const onChange = () => {
            const currentPreference = window.localStorage.getItem(themeStorageKey)
            if (currentPreference === 'light' || currentPreference === 'dark') return
            applyThemePreference('auto')
        }

        themeMediaQuery.addEventListener('change', onChange)
        return () => themeMediaQuery.removeEventListener('change', onChange)
    }, [])

    useEffect(() => {
        if (reduceMotion || isDone) return

        const active = typingScript[segmentIndex]
        if (!active) return

        if (charIndex >= active.text.length) {
            setSegmentIndex((index) => index + 1)
            setCharIndex(0)
            return
        }

        const char = active.text[charIndex]
        const timeout = window.setTimeout(
            () => setCharIndex((index) => index + 1),
            getDelay(char)
        )

        return () => window.clearTimeout(timeout)
    }, [charIndex, isDone, reduceMotion, segmentIndex])

    useEffect(() => {
        const onPointerDown = (event: PointerEvent) => {
            if (!themeMenuRef.current?.contains(event.target as Node)) {
                setIsThemeMenuOpen(false)
            }
        }
        const onEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setIsThemeMenuOpen(false)
        }

        window.addEventListener('pointerdown', onPointerDown)
        window.addEventListener('keydown', onEscape)
        return () => {
            window.removeEventListener('pointerdown', onPointerDown)
            window.removeEventListener('keydown', onEscape)
        }
    }, [])

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

    function onThemeChange(nextTheme: ThemePreference) {
        setTheme(nextTheme)
        setIsThemeMenuOpen(false)
        if (nextTheme === 'auto') {
            document.documentElement.removeAttribute('data-theme')
            window.localStorage.setItem(themeStorageKey, 'auto')
            return
        }
        document.documentElement.setAttribute('data-theme', nextTheme)
        window.localStorage.setItem(themeStorageKey, nextTheme)
    }

    const themeLabel = theme === 'auto' ? 'Theme: Auto' : theme === 'dark' ? 'Theme: Dark' : 'Theme: Light'

    return (
        <main className="page-shell">
            <section className="terminal-panel" aria-label="Profile terminal">
                <header className="terminal-header">
                    <span className="terminal-dot" />
                    <span className="terminal-dot" />
                    <span className="terminal-dot" />
                    <p className="terminal-title">johnsonsu.com - session</p>
                    <div className="theme-menu" ref={themeMenuRef}>
                        <button
                            type="button"
                            onClick={() => setIsThemeMenuOpen((open) => !open)}
                            className="theme-button"
                            aria-expanded={isThemeMenuOpen}
                            aria-haspopup="true"
                        >
                            {themeLabel}
                        </button>
                        {isThemeMenuOpen && (
                            <div className="theme-menu-list" role="menu" aria-label="Theme options">
                                <button
                                    type="button"
                                    role="menuitemradio"
                                    aria-checked={theme === 'auto'}
                                    onClick={() => onThemeChange('auto')}
                                    className={`theme-option ${theme === 'auto' ? 'theme-option-active' : ''}`}
                                >
                                    Auto
                                </button>
                                <button
                                    type="button"
                                    role="menuitemradio"
                                    aria-checked={theme === 'light'}
                                    onClick={() => onThemeChange('light')}
                                    className={`theme-option ${theme === 'light' ? 'theme-option-active' : ''}`}
                                >
                                    Light
                                </button>
                                <button
                                    type="button"
                                    role="menuitemradio"
                                    aria-checked={theme === 'dark'}
                                    onClick={() => onThemeChange('dark')}
                                    className={`theme-option ${theme === 'dark' ? 'theme-option-active' : ''}`}
                                >
                                    Dark
                                </button>
                            </div>
                        )}
                    </div>
                </header>
                <div className="terminal-output" aria-live="polite">
                    {visibleSegments.map(renderSegment)}
                    <span
                        className={`terminal-cursor ${isDone ? 'terminal-cursor-idle' : ''}`}
                        aria-hidden="true"
                    >
                        █
                    </span>
                </div>
            </section>
        </main>
    )
}
