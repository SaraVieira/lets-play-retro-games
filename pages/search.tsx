import Link from 'next/link'
import { useState } from 'react'
import { Loading } from '../components/Loading'
import { formatDate } from '../utils/dates'
import { useGameSearch } from '../utils/hooks/useGameSearch'

const Search = () => {
  const [query, setQuery] = useState('')
  const { loading, games } = useGameSearch({ query })

  return (
    <div className="max-w-[90%] !block mt-6 mb-6 sm:w-[1024px] tui-window text-left m-auto">
      <div className="flex justify-end gap-2">
        <label htmlFor="search">Search for a game</label>
        <input
          className="tui-input"
          type="search"
          id="search"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
      </div>
      <table className="tui-table w-full tui-table hovered-cyan">
        <thead className="p-4">
          <tr>
            <th className="text-left pl-2">Name</th>
            <th className="text-left pl-2">Console</th>
            <th className="text-left pl-2">Rating</th>
            <th className="text-left pl-2 hidden sm:block">Release Date</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <Loading />
          ) : query ? (
            games.map((game) => (
              <tr
                key={game.slug + game.id + game.console}
                className="cursor-pointer"
              >
                <td className="!px-2">
                  <Link href={`/${game.console_id}/${game.slug}`}>
                    {game.name}
                  </Link>
                </td>
                <td className="!px-2">
                  <Link href={`/${game.console_id}/${game.slug}`}>
                    {game.console}
                  </Link>
                </td>
                <td className="!px-2">
                  <Link href={`/${game.console_id}/${game.slug}`}>
                    {game.total_rating ? game.total_rating.toFixed(1) : null}
                  </Link>
                </td>
                <td className="!px-2 hidden sm:block">
                  <Link href={`/${game.console_id}/${game.slug}`}>
                    {game.first_release_date
                      ? formatDate(game.first_release_date)
                      : null}
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <th colSpan={10}>
                <span className="text-center w-full block py-12">
                  Please search for a game
                </span>
              </th>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Search
