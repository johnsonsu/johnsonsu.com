'use client'
import { useState } from 'react'
import { TypeAnimation } from 'react-type-animation'

export default function Home() {
    const [showLinks, setShowLinks] = useState(false)
    const [showWebsite, setShowWebsite] = useState(false)
    return (
        <main className="flex min-h-screen flex-col p-12 lg:p-24 ">
            <div className="mb-32 grid lg:max-w-5xl lg:w-full text-left text-lg">
                <TypeAnimation
                    className="w-full"
                    style={{ whiteSpace: 'pre-line', display: 'inline-block' }}
                    sequence={[
                        'Hello there!\n',
                        200,
                        'Hello there!\nNice meeting you here 👋.',
                        500,
                        "Hello there!\nNice meeting you here 👋.\n\nMy name is Johnson 🧑🏻‍💻.\n I'm a software engineer based in Toronto 🍁.",
                        500,
                        "Hello there!\nNice meeting you here 👋.\n\nMy name is Johnson 🧑🏻‍💻.\n I'm a software engineer based in Toronto 🍁.\n\nYou can find out more about my works with the links below 👇:",
                        100,
                        () => setShowLinks(true),
                    ]}
                    preRenderFirstString={true}
                    cursor={showLinks ? false: true}
                    speed={80}
                />
                {showLinks && (
                    <div>
                        <ul className="mb-4">
                            <li>
                                <span>🤖 &nbsp;</span>
                                <a
                                    className='underline'
                                    href="https://github.com/johnsonsu"
                                    rel="noreferrer"
                                    target="_blank"
                                >
                                    Github
                                </a>
                            </li>
                            <li>
                                <span>💬 &nbsp;</span>
                                <a
                                    className='underline'
                                    href="https://www.linkedin.com/in/johnsonsu/"
                                    rel="noreferrer"
                                    target="_blank"
                                >
                                    LinkedIn
                                </a>
                            </li>
                        </ul>
                        <TypeAnimation
                            className="w-full"
                            style={{
                                whiteSpace: 'pre-line',
                                display: 'inline-block',
                            }}
                            sequence={[
                                500,
                                "I'm currently working at Rails building a crypto perp exchange 📈.",
                                () => setShowWebsite(true),
                            ]}
                            cursor={showWebsite ? false: true}
                            speed={80}
                        />
                        <span>
                        🌐 &nbsp;
                        </span>
                        <a
                            className="underline"
                            style={{
                                visibility: showWebsite
                                    ? 'visible'
                                    : 'hidden',
                            }}
                            href="https://rails.xyz"
                            rel="noreferrer"
                            target="_blank"
                        >
                           https://rails.xyz
                        </a>
                    </div>
                )}
                {showWebsite && (
                    <TypeAnimation
                        className="w-full"
                        style={{
                            whiteSpace: 'pre-line',
                            display: 'inline-block',
                        }}
                        sequence={[500, '\nHope you have a great day! ✌️']}
                        cursor={true}
                        speed={80}
                    />
                )}
            </div>
        </main>
    )
}
