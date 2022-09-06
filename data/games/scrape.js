require('dotenv').config()
var slugify = require('slugify')
const msGames = require('../../constants/consoles/ms.json')
const igdb = require('igdb-api-node').default
const fs = require('fs')
const pThrottle = require('p-throttle')
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
  // sf: 58,
  n64: 4,
  md: 29,
  gg: 35,
  ms: 64,
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
  'involved_companies.company.name',
]

const requestGame = throttle(async (game, platform) => {
  try {
    const name = slugify(game)
    const fileName = process.cwd() + `/data/games/${platform}/${name}.json`
    if (!fs.existsSync(fileName)) {
      const client = igdb(
        process.env.TWITCH_ID,
        'vg9jx9sxjk0msuz90tdpj2ti8sa7f4'
      )
      const response = await client
        .fields(FIELDS)
        .limit(1)
        .where(`release_dates.platform=(${PLATFORMS[platform]})`)
        .search(game)
        .request('/games')

      const data = response.data[0]
      if (data) {
        console.log('Creating new game', name)
        fs.writeFileSync(fileName, JSON.stringify(data))
      } else {
        console.log('NO info found for ' + game)
      }
    }
  } catch (e) {
    console.log(e.message)
  }
})

// for (let index = 0; index <= nesGames.length; index++) {
//   (async () => {
//     await requestGame(nesGames[index], "nes");
//   })();
// }

// for (let index = 0; index <= snesGames.length; index++) {
//   (async () => {
//     await requestGame(snesGames[index], "snes");
//   })();
// }

// for (let index = 0; index <= gbGames.length; index++) {
//   (async () => {
//     await requestGame(gbGames[index], "gb");
//   })();
// }

// for (let index = 0; index <= gbcGames.length; index++) {
//   (async () => {
//     await requestGame(gbcGames[index], "gbc");
//   })();
// }

// for (let index = 0; index <= gbaGames.length; index++) {
//   (async () => {
//     await requestGame(gbaGames[index], "gba");
//   })();
// }

for (let index = 0; index <= msGames.length; index++) {
  ;(async () => {
    await requestGame(msGames[index], 'ms')
  })()
}

module.exports = {
  PLATFORMS,
}
