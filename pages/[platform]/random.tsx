

import { PLATFORMS } from '../../constants/info'
import { GetServerSidePropsContext } from 'next'
import { Game } from '../../constants/types'
import { prisma } from '../../prisma/prisma'
import { GamePage } from '../../components/Game'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}


export default function Example({ game }: { game: Game }) {

  return <GamePage game={game} />
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { platform } = context.query as { platform: keyof typeof PLATFORMS };

  const result: Game[] = await prisma.$queryRaw`
    Select * from "Game"
    WHERE console = ${platform}::"CONSOLES" 
    ORDER BY RANDOM ()
    limit 1;`

  return {
    props: {
      game: result[0]
    }
  }
}