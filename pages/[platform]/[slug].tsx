import { GetServerSidePropsContext } from 'next'
import { GamePage } from '../../components/Game'
import { prisma } from '../../prisma/prisma'
import { Game } from '../../constants/types'
import { GameActions } from '../../components/GameActions'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import Head from 'next/head'

const title = "Let's Play Retro Games"

export default function Example({
  game,
  userInfo,
}: {
  game: Game
  userInfo: any
}) {
  return (
    <>
      <Head>
        <title>
          {title} - {game.name}
        </title>
        <meta name="title" content={`${title} - ${game.name}`} />
        <meta
          name="description"
          content={`Find about ${game.name} in ${title}`}
        />
      </Head>
      {userInfo && (
        <GameActions id={game.id} console={game.console} userInfo={userInfo} />
      )}
      <GamePage game={game} />
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { slug } = context.query as { slug: string }
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  )
  let userInfo = null
  if (session?.user) {
    userInfo = await prisma.user.findFirst({
      where: {
        // @ts-ignore
        id: session.user.id as number,
      },
      select: {
        finished: true,
        favorite: true,
        playing: true,
        id: true,
      },
    })
  }
  const result = await prisma.game.findFirst({
    where: {
      slug,
    },
    include: {
      genres: true,
    },
  })

  return {
    props: {
      game: result,
      userInfo,
    },
  }
}
