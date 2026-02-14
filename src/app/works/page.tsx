import TerminalShell from '@/components/terminal-shell'
import Link from 'next/link'

const workHistory = [
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

export default function WorksPage() {
    return (
        <TerminalShell activeTab="works">
            <div className="terminal-output works-output">
                <p className="works-intro">Selected past experience</p>
                <div className="works-list">
                    {workHistory.map((work) => (
                        <article className="work-item" key={`${work.company}-${work.title}`}>
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
                                                development from design and prototyping to production scaling and provisioning.
                                            </>
                                        ) : (
                                            bullet
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </div>
        </TerminalShell>
    )
}
