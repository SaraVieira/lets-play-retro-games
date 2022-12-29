import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { Game } from '../../constants/types'
import { formatDate } from '../../utils/dates'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import { prisma } from '../../prisma/prisma'
import { consolesMenu } from '../../constants/info'

const FranchiseSingle = ({ games }: { games: Game[] }) => {
  return (
    <div className="max-w-[90%] !block mt-6 mb-6 w-[1024px] tui-window text-left m-auto">
      <table className="tui-table w-full tui-table hovered-cyan">
        <thead className="p-4">
          <tr>
            <th className="text-left pl-2">Name</th>
            <th className="text-left pl-2">Console</th>
            <th className="text-left pl-2">Rating</th>
            <th className="text-left pl-2">Release Date</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr
              key={game.slug + game.id + game.console}
              className="cursor-pointer"
            >
              <td className="!px-2">
                <Link
                  href={`/${game.console}/${game.slug}`}
                  className="block w-full"
                >
                  {game.name}
                </Link>
              </td>{' '}
              <td className="!px-2">
                <Link
                  href={`/${game.console}/${game.slug}`}
                  className="block w-full"
                >
                  {consolesMenu.find(({ id }) => id === game.console)?.name}
                </Link>
              </td>
              <td className="!px-2">
                <Link
                  href={`/${game.console}/${game.slug}`}
                  className="block w-full"
                >
                  {game.total_rating ? game.total_rating.toFixed(1) : null}
                </Link>
              </td>
              <td className="!px-2">
                <Link
                  href={`/${game.console}/${game.slug}`}
                  className="block w-full"
                >
                  {game.first_release_date
                    ? formatDate(game.first_release_date)
                    : null}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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

  const igdbIdOfGames = await prisma.collection.findFirst({
    where: {
      slug,
    },
  })

  const result = await prisma.game.findMany({
    where: {
      igdb_id: {
        in: igdbIdOfGames?.games,
      },
    },
  })

  return {
    props: {
      games: result,
      userInfo,
    },
  }
}

export default FranchiseSingle
