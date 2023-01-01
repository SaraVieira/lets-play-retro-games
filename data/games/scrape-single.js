require('dotenv').config()
var slugify = require('slugify')
const { FIELDS } = require('./scrape')
const igdb = require('igdb-api-node').default
const fs = require('fs')
const { PrismaClient } = require('@prisma/client')
const { omit } = require('lodash')

const defaultValues = {
  alternative_names: [],
  cover: {},
  first_release_date: null,
  franchise: {},
  genres: [],
  involved_companies: [],
  screenshots: [],
  storyline: '',
  summary: '',
  total_rating_count: null,
  total_rating: null,
  videos: [],
}

const prisma = new PrismaClient()

const requestGame = async ({ id, platform } = {}) => {
  if (!id) return
  try {
    if (true) {
      const client = igdb(
        process.env.TWITCH_ID,
        'vb7q2541bz4av6w71ad3b8seya328t'
      )
      const response = await client
        .fields(FIELDS)
        .limit(1)
        .where(`id=(${id})`)
        .request('/games')

      const game = response.data[0]
      if (game) {
        console.log('Creating new game', game.name)
        const fileName =
          process.cwd() + `/data/games/${platform}/${game.name}.json`
        fs.writeFileSync(fileName, JSON.stringify(game))
        await prisma.game.create({
          // @ts-ignore
          data: {
            ...defaultValues,
            ...omit(game, ['id', 'genres', 'collection']),
            igdb_id: game.id,
            console: platform,
            ...(game.collection && {
              collections: {
                connectOrCreate: {
                  create: {
                    id: game.collection.id,
                    name: game.collection.name,
                    slug: game.collection.slug,
                    games: game.collection.games,
                  },
                  where: {
                    id: game.collection.id,
                  },
                },
              },
            }),
            genres: {
              connectOrCreate: [
                ...(game.genres || [])
                  .map((genre) => ({
                    create: {
                      id: genre.id,
                      name: genre.name,
                      slug: slugify(genre.name.toLocaleLowerCase()),
                    },
                    where: {
                      id: genre.id,
                    },
                  }))
                  .flat(),
              ],
            },
          },
        })
      } else {
        console.log('No info found for ' + game)
      }
    }
  } catch (e) {
    console.log(e.message)
  }
}

requestGame({ id: 1404, platform: 'neo' })
