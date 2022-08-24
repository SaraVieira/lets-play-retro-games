import Image from 'next/image'
import { Game } from '../constants/types'

const makeImage = (url: string, size = 't_1080p') =>
  'https://' + url.replace('t_thumb', size)

export const Images = ({
  game,
  setOpened,
}: {
  game: Game
  setOpened: (a: number) => void
}) => {
  return (
    <div className="mt-8 lg:mt-0 lg:col-start-1 lg:col-span-6 lg:row-start-1 lg:row-span-3">
      <h2 className="sr-only">Images</h2>

      <div className="grid grid-cols-1">
        {game.cover && (
          <img
            src={makeImage(game.cover?.url)}
            alt={game.name}
            className="rounded-lg"
            width={game.cover.width}
            height={game.cover.height}
          />
        )}
        <div className="grid grid-cols-2 mt-6 gap-4">
          {game.screenshots?.length &&
            game.screenshots.map((image) => (
              <button
                className="thumb-wrapper"
                onClick={() => setOpened(image.id)}
                key={image.id}
              >
                <Image
                  src={makeImage(image?.url, 't_720p')}
                  alt={game.name}
                  width={image.width}
                  height={image.height}
                />
              </button>
            ))}
        </div>
      </div>
    </div>
  )
}