import { prisma } from '../../prisma/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

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
    res.status(200).json(games)
}

export default handler
