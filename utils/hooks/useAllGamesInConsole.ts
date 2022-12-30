import { useCallback, useEffect, useState } from "react"
import { Game } from "../../constants/types"

export const useAllGamesInConsole = ({ defaultGames, platform }: { defaultGames: Game[], platform: string }) => {
    const [games, setGames] = useState(defaultGames)
    const [page, setPage] = useState(1)
    const [order, setOrder] = useState('name-asc')
    const [query, setQuery] = useState('')
    const [showMore, setShowMore] = useState(true)

    const callApiOnChange = useCallback(
        (orderPassed?: string) => {
            const usedOrder = orderPassed || order
            const [orderBy, direction] = usedOrder.split('-')

            fetch(
                `/api/${platform}/all?page=${page}&orderBy=${orderBy}&direction=${direction}&query=${query}`
            )
                .then((rsp) => rsp.json())
                .then(({ games: g, count }) => {
                    console.log(g.length, count)
                    setShowMore(g.length < count)
                    if (page === 1) {
                        setGames(g)
                    } else {
                        setGames((existingGames) => [...existingGames, ...g])
                    }
                })
        },
        [order, page, platform, query]
    )

    const onChangeSort = (e: any) => setOrder(e.target.value)
    const onChangeQuery = (e: any) => setQuery(e.target.value)

    useEffect(() => {
        callApiOnChange()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    useEffect(() => {
        setPage(1)
        callApiOnChange()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [order, platform, query])

    const incrementPage = () => setPage((p) => p + 1)

    return {
        games, onChangeSort, incrementPage, query, onChangeQuery, showMore
    }
}