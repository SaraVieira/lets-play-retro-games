export const PLATFORMS = {
  nes: 18,
  snes: 19,
  gb: 33,
  gbc: 22,
  gba: 24,
  n64: 4,
  md: 29,
  gg: 35,
  ms: 64
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
    linkAll: '/nes/all',
  },
  {
    name: 'Super Nintendo',
    linkRandom: '/snes/random',
    linkAll: '/snes/all',
  },
  {
    name: 'Game Boy',
    linkRandom: '/gb/random',
    linkAll: '/gb/all',
  },
  {
    name: 'Game Boy Color',
    linkRandom: '/gbc/random',
    linkAll: '/gbc/all',
  },
  {

    name: 'Game Boy Advance',
    linkRandom: '/gba/random',
    linkAll: '/gba/all',
  },
  {
    name: 'Sega Genesis/Megadrive',
    linkRandom: '/md/random',
    linkAll: '/md/all',
  },
  {
    name: 'Sega Master System',
    linkRandom: '/ms/random',
    linkAll: '/ms/all',
  },
  {
    name: 'Game Gear',
    linkRandom: '/gg/random',
    linkAll: '/gg/all',
  },
]

export const ORDERS = {
  'name-asc': 'Name',
  'total_rating-desc': 'Rating (desc)',
  'total_rating-asc': 'Rating (asc)',
  'first_release_date-asc': 'Date (asc)',
  'first_release_date-desc': 'Date (desc)',
}