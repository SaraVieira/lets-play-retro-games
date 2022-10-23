import { PLATFORMS } from '../../constants/info'
import { GetServerSidePropsContext } from 'next'
import { Game } from '../../constants/types'
import { prisma } from '../../prisma/prisma'
import { GamePage } from '../../components/Game'
import { GameActions } from '../../components/GameActions'
import { authOptions } from '../api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth'

export default function SingleGame({
  game,
  userInfo,
}: {
  game: Game
  userInfo: any
}) {
  return (
    <>
      {userInfo && (
        <GameActions console={game.console} id={game.id} userInfo={userInfo} />
      )}
      <GamePage game={game} />
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { platform } = context.query as { platform: keyof typeof PLATFORMS }
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
  const result: Game[] = await prisma.$queryRaw`
    Select * from "Game"
    WHERE console = ${platform}::"CONSOLES" 
    ORDER BY RANDOM ()
    limit 1;`
  return {
    props: {
      game: result[0],
      userInfo,
    },
  }
}
