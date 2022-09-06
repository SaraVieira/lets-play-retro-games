const fs = require('fs')
const { PLATFORMS } = require('./scrape')

Object.keys(PLATFORMS).forEach(function (platform) {
  const data = []

  const theDirectory = process.cwd() + `/data/games/${platform}`
  fs.readdirSync(theDirectory).forEach((file) => {
    if (file === 'all.json' || file === '.DS_Store') return
    console.log(file)
    const a = fs.readFileSync(theDirectory + '/' + file)
    data.push(JSON.parse(a))
  })
  fs.writeFileSync(
    theDirectory + '/' + 'all.json',
    JSON.stringify(data, null, 2)
  )
})
