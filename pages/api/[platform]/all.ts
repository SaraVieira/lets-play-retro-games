import { CONSOLES, Game, Prisma } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../prisma/prisma'

type Data = {
    id: number;
    first_release_date: number | null;
    total_rating: number | null;
    name: string;
    slug: string;
}[]

type Query = { platform: CONSOLES, page: number, orderBy: string, direction: "desc" | "asc" }

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { platform, page = 1, orderBy = "name", direction = "asc" } = req.query as unknown as Query;

    const games = await prisma.game.findMany({
        select: {
            id: true,
            first_release_date: true,
            total_rating: true,
            name: true,

            slug: true,
        },
        where: {
            console: platform,
            total_rating: {
                not: null
            }
        },
        take: 50,
        skip: page - 1,
        orderBy: [
            {
                [orderBy]: direction,
            },
        ]
    })
    res.status(200).json(games)
}

export default handler