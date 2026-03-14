import Link from 'next/link'
import type { Metadata } from 'next'
import TerminalShell from '@/components/terminal-shell'
import { getTerminalToneClass, type TerminalTone } from '@/components/terminal-tone'

export const metadata: Metadata = {
    title: 'Works',
    description: 'Current work and selected past experience for Johnson Su.',
    alternates: {
        canonical: '/works',
    },
}

type WorkSegment = {
    text: string
    tone?: TerminalTone
    href?: string
    external?: boolean
}

type WorkBullet = {
    lead: WorkSegment[]
    body: WorkSegment[]
}

type WorkEntry = {
    title: string
    company: string
    companyUrl: string
    dates: string
    employmentType: string
    location?: string
    workMode?: string
    bullets: WorkBullet[]
}

const currentWork: WorkEntry = {
    title: 'Principal Architect',
    company: 'Rails',
    companyUrl: 'https://rails.xyz',
    dates: 'Feb 2025 - Present',
    employmentType: 'Permanent Full-time',
    location: 'Toronto, Ontario, Canada',
    workMode: 'Hybrid',
    bullets: [
        {
            lead: [{ text: 'Develop and maintain' }],
            body: [
                {
                    text: ' business-critical software that is reliable, scalable, and maintainable.',
                },
            ],
        },
        {
            lead: [
                { text: 'Leverage ' },
                { text: 'AWS', tone: 'tech' },
                { text: ' and ' },
                { text: 'GitHub', tone: 'tech' },
            ],
            body: [
                { text: ' to build codified infrastructure and automated ' },
                { text: 'CI/CD pipelines', tone: 'tech' },
                { text: ' for seamless deployment.' },
            ],
        },
        {
            lead: [
                { text: 'Design and implement tailored ' },
                { text: 'EVM Smart Contracts', tone: 'tech' },
            ],
            body: [
                { text: ' that meet business requirements and pass professional audits.' },
            ],
        },
        {
            lead: [{ text: 'Mentor and guide engineers' }],
            body: [
                {
                    text: ' through system design, code examples, and comprehensive code reviews.',
                },
            ],
        },
        {
            lead: [{ text: 'Integrate ' }, { text: 'AI', tone: 'tech' }, { text: ' into workflows' }],
            body: [
                {
                    text: ' to enhance productivity, streamline development, and create more time for mentorship.',
                },
            ],
        },
    ],
}

const pastWorkHistory: WorkEntry[] = [
    {
        title: 'Staff Software Engineer',
        company: 'Grindr',
        companyUrl: 'https://www.grindr.com',
        dates: 'Sep 2021 - Oct 2023',
        employmentType: 'Permanent Full-time',
        bullets: [
            {
                lead: [{ text: 'Led ' }, { text: 'full-stack web application', tone: 'tech', href: 'https://web.grindr.com', external: true }],
                body: [
                    {
                        text: ' development from design and prototyping to production scaling and provisioning.',
                    },
                ],
            },
            {
                lead: [{ text: 'Built an engineering team from the ground up' }],
                body: [
                    {
                        text: ' through candidate screening, interviews, mentoring, and knowledge sharing.',
                    },
                ],
            },
            {
                lead: [{ text: 'Supported partner teams' }],
                body: [
                    {
                        text: ' across Marketing, Privacy, and Customer Support through consultation and domain expertise.',
                    },
                ],
            },
        ],
    },
    {
        title: 'Senior Software Engineer',
        company: 'Coinsquare',
        companyUrl: 'https://www.coinsquare.com',
        dates: 'Jul 2019 - Oct 2020',
        employmentType: 'Permanent Full-time',
        location: 'Toronto, Canada',
        bullets: [
            {
                lead: [{ text: 'Delivered' }],
                body: [
                    { text: ' full-stack ' },
                    { text: 'blockchain', tone: 'tech' },
                    { text: ' and ' },
                    { text: 'stablecoin', tone: 'tech' },
                    { text: ' development initiatives.' },
                ],
            },
            {
                lead: [{ text: 'Launched ' }, { text: 'BTC', tone: 'tech' }, { text: ', ' }, { text: 'ETH', tone: 'tech' }],
                body: [
                    { text: ', and Canadian Dollar stablecoin flows on the ' },
                    { text: 'Stellar blockchain', tone: 'tech' },
                    { text: '.' },
                ],
            },
            {
                lead: [{ text: 'Implemented secure transaction signing and broadcast services' }],
                body: [
                    { text: ', plus ' },
                    { text: 'SEP-based Stellar asset integrations', tone: 'tech' },
                    { text: ' with partners.' },
                ],
            },
            {
                lead: [{ text: 'Owned anchor integration UX' }],
                body: [
                    { text: ' for ' },
                    { text: 'StellarX', tone: 'tech' },
                    { text: ' and ' },
                    { text: 'XCM.com', tone: 'tech' },
                    { text: ' on/off-ramp experiences.' },
                ],
            },
        ],
    },
]

