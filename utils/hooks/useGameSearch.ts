import { debounce } from 'lodash'
import { useEffect, useState } from 'react'
import { Game } from '../../constants/types'
import { useRouter } from 'next/router'
type GameWithConsoleID = Game & { console_id?: string }

const fetchData = async (query: string, cb: any) => {
    const res = await fetch(`/api/search?query=${query}`).then((rsp) =>
        rsp.json()
    )
    cb(res)
}
const debouncedFetchData = debounce(fetchData, 500)

export const useGameSearch = () => {
    const {
        query: { query },
        replace,
    } = useRouter()
    const [games, setGames] = useState<GameWithConsoleID[]>([])
    const [loading, setLoading] = useState(false)


    const onChange = (value: string) => {
        replace({
            query: { query: value },
        })
    }

    useEffect(() => {
        if (query) {
            setLoading(true)
            debouncedFetchData(query as string, (res: GameWithConsoleID[]) => {
                setGames(res)
                setLoading(false)
            })
        } else {
            setGames([])
        }
    }, [query])

    return {
        games,
        loading,
        onChange, query
    }
}