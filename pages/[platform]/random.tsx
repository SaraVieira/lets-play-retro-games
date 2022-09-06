import { PLATFORMS } from '../../constants/info'
import { GetServerSidePropsContext } from 'next'
import { Game } from '../../constants/types'
import { prisma } from '../../prisma/prisma'
import { GamePage } from '../../components/Game'
import { useState } from 'react'

export default function SingleGame({ game }: { game: Game }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    const url = `https://letsplayretro.games/${game.console}/${game.slug}`
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      window.setTimeout(() => {
        setCopied(false)
      }, 2000)
    })
  }

  return (
    <>
      <div className="flex mt-4 justify-end mx-6">
        <button className="tui-button" onClick={copyToClipboard}>
          {copied ? 'Copied!' : 'Copy game url'}
        </button>
      </div>
      <GamePage game={game} />
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { platform } = context.query as { platform: keyof typeof PLATFORMS }

  const result: Game[] = await prisma.$queryRaw`
    Select * from "Game"
    WHERE console = ${platform}::"CONSOLES" 
    ORDER BY RANDOM ()
    limit 1;`

  console.log('done')

  return {
    props: {
      game: result[0],
    },
  }
}
