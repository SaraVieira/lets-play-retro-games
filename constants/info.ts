export const PLATFORMS = {
  nes: 18,
  snes: 19,
  gb: 33,
  gbc: 22,
  gba: 24,
  n64: 4,
  md: 29,
  gg: 35,
  ms: 64,
  pce: 86,
}
export const FIELDS = [
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

export const consolesMenu = [
  {
    name: 'NES',
    linkRandom: '/nes/random',
    id: "nes",
    linkAll: '/nes/all',
  },
  {
    name: 'Super Nintendo',
    linkRandom: '/snes/random',
    id: "snes",
    linkAll: '/snes/all',
  },
  {
    name: 'Nintendo 64',
    linkRandom: '/n64/random',
    id: "n64",
    linkAll: '/n64/all',
  },
  {
    name: 'Game Boy',
    linkRandom: '/gb/random',
    id: "gb",
    linkAll: '/gb/all',
  },
  {
    name: 'Game Boy Color',
    linkRandom: '/gbc/random',
    id: "gbc",
    linkAll: '/gbc/all',
  },
  {

    name: 'Game Boy Advance',
    linkRandom: '/gba/random',
    id: "gba",
    linkAll: '/gba/all',
  },
  {
    name: 'Sega Genesis/Megadrive',
    linkRandom: '/md/random',
    id: "md",
    linkAll: '/md/all',
  },
  {
    name: 'Sega Master System',
    linkRandom: '/ms/random',
    id: "ms",
    linkAll: '/ms/all',
  },
  {
    name: 'Game Gear',
    id: "gg",
    linkRandom: '/gg/random',
    linkAll: '/gg/all',
  },
  {
    name: 'TurboGrafx-16',
    id: "pce",
    linkRandom: '/pce/random',
    linkAll: '/pce/all',
  },
  {
    name: 'Playstation 1',
    id: "ps1",
    linkRandom: '/ps1/random',
    linkAll: '/ps1/all',
  },
]

export const menuMain = [
  {
    name: "Nintendo",
    items: [
      consolesMenu[0],
      consolesMenu[1],
      consolesMenu[2],
      consolesMenu[3],
      consolesMenu[4],
      consolesMenu[5],
    ]
  },
  {
    name: "Sega",
    items: [
      consolesMenu[6],
      consolesMenu[7],
      consolesMenu[8],
    ]
  }
]

export const otherInMenu = [
  consolesMenu[9],
  consolesMenu[10],
]

export const ORDERS = {
  'name-asc': 'Name',
  'total_rating-desc': 'Rating (desc)',
  'total_rating-asc': 'Rating (asc)',
  'first_release_date-asc': 'Date (asc)',
  'first_release_date-desc': 'Date (desc)',
}