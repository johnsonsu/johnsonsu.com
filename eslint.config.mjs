import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

const config = [
    ...nextCoreWebVitals,
    {
        ignores: ['**/.DS_Store'],
    },
]

export default config
