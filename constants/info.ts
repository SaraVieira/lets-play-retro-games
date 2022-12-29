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
    type: "nintendo"
  },
  {
    name: 'Super Nintendo',
    linkRandom: '/snes/random',
    id: "snes",
    linkAll: '/snes/all',
    type: "nintendo"
  },
  {
    name: 'Nintendo 64',
    linkRandom: '/n64/random',
    id: "n64",
    linkAll: '/n64/all',
    type: "nintendo"
  },
  {
    name: 'Game Boy',
    linkRandom: '/gb/random',
    id: "gb",
    linkAll: '/gb/all',
    type: "nintendo handheld"
  },
  {
    name: 'Game Boy Color',
    linkRandom: '/gbc/random',
    id: "gbc",
    linkAll: '/gbc/all',
    type: "nintendo handheld"
  },
  {

    name: 'Game Boy Advance',
    linkRandom: '/gba/random',
    id: "gba",
    linkAll: '/gba/all',
    type: "nintendo handheld"
  },
  {
    name: 'Sega Genesis/Megadrive',
    linkRandom: '/md/random',
    id: "md",
    linkAll: '/md/all',
    type: "sega"
  },
  {
    name: 'Sega Master System',
    linkRandom: '/ms/random',
    id: "ms",
    linkAll: '/ms/all',
    type: "sega"
  },
  {
    name: 'Game Gear',
    id: "gg",
    linkRandom: '/gg/random',
    linkAll: '/gg/all',
    type: "sega"
  },
  {
    name: 'TurboGrafx-16',
    id: "pce",
    linkRandom: '/pce/random',
    linkAll: '/pce/all',
    type: "other"
  },
  {
    name: 'Playstation 1',
    id: "ps1",
    linkRandom: '/ps1/random',
    linkAll: '/ps1/all',
    type: "other"
  },
  {
    name: '32X',
    id: "sega32",
    linkRandom: '/sega32/random',
    linkAll: '/sega32/all',
    type: "sega"
  },
  {
    name: 'Virtual Boy',
    id: "vb",
    linkRandom: '/vb/random',
    linkAll: '/vb/all',
    type: "nintendo"
  },
  {
    name: 'Sega Saturn',
    id: "sat",
    linkRandom: '/sat/random',
    linkAll: '/sat/all',
    type: "sega"
  },
  {
    name: 'GameCube',
    id: "gcn",
    linkRandom: '/gcn/random',
    linkAll: '/gcn/all',
    type: "nintendo"
  },
  {
    name: 'Neo Geo',
    id: "neo",
    linkRandom: '/neo/random',
    linkAll: '/neo/all',
    type: "other"
  },
  {
    name: 'Neo Geo Pocket',
    id: "ngp",
    linkRandom: '/ngp/random',
    linkAll: '/ngp/all',
    type: "other"
  },
  {
    name: 'Atari 2600',
    id: "atari2600",
    linkRandom: '/atari2600/random',
    linkAll: '/atari2600/all',
    type: "atari"
  },
  {
    name: 'Panasonic 3DO',
    id: "panasonic3DO",
    linkRandom: '/panasonic3DO/random',
    linkAll: '/panasonic3DO/all',
    type: "other"
  },
  {
    name: 'Philips CD-I',
    id: "cdi",
    linkRandom: '/cdi/random',
    linkAll: '/cdi/all',
    type: "other"
  },
  {
    name: 'Neo Geo Pocket',
    id: "ngp",
    linkRandom: '/ngp/random',
    linkAll: '/ngp/all',
    type: "other"
  },
  {
    name: 'Atari Jaguar',
    id: "jaguar",
    linkRandom: '/jaguar/random',
    linkAll: '/jaguar/all',
    type: "atari"
  },
]

export const menuMain = [
  {
    name: "Nintendo",
    items: consolesMenu.filter(({ type }) => type == "nintendo")
  },
  {
    name: "Nintendo handheld",
    items: consolesMenu.filter(({ type }) => type == "nintendo handheld")
  },
  {
    name: "Sega",
    items: consolesMenu.filter(({ type }) => type == "sega")
  },
  {
    name: "Atari",
    items: consolesMenu.filter(({ type }) => type == "atari")
  }
]

export const otherInMenu = consolesMenu.filter(({ type }) => type == "other")

export const ORDERS = {
  'name-asc': 'Name',
  'total_rating-desc': 'Rating (desc)',
  'total_rating-asc': 'Rating (asc)',
  'first_release_date-asc': 'Date (asc)',
  'first_release_date-desc': 'Date (desc)',
}