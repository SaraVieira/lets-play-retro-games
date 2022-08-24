import data from '../../constants/games'
import igdb from 'igdb-api-node'
import { FIELDS, PLATFORMS } from '../../constants/info'
import {
  GlobeIcon,
  ClockIcon,
  TerminalIcon,
  TagIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/outline'
import { StarIcon } from '@heroicons/react/solid'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css' // optional
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { GetServerSidePropsContext } from 'next'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

type Game = {
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

export default function Example({ game }: { game: Game }) {
  const [opened, setOpened] = useState(0)
  const dev = useMemo(
    () =>
      game.involved_companies?.length
        ? game.involved_companies.find((a) => a.developer)?.company?.name
        : '',
    [game.involved_companies]
  )
  const publisher = useMemo(
    () =>
      game.involved_companies?.length
        ? game.involved_companies.find((a) => a.publisher)?.company?.name
        : '',
    [game.involved_companies]
  )
  return (
    <div className="pt-6 pb-16 sm:pb-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
          <div className="lg:col-start-7 lg:col-span-6">
            <h1 className="text-xl font-medium text-gray-900">{game.name}</h1>
            {game.alternative_names && (
              <h6 className="text-xs text-gray-500">
                {game.alternative_names[0].name}
              </h6>
            )}

            {game.total_rating && (
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
            )}
          </div>

          {/* Image gallery */}
          <div className="mt-8 lg:mt-0 lg:col-start-1 lg:col-span-6 lg:row-start-1 lg:row-span-3">
            <h2 className="sr-only">Images</h2>

            <div className="grid grid-cols-1">
              {game.cover &&
                <img
                  src={`https://${game.cover?.url.replace(
                    't_thumb',
                    't_1080p'
                  )}`}
                  alt={game.name}
                  className="rounded-lg"
                  width={game.cover.width}
                  height={game.cover.height}
                />}
              <div className="grid grid-cols-2 mt-6 gap-4">
                {game.screenshots?.length &&
                  game.screenshots.map((image) => (
                    <button onClick={() => setOpened(image.id)} className="tui-shadow" key={image.id}>
                      <Image
                        src={`https://${image?.url.replace(
                          't_thumb',
                          't_720p'
                        )}`}
                        alt={game.name}
                        className="w-full block"
                        width={image.width}
                        height={image.height}
                      />
                    </button>
                  ))}
              </div>
            </div>
          </div>
          {game.videos?.length && (
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

            <div className="mt-8 border-t border-gray-200 pt-8">
              <h2 className="text-sm font-medium text-gray-900">Game Info</h2>

              <div className="mt-4 prose prose-sm text-gray-500">
                <ul role="list">
                  {dev && (
                    <li className="flex gap-1 align-center">
                      <Tippy content="Developed by">
                        <TerminalIcon width="16" />
                      </Tippy>
                      {dev}
                    </li>
                  )}
                  {publisher && (
                    <li className="flex gap-1 align-center">
                      <Tippy content="Published by">
                        <GlobeIcon width="16" />
                      </Tippy>
                      {publisher}
                    </li>
                  )}
                  <li className="flex gap-1 align-center">
                    <Tippy content="Released In">
                      <ClockIcon width="16" />
                    </Tippy>
                    {new Date(game.first_release_date * 1000).toLocaleString(
                      'PT-pt',
                      {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                      }
                    )}
                  </li>
                  {game.genres && <li className="flex gap-1 align-center">
                    <Tippy content="Genres">
                      <TagIcon width="16" />
                    </Tippy>
                    {game.genres.map((genre) => genre.name).join(', ')}
                  </li>}
                  {game.franchise && (
                    <li className="flex gap-1 align-center">
                      <Tippy content="Franchise">
                        <DocumentDuplicateIcon width="16" />
                      </Tippy>
                      {game.franchise.name}
                    </li>
                  )}
                </ul>
              </div>
            </div>
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
  const currentData = data[platform]
  try {
    let response = await requestGame(
      currentData[Math.floor(Math.random() * currentData.length)],
      platform
    )
    while (!response) {
      response = await requestGame(currentData[Math.floor(Math.random() * currentData.length)], platform)
    }

    return {
      props: {
        game: response,
      },
    }
  } catch (e) {
    console.log(e)
  }
}