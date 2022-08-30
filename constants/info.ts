
export const PLATFORMS = {
  nes: 18,
  snes: 19,
  gb: 33,
  gbc: 22,
  gba: 24,
  // sf: 58,
  n64: 4,
  // md: 29,
};
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
    img: '/nes.png',
    alt: 'NES',
    name: 'NES',
    link: '/nes/random',
  },
  {
    img: '/snes.png',
    alt: 'SNES',
    name: 'Super Nintendo',
    link: '/snes/random',
  },
  {
    img: '/gb.png',
    alt: 'Game Boy',
    name: 'Game Boy',
    link: '/gb/random',
  },
  {
    img: '/gbc.png',
    alt: 'Game Boy Color',
    name: 'Game Boy Color',
    link: '/gba/random',
  },
  {
    img: '/gba.png',
    alt: 'Game Boy Advance',
    name: 'Game Boy Advance',
    link: '/gba/random',
  },
]