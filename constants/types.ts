export type Game = {
  id: number
  alternative_names: { id: number; name: string }[]
  cover: {
    id: number
    alpha_channel: boolean
    animated: boolean
    game: number
    height: number
    image_id: string
    url: string
    width: number
    checksum: string
  }
  first_release_date: number
  franchise: {
    name: string
  }
  genres: { id: number; name: string }[]
  involved_companies: [
    {
      id: number
      company: { id: number; name: string }
      created_at: number
      developer: boolean
      game: number
      porting: boolean
      publisher: boolean
      supporting: boolean
      updated_at: number
      checksum: string
    }
  ]
  name: string
  screenshots: [
    {
      id: number
      game: number
      height: number
      image_id: string
      url: string
      width: number
      checksum: string
    }
  ]
  videos: {
    id: number
    game: number
    name: string
    video_id: string
    checksum: string
  }[]
  slug: string
  summary: string
  storyline?: string
  total_rating?: number
  total_rating_count?: number
  url: string
}
