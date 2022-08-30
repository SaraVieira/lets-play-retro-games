require("dotenv").config();
var slugify = require("slugify");
const nesGames = require("./constants/consoles/nes.json");
const snesGames = require("./constants/consoles/snes.json");
const gbGames = require("./constants/consoles/gb.json");
const gbcGames = require("./constants/consoles/gbc.json");
const gbaGames = require("./constants/consoles/gba.json");
const n64Games = require("./constants/consoles/n64.json");
const igdb = require("igdb-api-node").default;
const fs = require("fs");
const { FIELDS, PLATFORMS } = require("./constants/info");
const pThrottle = require("p-throttle");
const throttle = pThrottle({
  limit: 1,
  interval: 1000,
});

const requestGame = throttle(async (game, platform) => {
  try {
    const name = slugify(game);
    const fileName = process.cwd() + `/games/${platform}/${name}.json`;
    if (!fs.existsSync(fileName)) {
      const client = igdb(
        process.env.TWITCH_ID,
        "gaxgfy0tu1lpdi2wiv36x07025esqh"
      );
      const response = await client
        .fields(FIELDS)
        .limit(1)
        .where(`release_dates.platform=(${PLATFORMS[platform]})`)
        .search(game)
        .request("/games");

      const data = response.data[0];
      if (data) {
        console.log("Creating new game", name);
        fs.writeFileSync(fileName, JSON.stringify(data));
      } else {
        console.log("NO info found for " + game);
      }
    }
  } catch (e) {
    console.log(e.message);
  }
});

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

for (let index = 0; index <= n64Games.length; index++) {
  (async () => {
    await requestGame(n64Games[index], "n64");
  })();
}
