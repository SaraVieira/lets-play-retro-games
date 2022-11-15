import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"
import { Game } from "../../constants/types"

export const useGamesInGenre = ({ defaultGames, platform }: { defaultGames: Game[], platform: string }) => {
    const [games, setGames] = useState(defaultGames)
    const { query } = useRouter()
    const [page, setPage] = useState(1)
    const [order, setOrder] = useState('name-asc')

    const callApiOnChange = useCallback(
        (orderPassed?: string) => {
            const usedOrder = orderPassed || order
            const [orderBy, direction] = usedOrder.split('-')
            fetch(
                `/api/${platform}/genres/${query.genre}?page=${page}&orderBy=${orderBy}&direction=${direction}`
            )
                .then((rsp) => rsp.json())
                .then((g) => {
                    if (page === 1) {
                        setGames(g)
                    } else {
                        setGames((existingGames) => [...existingGames, ...g])
                    }
                })
        },
        [order, page, platform]
    )

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

    const incrementPage = () => setPage((p) => p + 1)

    return {
        games, onChangeSort, incrementPage
    }
}