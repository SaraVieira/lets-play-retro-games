import { prisma } from '../../prisma/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { consolesMenu } from '../../constants/info'

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
    const { query } = req.query as unknown as { query: string }

    const games = await prisma.game.findMany({
        select: {
            id: true,
            igdb_id: true,
            first_release_date: true,
            total_rating: true,
            name: true,
            slug: true,
            console: true
        },
        orderBy: [
            {
                "first_release_date": "asc",
            },
        ],
        where: {
            name: {
                search: query,
            },
        },
    })
    res.status(200).json(games.map(game => ({
        ...game,
        console_id: game.console,
        console: consolesMenu.find(console => console.id === game.console)?.name
    })))
}

export default handler
