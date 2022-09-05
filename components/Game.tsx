import { useState } from 'react'
import { Images } from './Images'
import { Info } from './Info'
import { Game } from '../constants/types'
import { Modal } from './Modal'
import { Rating } from './Rating'

export const GamePage = ({ game }: { game: Game }) => {
  const [opened, setOpened] = useState(0)

  return (
    <div className="pt-6 pb-16 sm:pb-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
          <div className="lg:col-start-7 lg:col-span-6">
            <h1 className="text-xl font-medium text-gray-900">{game.name}</h1>
            {game.alternative_names?.length ? (
              <h6 className="text-xs text-gray-500">
                {game.alternative_names[0].name}
              </h6>
            ) : null}

            {game.total_rating ? (
              <Rating
                ratingCount={game.total_rating_count as number}
                totalRating={game.total_rating}
                url={game.url}
              />
            ) : null}
          </div>

          <Images setOpened={setOpened} game={game} />
          {!game.videos?.length ? null : (
            <div className="mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-4 lg:row-span-3">
              <h2 className="font-medium text-gray-900 my-6">Video</h2>
              {game.videos.map((video) => (
                <iframe
                  key={video.id}
                  width="560"
                  height="315"
                  src={`https://www.youtube-nocookie.com/embed/${video.video_id}`}
                  title={game.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="mt-4"
                ></iframe>
              ))}
            </div>
          )}
          <div className="mt-8 lg:col-span-5">
            <div className="mt-10 lg:mt-0">
              <h2 className="text-sm font-medium text-gray-900">Description</h2>

              <div
                className="mt-4 prose prose-sm text-gray-500"
                dangerouslySetInnerHTML={{
                  __html: game.summary,
                }}
              />
            </div>

            {game.storyline && (
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Storyline</h2>

                <div
                  className="mt-4 prose prose-sm text-gray-500"
                  dangerouslySetInnerHTML={{
                    __html: game.storyline,
                  }}
                />
              </div>
            )}

            <Info game={game} />
          </div>
        </div>
      </div>

      <Modal game={game} opened={opened} setOpened={setOpened} />
    </div>
  )
}
