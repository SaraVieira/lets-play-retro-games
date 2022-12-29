import { CONSOLES, Game, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import slugify from 'slugify'
import { omit } from 'lodash'
import nesGames from '../data/games/nes/all.json'
import snesGames from '../data/games/snes/all.json'
import gbGames from '../data/games/gb/all.json'
import gbaGames from '../data/games/gba/all.json'
import gbcGames from '../data/games/gbc/all.json'
import n64Games from '../data/games/n64/all.json'
import mdGames from '../data/games/md/all.json'
import msGames from '../data/games/ms/all.json'
import ggGames from '../data/games/gg/all.json'
import pceGames from '../data/games/pce/all.json'
import psxGames from '../data/games/psx/all.json'
import sega32Games from '../data/games/sega32/all.json'
import vbGames from '../data/games/vb/all.json'
import satGames from '../data/games/sat/all.json'
import gcnGames from '../data/games/gcn/all.json'
import neoGames from '../data/games/neo/all.json'
import atari2600Games from '../data/games/atari2600/all.json'
import panasonic3DOGames from '../data/games/panasonic3DO/all.json'
import ngpGames from '../data/games/ngp/all.json'
import cdiGames from '../data/games/cdi/all.json'
import jaguarGames from '../data/games/jaguar/all.json'
import lynxGames from '../data/games/lynx/all.json'

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

type FetchedGame = Omit<Game, 'console'> & { genres: { id: number, name: string, slug: string }[], collection: { id: number, name: string, slug: string, games: number[] } }

const createGames = async (
  games: FetchedGame[],
  platform: CONSOLES
) => {
  const all = games.map(async (game, i) => {
    // @ts-ignore
    const gameInDb = await prisma.game.findFirst({
      where: {
        igdb_id: game.id,
        console: platform,
      },
    })


    if (gameInDb?.name) return
    console.log(`Adding game ${i + 1}/${all.length}`)
    await prisma.game.create({
      // @ts-ignore
      data: {
        ...defaultValues,
        ...omit(game, ['id', "genres", "collection"]),
        igdb_id: game.id,
        console: platform,
        ...game.collection && {
          collections: {
            connectOrCreate: {
              create: {
                id: game.collection.id,
                name: game.collection.name,
                slug: game.collection.slug,
                games: game.collection.games
              },
              where: {
                id: game.collection.id
              }
            }
          }
        },
        genres: {
          connectOrCreate: [
            ...(game.genres || []).map(genre => ({
              create: {
                id: genre.id,
                name: genre.name,
                slug: slugify(genre.name.toLocaleLowerCase())
              },
              where: {
                id: genre.id
              }
            })).flat()
          ]
        }
      },
    })
  })

  await Promise.all(all)
}

async function main() {
  // @ts-ignore
  await createGames(lynxGames, 'lynx')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
