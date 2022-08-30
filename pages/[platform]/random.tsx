import data from '../../constants/games'
import igdb from 'igdb-api-node'
import { FIELDS, PLATFORMS } from '../../constants/info'
import { StarIcon } from '@heroicons/react/solid'
import 'tippy.js/dist/tippy.css' // optional
import { useState } from 'react'
import { GetServerSidePropsContext } from 'next'
import { Game } from '../../constants/types'
import { Info } from '../../components/Info'
import { Images } from '../../components/Images'
import { prisma } from '../../prisma/prisma'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}


export default function Example({ game }: { game: Game }) {
  const [opened, setOpened] = useState(0)

  return (
    <div className="pt-6 pb-16 sm:pb-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
          <div className="lg:col-start-7 lg:col-span-6">
            <h1 className="text-xl font-medium text-gray-900">{game.name}</h1>
            {game.alternative_names.length && (
              <h6 className="text-xs text-gray-500">
                {game.alternative_names[0].name}
              </h6>
            )}

            {game.total_rating ? (
              <div className="mt-4">
                <h2 className="sr-only">Reviews</h2>
                <div className="flex items-center">
                  <p className="text-sm text-gray-700">
                    {((game.total_rating / 100) * 5).toFixed(1)}
                    <span className="sr-only"> out of 5 stars</span>
                  </p>
                  <div className="ml-1 flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          game.total_rating &&
                            Math.round((game.total_rating / 100) * 5) > rating
                            ? 'text-yellow-400'
                            : 'text-gray-200',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <div
                    aria-hidden="true"
                    className="ml-4 text-sm text-gray-300"
                  >
                    ·
                  </div>
                  <div className="ml-4 flex">
                    <a
                      href={`${game.url}`}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      See all {game.total_rating_count} ratings
                    </a>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <Images setOpened={setOpened} game={game} />
          {!game.videos?.length ? null : (
            <div className="mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-4 lg:row-span-3">
              <h2 className="font-medium text-gray-900 mb-6">Video</h2>
              {game.videos.map((video) => (
                <iframe
                  key={video.id}
                  width="560"
                  height="315"
                  src={`https://www.youtube-nocookie.com/embed/${video.video_id}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className='mt-4'
                ></iframe>
              ))}
            </div>
          )}
          <div className="mt-8 lg:col-span-5">
            <div className="mt-10 lg:mt-0">
              <h2 className="text-sm font-medium text-gray-900">
                Description
              </h2>

              <div
                className="mt-4 prose prose-sm text-gray-500"
                dangerouslySetInnerHTML={{
                  __html: game.summary,
                }}
              />
            </div>

            {game.storyline && (
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">
                  Storyline
                </h2>

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
      {opened ? <>
        <div className="tui-overlap active z-10"></div>
        <div id="modal" className="tui-modal active !fixed" style={{
          transform: "translateX(-50%) translateY(-50%)",
          top: "50%",
          left: "50%"
        }}>
          <div className="tui-window red-168 left-align">
            <fieldset className="tui-fieldset">
              <legend className="red-255 yellow-255-text">Screenshot</legend>
              <img src={game.screenshots.find((s) => s.id === opened)?.url.replace(
                't_thumb',
                't_720p'
              )} alt={game.name}
                width={game.screenshots.find((s) => s.id === opened)?.width}
                height={game.screenshots.find((s) => s.id === opened)?.height} />
              <button className=" mt-4 tui-button cyan-168 white-255-text tui-modal-close-button right" onClick={() => setOpened(0)}>close</button>
            </fieldset>
          </div>
        </div>
      </> : null}
    </div>
  )
}

const requestGame = async (name: string, platform: keyof typeof PLATFORMS) => {
  const { access_token } = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_ID}&client_secret=${process.env.TWITCH_SECRET}&grant_type=client_credentials`, { method: "POST" }).then(rsp => rsp.json())
  const client = igdb(
    process.env.TWITCH_ID,
    access_token
  )
  const response = await client
    .fields(FIELDS)
    .limit(1)
    .where('release_dates.platform = ' + PLATFORMS[platform])
    .search(name)
    .request('/games')

  return response.data[0]
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { platform } = context.query as { platform: keyof typeof PLATFORMS };

  const result = await prisma.$queryRaw`
    Select * from "Game"
    WHERE console = ${platform}::"CONSOLES" 
    ORDER BY RANDOM ()
    limit 1;`

  return {
    props: {
      game: result[0]
    }
  }
}