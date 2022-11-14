import { debounce } from 'lodash'
import { useEffect, useState } from 'react'
import { Game } from '../../constants/types'

type GameWithConsoleID = Game & { console_id?: string }

const fetchData = async (query: string, cb: any) => {
    const res = await fetch(`/api/search?query=${query}`).then((rsp) =>
        rsp.json()
    )
    cb(res)
}
const debouncedFetchData = debounce(fetchData, 500)

export const useGameSearch = ({ query }: { query: string }) => {

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

    return {
        games,
        loading
    }
}