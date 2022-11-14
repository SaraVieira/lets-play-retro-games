import { GetServerSidePropsContext } from 'next'
import { prisma } from '../../prisma/prisma'
import { Game } from '../../constants/types'
import { User } from '@prisma/client'
import Link from 'next/link'
import { formatDate } from '../../utils/dates'
import { getConsoleName } from '../../utils/consoles'

const Table = ({ games }: { games: Game[] }) => {
  return (
    <table className="tui-table w-full tui-table hovered-cyan">
      <thead>
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
            className="cursor-pointer"
            key={game.slug + game.id + game.console}
          >
            <td className="!px-2">
              <Link href={`/${game.console}/${game.slug}`}>{game.name}</Link>
            </td>
            <td className="!px-2">
              <Link href={`/${game.console}/${game.slug}`}>
                {getConsoleName(game)}
              </Link>
            </td>
            <td className="!px-2">
              <Link href={`/${game.console}/${game.slug}`}>
                {game.total_rating ? game.total_rating.toFixed(1) : null}
              </Link>
            </td>
            <td className="!px-2">
              <Link href={`/${game.console}/${game.slug}`}>
                {game.first_release_date
                  ? formatDate(game.first_release_date)
                  : null}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default function Example({
  user,
}: {
  user: User & {
    finished: Game[]
    favorite: Game[]
    playing: Game[]
  }
}) {
  return (
    <div className="p-6">
      <div className="flex gap-6">
        <img
          src={user.image as string}
          alt={user.id}
          className="w-40 tui-shadow"
        />
        <ul>
          <li>
            <strong>Finished Games:</strong>
            {user.finished.length}
          </li>
          <li>
            <strong>Currently Playing:</strong>
            {user.playing.length}
          </li>
          <li>
            <strong>favorite Games:</strong>
            {user.favorite.length}
          </li>
        </ul>
      </div>
      <div className="mt-8 flex flex-col gap-6 items-center">
        <div className="tui-window w-full">
          <fieldset className="tui-fieldset tui-border-double gap-4 block ">
            <legend>Finished Games</legend>
            <Table games={user.finished} />
          </fieldset>
        </div>
        <div className="tui-window w-full">
          <fieldset className="tui-fieldset tui-border-double gap-4 block ">
            <legend>Playing</legend>
            <Table games={user.playing} />
          </fieldset>
        </div>
        <div className="tui-window w-full">
          <fieldset className="tui-fieldset tui-border-double gap-4 block ">
            <legend>Favorite Games</legend>
            <Table games={user.favorite} />
          </fieldset>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query as { id: string }
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
    select: {
      image: true,
      id: true,
      finished: true,
      favorite: true,
      playing: true,
    },
  })

  return {
    props: {
      user,
    },
  }
}
