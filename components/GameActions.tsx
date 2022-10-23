import { Game, User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

type ReturnUser = User & {
  finished: Game[]
  playing: Game[]
  favorite: Game[]
}

const types = ['finished', 'playing', 'favorite']

export const GameActions = ({
  id,
  userInfo,
  console: activeConsole,
}: {
  id: number
  userInfo: any
  console: string
}) => {
  const { data: session } = useSession()
  const [userGames, setUserGames] = useState<ReturnUser>(userInfo)
  const markAs = async (type: string, isMarked: boolean) => {
    const newUser = await fetch(`/api/${activeConsole}/${id}/mark`, {
      method: 'POST',
      // @ts-ignore
      body: JSON.stringify({ key: type, id: session?.user.id, isMarked }),
    }).then((rsp) => rsp.json())

    setUserGames(newUser)
  }

  return (
    <div className="flex mt-4 justify-end mx-6">
      {types.map((type) => {
        // @ts-ignore
        const isMarked = userGames[type]
          .map((a: ReturnUser) => a.id)
          .includes(id)
        return (
          <button
            key={type}
            className={`tui-button capitalize ${!isMarked ? 'cyan-168' : ''}`}
            onClick={() => markAs(type, isMarked)}
          >
            {type}
          </button>
        )
      })}
    </div>
  )
}
