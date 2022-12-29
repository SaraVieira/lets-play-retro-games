require('dotenv').config()
var slugify = require('slugify')
const vbGames = require('../../constants/consoles/vb.json')
const atariGames = require('../../constants/consoles/atari2600.json')
const gbGames = require('../../constants/consoles/gb.json')
const gbaGames = require('../../constants/consoles/gba.json')
const gbcGames = require('../../constants/consoles/gbc.json')
const gcnGames = require('../../constants/consoles/gcn.json')
const ggGames = require('../../constants/consoles/gg.json')
const mdGames = require('../../constants/consoles/md.json')
const msGames = require('../../constants/consoles/ms.json')
const n64Games = require('../../constants/consoles/n64.json')
const neoGames = require('../../constants/consoles/neo.json')
const nesGames = require('../../constants/consoles/nes.json')
const nesHomebrewGames = require('../../constants/consoles/nes-homebrew.json')
const pceGames = require('../../constants/consoles/pce.json')
const psxGames = require('../../constants/consoles/psx.json')
const satGames = require('../../constants/consoles/sat.json')
const sega32Games = require('../../constants/consoles/sega32.json')
const snesGames = require('../../constants/consoles/snes.json')
const igdb = require('igdb-api-node').default
const fs = require('fs')
const pThrottle = require('p-throttle')
const threedoGames = require('../../constants/consoles/3do.json')
const cdiGames = require('../../constants/consoles/cdi.json')
const ngpGames = require('../../constants/consoles/ngp.json')
const jaguarGames = require('../../constants/consoles/jaguar.json')

const throttle = pThrottle({
  limit: 1,
  interval: 1000,
})

const PLATFORMS = {
  nes: 18,
  snes: 19,
  gb: 33,
  gbc: 22,
  gba: 24,
  pce: 86,
  n64: 4,
  md: 29,
  gg: 35,
  ms: 64,
  psx: 7,
  sega32: 30,
  vb: 87,
  gcn: 32,
  sat: 21,
  neo: 120,
  atari2600: 59,
  panasonic3DO: 50,
  cdi: 117,
  jaguar: 62,
  ngp: 120,
}
const FIELDS = [
  'name',
  'genres.name',
  'alternative_names.name',
  'screenshots.*',
  'cover.*',
  'videos.*',
  'first_release_date',
  'franchise.name',
  'total_rating',
  'total_rating_count',
  'slug',
  'storyline',
  'summary',
  'url',
  'involved_companies.*',
  'collection.*',
  'involved_companies.company.name',
]

const requestGame = throttle(async (game, platform) => {
  try {
    const name = slugify(game)
    const fileName = process.cwd() + `/data/games/${platform}/${name}.json`
    if (true) {
      const client = igdb(
        process.env.TWITCH_ID,
        'z26on5st605ag9gkxgd5jomg7iibfb'
      )
      const response = await client
        .fields(FIELDS)
        .limit(1)
        .where(`release_dates.platform=(${PLATFORMS[platform]})`)
        .search(game)
        .request('/games')

      const data = response.data[0]
      if (data) {
        console.log('Creating new game', name, ' for the ', platform)
        fs.writeFileSync(fileName, JSON.stringify(data))
      } else {
        console.log('No info found for ' + game)
      }
    }
  } catch (e) {
    console.log(e.message)
  }
})

for (let index = 0; index <= jaguarGames.length; index++) {
  ;(async () => {
    await requestGame(jaguarGames[index], 'jaguar')
  })()
}

module.exports = {
  PLATFORMS,
}
