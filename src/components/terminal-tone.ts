export type TerminalTone = 'default' | 'command' | 'label' | 'entity' | 'meta' | 'tech'

export function getTerminalToneClass(tone: TerminalTone = 'default') {
    switch (tone) {
        case 'command':
            return 'terminal-token-command'
        case 'label':
            return 'terminal-token-label'
        case 'entity':
            return 'terminal-token-entity'
        case 'meta':
            return 'terminal-token-meta'
        case 'tech':
            return 'terminal-token-tech'
        default:
            return 'terminal-token-default'
    }
}
