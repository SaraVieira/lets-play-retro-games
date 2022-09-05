import { CONSOLES, Game, Prisma } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../prisma/prisma'

type Data = {
  id: number
  first_release_date: number | null
  total_rating: number | null
  name: string
  slug: string
}[]

enum OrderBy {
  total_rating = 'total_rating',
  name = 'name',
  first_release_date = 'first_release_date',
}

type Query = {
  platform: CONSOLES
  page: number
  orderBy: OrderBy
  direction: 'desc' | 'asc'
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {
    platform,
    page = 1,
    orderBy = 'name',
    direction = 'asc',
  } = req.query as unknown as Query
  const PER_PAGE = 50
  const extraSearch =
    orderBy === 'total_rating'
      ? {
          total_rating: {
            not: null,
          },
        }
      : orderBy === 'first_release_date'
      ? {
          first_release_date: {
            not: null,
          },
        }
      : {}

  const games = await prisma.game.findMany({
    select: {
      id: true,
      igdb_id: true,
      first_release_date: true,
      total_rating: true,
      name: true,
      slug: true,
    },
    where: {
      console: platform,
      ...extraSearch,
    },
    take: PER_PAGE,
    skip: (page - 1) * PER_PAGE + 1,
    orderBy: [
      {
        [orderBy]: direction,
      },
    ],
  })
  res.status(200).json(games)
}

export default handler
