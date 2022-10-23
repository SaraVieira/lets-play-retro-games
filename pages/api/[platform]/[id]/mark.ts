
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../prisma/prisma'

const keys = ["finished",
    "playing",
    "favorite"]

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { key, id, isMarked } = JSON.parse(req.body);
    const keysToRemove = keys.filter(k => k !== key)

    const k = keysToRemove.map(k => ({
        [k]: {
            disconnect: {
                id: parseInt(req.query.id as string)
            }
        }
    }))


    const newUser = await prisma.user.update({
        include: {
            favorite: true,
            finished: true,
            playing: true,
        },
        where: {
            id,
        },
        data: {
            ...k[0],
            ...k[1],
            [key]: {
                [isMarked ? "disconnect" : "connect"]: {
                    id: parseInt(req.query.id as string),
                }
            }
        }
    })
    res.status(200).json(newUser)
}

export default handler
