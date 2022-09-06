import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { consolesMenu } from '../constants/info'
import { Game } from '../constants/types'

const Search = () => {
  const [query, setQuery] = useState('')
  const [games, setGames] = useState<Game[]>([])

  const callApiOnChange = useCallback(() => {
    fetch(`/api/search?query=${query}`)
      .then((rsp) => rsp.json())
      .then(setGames)
  }, [query])

  useEffect(() => {
    callApiOnChange()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return (
    <div className="tui-window h-full text-left w-full">
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
            <th className="text-left pl-2">Release Date</th>
          </tr>
        </thead>
        <tbody>
          {query ? (
            games.map((game) => (
              <Link
                key={game.slug + game.id + game.console}
                href={`/${game.console}/${game.slug}`}
                passHref
              >
                <tr className="cursor-pointer">
                  <td className="!px-2">{game.name}</td>
                  <td className="!px-2">
                    {
                      (consolesMenu.find(({ id }) => id === game.console) || {})
                        .name
                    }
                  </td>
                  <td className="!px-2">
                    {game.total_rating ? game.total_rating.toFixed(1) : null}
                  </td>
                  <td className="!px-2">
                    {game.first_release_date
                      ? new Date(game.first_release_date * 1000).toLocaleString(
                          'PT-pt',
                          {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                          }
                        )
                      : null}
                  </td>
                </tr>
              </Link>
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
