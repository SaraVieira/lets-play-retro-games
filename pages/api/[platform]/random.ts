

import { CONSOLES, Game, Prisma } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { PLATFORMS } from '../../../constants/info'
import { prisma } from '../../../prisma/prisma'

type Data = {
    id: number
    first_release_date: number | null
    total_rating: number | null
    name: string
    slug: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { platform } = req.query as { platform: keyof typeof PLATFORMS }

    const games: Game[] = await prisma.$queryRaw`
      Select id, igdb_id, first_release_date, total_rating, name, slug from "Game"
      WHERE console = ${platform}::"CONSOLES" 
      ORDER BY RANDOM ()
      limit 1;`

    res.status(200).json(games[0])
}

export default handler

