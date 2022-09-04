import { Game } from '@prisma/client';
import { GetServerSidePropsContext } from 'next';
import absoluteUrl from 'next-absolute-url'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { PLATFORMS } from '../../constants/info'
const All = ({ games: defaultGames, platform }: { games: Game[], platform: keyof typeof PLATFORMS }) => {
    const [games, setGames] = useState(defaultGames);
    const [page, setPage] = useState(1)
    const [order, setOrder] = useState("name-asc")

    const callApiOnChange = (orderPassed?: string) => {
        const usedOrder = orderPassed || order
        const [orderBy, direction] = usedOrder.split("-");
        fetch(`/api/${platform}/all?page=${page}&orderBy=${orderBy}&direction=${direction}`).then(rsp => rsp.json()).then(g => {
            if (page === 1) {
                setGames(g)
            } else {
                setGames(a => [...a, ...g])
            }
        })
    }

    const onChangeSort = (e: any) => {
        setOrder(e.target.value)
    }

    useEffect(() => {
        callApiOnChange()
    }, [page])

    useEffect(() => {
        setPage(1)
        callApiOnChange()
    }, [order])

    return <div className="tui-window text-left w-full">
        <div className='flex justify-end gap-2'>
            Order by
            <select className="tui-input" onChange={onChangeSort}>
                <option value="name-asc">Name</option>
                <option value="total_rating-desc">Rating (desc)</option>
                <option value="total_rating-asc">Rating (asc)</option>
                <option value="first_release_date-asc">Date</option>
            </select>
        </div>
        <table className="tui-table w-full tui-table hovered-cyan">
            <thead className='p-4'>
                <tr>
                    <th className='text-left pl-2'>Name</th>
                    <th className='text-left pl-2' >Rating</th>
                    <th className='text-left pl-2'>Release Date</th>
                </tr>
            </thead>
            <tbody>
                {games.map(game => (
                    <Link key={game.slug + game.id + game.console} href={`/${platform}/${game.slug}`} passHref>
                        <tr className='cursor-pointer'>
                            <td className='!px-2'>{game.name}</td>
                            <td className='!px-2'>{game.total_rating ? game.total_rating.toFixed(1) : null}</td>
                            <td className='!px-2'>{game.first_release_date ? new Date(game.first_release_date * 1000).toLocaleString('PT-pt', {
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric',
                            }) : null}</td>
                        </tr></Link>
                ))}

            </tbody>
        </table>            <div className='items-center justify-center flex w-full gap-2 mb-4 mt-4'>
            <button className='tui-button' onClick={() => setPage(p => p + 1)}>Load More</button></div></div>


}


export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { platform } = context.query as { platform: keyof typeof PLATFORMS };

    const { origin } = absoluteUrl(context.req)

    const data = await fetch(`${origin}/api/${platform}/all?page=1`).then(rsp => rsp.json())

    return {
        props: {
            games: data,
            platform
        }
    }
}


export default All;

