import { quotes } from '@/constants/quotes'
import { useInterval } from '@/hooks/use-interval'
import { useState } from 'react'

interface QuoteBoxProps extends React.HTMLAttributes<HTMLDivElement> {}

export function QuoteBox(_: QuoteBoxProps) {
    const [quote, setQuote] = useState<string>(quotes['Raul Menendez'].quote1)
    const [author, setAuthor] = useState<string>('Raul Menendez')

    const getRandomQuote = () => {
        const authors = Object.keys(quotes)
        const randomAuthor = authors[Math.floor(Math.random() * authors.length)]
        return quotes[randomAuthor]
    }

    const displayRandomQuote = () => {
        const randomQuote = getRandomQuote()
        setQuote(randomQuote.quote1)
        setAuthor(
            Object.keys(quotes).find((key) => quotes[key] === randomQuote) || ''
        )
    }

    useInterval(displayRandomQuote, 4000)

    return (
        <blockquote
            className="space-y-2 motion-preset-slide-left motion-duration-300"
            key={author}
        >
            <p className="text-lg">&ldquo;{quote}&rdquo;</p>
            <footer className="text-sm">&mdash; {author}</footer>
        </blockquote>
    )
}
