import { debounce } from 'lodash'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Game } from '../constants/types'
import { Loading } from '../components/Loading'

const fetchData = async (query: string, cb: any) => {
  const res = await fetch(`/api/search?query=${query}`).then((rsp) =>
    rsp.json()
  )
  cb(res)
}
const debouncedFetchData = debounce(fetchData, 500)

type GameWithConsoleID = Game & { console_id?: string }

const Search = () => {
  const [query, setQuery] = useState('')
  const [games, setGames] = useState<GameWithConsoleID[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (query) {
      setLoading(true)
      debouncedFetchData(query, (res: GameWithConsoleID[]) => {
        setGames(res)
        setLoading(false)
      })
    } else {
      setGames([])
    }
  }, [query])

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
              <Link
                key={game.slug + game.id + game.console}
                href={`/${game.console_id}/${game.slug}`}
                passHref
              >
                <tr className="cursor-pointer">
                  <td className="!px-2">{game.name}</td>
                  <td className="!px-2">{game.console}</td>
                  <td className="!px-2">
                    {game.total_rating ? game.total_rating.toFixed(1) : null}
                  </td>
                  <td className="!px-2 hidden sm:block">
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
