'use client'

import Link from 'next/link'
import { type ReactNode, useEffect, useRef, useState } from 'react'

type Theme = 'light' | 'dark'
type ThemePreference = Theme | 'auto'
type ActiveTab = 'home' | 'works'

type TerminalShellProps = {
    activeTab: ActiveTab
    children: ReactNode
    title?: string
}

const themeStorageKey = 'preferred-theme'

export default function TerminalShell({
    activeTab,
    children,
    title = 'johnsonsu.com - session',
}: TerminalShellProps) {
    const [theme, setTheme] = useState<ThemePreference>('auto')
    const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false)
    const themeMenuRef = useRef<HTMLDivElement | null>(null)

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
                    <div className="terminal-topbar">
                        <span className="terminal-dot" />
                        <span className="terminal-dot" />
                        <span className="terminal-dot" />
                        <p className="terminal-title">{title}</p>
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
                    </div>
                    <nav className="terminal-tab-bar" aria-label="Terminal tabs">
                        <Link
                            href="/"
                            className={`terminal-tab ${activeTab === 'home' ? 'terminal-tab-active' : ''}`}
                            aria-current={activeTab === 'home' ? 'page' : undefined}
                            onClick={() => setIsThemeMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/works"
                            className={`terminal-tab ${activeTab === 'works' ? 'terminal-tab-active' : ''}`}
                            aria-current={activeTab === 'works' ? 'page' : undefined}
                            onClick={() => setIsThemeMenuOpen(false)}
                        >
                            Works
                        </Link>
                    </nav>
                </header>
                <div className="terminal-content">{children}</div>
            </section>
        </main>
    )
}
