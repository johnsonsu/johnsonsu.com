import TerminalShell from '@/components/terminal-shell'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Works',
    description: 'Current work and selected past experience for Johnson Su.',
    alternates: {
        canonical: '/works',
    },
}

type WorkEntry = {
    title: string
    company: string
    companyUrl: string
    dates: string
    details: string
    bullets: string[]
}

const currentWork: WorkEntry = {
    title: 'Principal Architect',
    company: 'Rails',
    companyUrl: 'https://rails.xyz',
    dates: 'Feb 2025 - Present',
    details: 'Permanent Full-time · Toronto, Ontario, Canada · Hybrid',
    bullets: [
        'Develop and maintain business-critical software that is reliable, scalable, and maintainable.',
        'Leverage AWS and GitHub to build codified infrastructure and automated CI/CD pipelines for seamless deployment.',
        'Design and implement tailored EVM Smart Contracts that meet business requirements and pass professional audits.',
        'Mentor and guide engineers through system design, code examples, and comprehensive code reviews.',
        'Integrate AI into workflows to enhance productivity, streamline development, and create more time for mentorship.',
    ],
}

const pastWorkHistory: WorkEntry[] = [
    {
        title: 'Staff Software Engineer',
        company: 'Grindr',
        companyUrl: 'https://www.grindr.com',
        dates: 'Sep 2021 - Oct 2023',
        details: 'Permanent Full-time',
        bullets: [
            'Led full-stack web application development from design and prototyping to production scaling and provisioning.',
            'Built an engineering team from the ground up through candidate screening, interviews, mentoring, and knowledge sharing.',
            'Supported Marketing, Privacy, and Customer Support teams through consultation and domain expertise.',
        ],
    },
    {
        title: 'Senior Software Engineer',
        company: 'Coinsquare',
        companyUrl: 'https://www.coinsquare.com',
        dates: 'Jul 2019 - Oct 2020',
        details: 'Toronto, Canada',
        bullets: [
            'Delivered full-stack blockchain and stablecoin development initiatives.',
            'Launched BTC, ETH, and Canadian Dollar stablecoin flows on the Stellar blockchain.',
            'Implemented secure transaction signing and broadcast services, plus SEP-based Stellar asset integrations with partners.',
            'Owned anchor integration UX for StellarX and XCM.com on/off-ramp experiences.',
        ],
    },
]

function renderWorkItem(work: WorkEntry, isCurrent = false) {
    return (
        <article
            className={`work-item${isCurrent ? ' work-item-current' : ''}`}
            key={`${work.company}-${work.title}`}
        >
            <h2 className="work-title">
                {work.title}{' '}
                <span className="work-company">
                    @{' '}
                    <Link
                        href={work.companyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="typed-link"
                    >
                        {work.company}
                    </Link>
                </span>
            </h2>
            <p className="work-meta">
                <span>{work.dates}</span>
                <span>{work.details}</span>
            </p>
            <ul className="work-bullets">
                {work.bullets.map((bullet, index) => (
                    <li key={bullet}>
                        {work.company === 'Grindr' && index === 0 ? (
                            <>
                                Led{' '}
                                <Link
                                    href="https://web.grindr.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="typed-link"
                                >
                                    full-stack web application
                                </Link>{' '}
                                development from design and prototyping to production scaling and
                                provisioning.
                            </>
                        ) : (
                            bullet
                        )}
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
                        <p className="works-intro" id="current-work">
                            Current work
                        </p>
                        {renderWorkItem(currentWork, true)}
                    </section>

                    <section className="works-section" aria-labelledby="past-experience">
                        <p className="works-intro" id="past-experience">
                            Past experience
                        </p>
                        <div className="works-list">
                            {pastWorkHistory.map((work) => renderWorkItem(work))}
                        </div>
                    </section>
                </div>
            </div>
        </TerminalShell>
    )
}
