import { GetServerSidePropsContext } from 'next'
import { GamePage } from '../../components/Game'
import { prisma } from '../../prisma/prisma'
import { Game } from '../../constants/types'

export default function Example({ game }: { game: Game }) {
  return <GamePage game={game} />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { slug } = context.query as { slug: string }

  const result = await prisma.game.findFirst({
    where: {
      slug,
    },
  })

  return {
    props: {
      game: result,
    },
  }
}
