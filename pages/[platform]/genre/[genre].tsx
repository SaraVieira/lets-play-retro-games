import { GetServerSidePropsContext } from 'next'
import absoluteUrl from 'next-absolute-url'
import Link from 'next/link'
import { ORDERS, PLATFORMS } from '../../../constants/info'
import { Game } from '../../../constants/types'
import { formatDate } from '../../../utils/dates'
import { useGamesInGenre } from '../../../utils/hooks/useGamesInGenre'

const Genre = ({
  games: defaultGames,
  platform,
}: {
  games: Game[]
  platform: keyof typeof PLATFORMS
}) => {
  const { games, onChangeSort, incrementPage } = useGamesInGenre({
    platform,
    defaultGames,
  })
  return (
    <div className="max-w-[90%] !block mt-6 mb-6 w-[1024px] tui-window text-left m-auto">
      <div className="flex justify-end gap-2">
        Order by
        <select className="tui-input" onChange={onChangeSort}>
          {Object.keys(ORDERS).map((key) => (
            <option key={key} value={key}>
              {/* @ts-ignore */}
              {ORDERS[key]}
            </option>
          ))}
        </select>
      </div>
      <table className="tui-table w-full tui-table hovered-cyan">
        <thead className="p-4">
          <tr>
            <th className="text-left pl-2">Name</th>
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
                  href={`/${platform}/${game.slug}`}
                  className="block w-full"
                >
                  {game.name}
                </Link>
              </td>{' '}
              <td className="!px-2">
                <Link
                  href={`/${platform}/${game.slug}`}
                  className="block w-full"
                >
                  {game.total_rating ? game.total_rating.toFixed(1) : null}
                </Link>
              </td>
              <td className="!px-2">
                <Link
                  href={`/${platform}/${game.slug}`}
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
      <div className="items-center justify-center flex w-full gap-2 mb-4 mt-4">
        <button className="tui-button" onClick={incrementPage}>
          Load More
        </button>
      </div>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { platform, genre } = context.query as {
    platform: keyof typeof PLATFORMS
    genre: string
  }
  const { origin } = absoluteUrl(context.req)
  const games = await fetch(
    `${origin}/api/${platform}/genres/${genre}?page=1`
  ).then((rsp) => rsp.json())

  return {
    props: {
      games,
      platform,
    },
  }
}

export default Genre
