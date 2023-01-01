import { ChangeEvent, useCallback, useEffect, useState } from "react"
import { Game } from "../../constants/types"
import { useRouter } from 'next/router'
import { debounce } from "lodash"




export const useAllGamesInConsole = ({ defaultGames, platform }: { defaultGames: Game[], platform: string }) => {
    const [games, setGames] = useState(defaultGames)
    const [page, setPage] = useState(1)
    const [order, setOrder] = useState('name-asc')
    const {
        query: { query },
        replace,
    } = useRouter()
    const [showMore, setShowMore] = useState(true)

    const onChangeQuery = (e: ChangeEvent<HTMLInputElement>) => {
        replace({
            query: { query: e.target.value, platform },

        }, undefined, { shallow: true })
    }


    const callApiOnChange = () => {
        const [orderBy, direction] = order.split('-')
        fetch(
            `/api/${platform}/all?page=${page}&orderBy=${orderBy}&direction=${direction}&query=${query || ''}`
        )
            .then((rsp) => rsp.json())
            .then(({ games: g, count }) => {
                setShowMore(g.length < count)
                if (page === 1) {
                    setGames(g)
                } else {
                    setGames((existingGames) => [...existingGames, ...g])
                }
            })
    }
    const debouncedFetchData = debounce(callApiOnChange, 500);
    const onChangeSort = (e: any) => setOrder(e.target.value)

    useEffect(() => {
        callApiOnChange()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    useEffect(() => {
        setPage(1)
        callApiOnChange()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [order, platform])

    useEffect(() => {
        setPage(1)
        debouncedFetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query])

    const incrementPage = () => setPage((p) => p + 1)

    return {
        games,
        onChangeSort,
        incrementPage,
        query,
        onChangeQuery,
        showMore
    }
}