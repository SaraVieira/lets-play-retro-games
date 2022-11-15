import { CONSOLES, Game, Prisma } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'


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

type Data = {
    id: number
    first_release_date: number | null
    total_rating: number | null
    name: string
    slug: string
}[]



const handler = async (req: NextApiRequest, res: NextApiResponse<Game>) => {
    const { access_token } = await fetch(
        `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_ID}&client_secret=${process.env.TWITCH_SECRET}&grant_type=client_credentials`, { method: "POST" }
    ).then(rsp => rsp.json())
    const game = await fetch("https://api.igdb.com/v4/games", {
        method: "POST",
        body: `fields ${FIELDS};
        where id = ${req.query.id};`,
        // @ts-ignore
        headers: {
            "Client-ID": process.env.TWITCH_ID,
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'text/plain'
        }
    }).then(rsp => rsp.json())
    res.status(200).json(game[0])
}

export default handler
