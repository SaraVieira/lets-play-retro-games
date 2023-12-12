import { prisma } from '../../prisma/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { CONSOLES } from '@prisma/client'

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { query, console: consoleQuery } = req.query as unknown as {
    query: string
    console: CONSOLES
  }

  if (!console) {
    return res.status(500).json({
      error: 'No console passed',
    })
  }

  if (!Object.keys(CONSOLES).includes(consoleQuery)) {
    return res.status(500).json({
      error: 'Invalid console',
    })
  }

  const games = await prisma.game.findFirst({
    orderBy: {
      _relevance: {
        fields: ['name'],
        search: query
          .trim()
          .replace(/ *\([^)]*\) */g, '')
          .split('_')
          .join(' ')
          .split(' ')
          .join(' & '),
        sort: 'desc',
      },
    },
    where: {
      console: {
        in: consoleQuery,
      },
    },

    include: {
      genres: true,
    },
  })
  res.status(200).json(games)
}

export default handler
