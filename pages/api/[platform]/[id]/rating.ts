import { CONSOLES, Game, Prisma } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    id: number
    first_release_date: number | null
    total_rating: number | null
    name: string
    slug: string
}[]

enum OrderBy {
    total_rating = 'total_rating',
    name = 'name',
    first_release_date = 'first_release_date',
}


const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { access_token } = await fetch(
        `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_ID}&client_secret=${process.env.TWITCH_SECRET}&grant_type=client_credentials`, { method: "POST" }
    ).then(rsp => rsp.json())
console.log(access_token)
    const rating = await fetch("https://api.igdb.com/v4/games", {
        method: "POST",
        body: `fields total_rating_count,total_rating;
        where id = ${req.query.id};`,
        // @ts-ignore
        headers: {
            "Client-ID": process.env.TWITCH_ID,
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'text/plain'
        }
    }).then(rsp => rsp.json())
    res.status(200).json(rating[0])
}

export default handler