function renderSegments(segments: WorkSegment[], keyPrefix: string) {
    return segments.map((segment, index) => {
        const key = `${keyPrefix}-${index}-${segment.text}`
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

        return (
            <Link
                className={className}
                href={segment.href}
                key={key}
                rel={segment.external ? 'noreferrer' : undefined}
                target={segment.external ? '_blank' : undefined}
            >
                {segment.text}
            </Link>
        )
    })
}

function renderMetaItem(label: string, value: string) {
    return (
        <span className="work-meta-item" key={`${label}-${value}`}>
            <span className="work-meta-label terminal-token-meta">{label}</span>
            <span className="work-meta-value">{value}</span>
        </span>
    )
}

function renderWorkItem(work: WorkEntry, isCurrent = false, itemKey?: string) {
    const metaItems = [renderMetaItem('when', work.dates), renderMetaItem('type', work.employmentType)]

    if (work.location) {
        metaItems.push(renderMetaItem('where', work.location))
    }

    if (work.workMode) {
        metaItems.push(renderMetaItem('mode', work.workMode))
    }

    return (
        <article className={`work-item${isCurrent ? ' work-item-current' : ''}`} key={itemKey}>
            <h2 className="work-title">
                <span className="work-title-role terminal-token-entity">{work.title}</span>{' '}
                <span className="work-company">
                    <span className="work-company-prefix terminal-token-label">@ </span>
                    <Link
                        href={work.companyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="typed-link work-company-link"
                    >
                        {work.company}
                    </Link>
                </span>
            </h2>
            <p className="work-meta">{metaItems}</p>
            <ul className="work-bullets">
                {work.bullets.map((bullet, index) => (
                    <li key={`${work.company}-${work.title}-bullet-${index}`}>
                        <span className="work-bullet-lead">
                            {renderSegments(bullet.lead, `${work.company}-${index}-lead`)}
                        </span>
                        <span className="work-bullet-body">
                            {renderSegments(bullet.body, `${work.company}-${index}-body`)}
                        </span>
                    </li>
                ))}
            </ul>
        </article>
    )
}

export default function WorksPage() {
    return (
        <TerminalShell activeTab="works">
            <div className="terminal-output works-output">
                <div className="works-sections">
                    <section className="works-section" aria-labelledby="current-work">
                        <p className="works-intro terminal-token-meta" id="current-work">
                            Current work
                        </p>
                        {renderWorkItem(currentWork, true)}
                    </section>

                    <section className="works-section" aria-labelledby="past-experience">
                        <p className="works-intro terminal-token-meta" id="past-experience">
                            Past experience
                        </p>
                        <div className="works-list">
                            {pastWorkHistory.map((work) =>
                                renderWorkItem(work, false, `${work.company}-${work.title}`)
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </TerminalShell>
    )
}
