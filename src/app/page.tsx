'use client'
import { useState } from 'react'
import { TypeAnimation } from 'react-type-animation'

export default function Home() {
    const [showLinks, setShowLinks] = useState(false)
    const [showGrindrWeb, setShowGrindrWeb] = useState(false)
    return (
        <main className="flex min-h-screen flex-col p-12 lg:p-24 ">
            <div className="mb-32 grid lg:max-w-5xl lg:w-full text-left text-lg">
                <TypeAnimation
                    className="w-full"
                    style={{ whiteSpace: 'pre-line', display: 'inline-block' }}
                    sequence={[
                        'Hello there!\n',
                        500,
                        'Hello there!\nNice meeting you here 🌊.',
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
                ></TypeAnimation>
                {showLinks && (
                    <div>
                        <ul className="underline mb-4">
                            <li>
                                <a
                                    href="https://github.com/johnsonsu"
                                    rel="noreferrer"
                                    target="_blank"
                                >
                                    Github
                                </a>
                            </li>
                            <li>
                                <a
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
                                "I'm currently working at Rails building a crypto exchnage 📈.",
                                500,
                                "I'm currently working at Rails building a crypto exchnage 📈.\n\nMy most recent project is a the brand new Grindr Web 🏳️‍🌈.\n I lead the team to build the web app from scratch, and it's now live at:",
                                () => setShowGrindrWeb(true),
                            ]}
                            cursor={showGrindrWeb ? false: true}
                        />
                        <a
                            className="underline"
                            style={{
                                visibility: showGrindrWeb
                                    ? 'visible'
                                    : 'hidden',
                            }}
                            href="https://web.grindr.com"
                            rel="noreferrer"
                            target="_blank"
                        >
                            https://web.grindr.com.
                        </a>
                    </div>
                )}
                {showGrindrWeb && (
                    <TypeAnimation
                        className="w-full"
                        style={{
                            whiteSpace: 'pre-line',
                            display: 'inline-block',
                        }}
                        sequence={[500, '\nHope you have a great day! ✌️']}
                        cursor={true}
                    />
                )}
            </div>
        </main>
    )
}
