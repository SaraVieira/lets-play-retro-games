

import { CONSOLES, Game, Prisma } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { consolesMenu, PLATFORMS } from '../../constants/info'
import { prisma } from '../../prisma/prisma'

type Data = {
    id: number
    first_release_date: number | null
    total_rating: number | null
    name: string
    slug: string
    console: string | undefined
}

const handler = async (_: NextApiRequest, res: NextApiResponse<Data>) => {
    const games: Game[] = await prisma.$queryRaw`
      Select id, igdb_id, console, first_release_date, total_rating, name, slug from "Game"
      ORDER BY RANDOM ()
      limit 1;`

    res.status(200).json({
        ...games[0],
        console: consolesMenu.find(console => console.id === games[0].console)?.name
    })
}

export default handler

