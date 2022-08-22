import data from '../constants/games.json'
import igdb from 'igdb-api-node'
import { FIELDS, PLATFORMS } from '../constants/info'
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
import { useMemo } from 'react'

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
    <div className="bg-white">
      <div className="pt-6 pb-16 sm:pb-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
            <div className="lg:col-start-8 lg:col-span-5">
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
            <div className="mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3">
              <h2 className="sr-only">Images</h2>

              <div className="grid grid-cols-1">
                <Image
                  src={`https://${game.cover?.url.replace(
                    't_thumb',
                    't_1080p'
                  )}`}
                  alt={game.name}
                  className="rounded-lg"
                  width={game.cover.width}
                  height={game.cover.height}
                />
                <div className="grid grid-cols-2 mt-6 gap-2">
                  {game.screenshots?.length &&
                    game.screenshots.map((image) => (
                      <Image
                        key={image.id}
                        src={`https://${image?.url.replace(
                          't_thumb',
                          't_720p'
                        )}`}
                        alt={game.name}
                        className="rounded-lg"
                        width={image.width}
                        height={image.height}
                      />
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
                    <li className="flex gap-1 align-center">
                      <Tippy content="Genres">
                        <TagIcon width="16" />
                      </Tippy>
                      {game.genres.map((genre) => genre.name).join(', ')}
                    </li>
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
      </div>
    </div>
  )
}

const requestGame = async (name: string) => {
  const client = igdb(
    'yyq5emyqr6k1c5bvuk031liwag8p9h',
    'rizwvhm67jikaqwrkvw0pd4ep5urel'
  )
  const response = await client
    .fields(FIELDS)
    .limit(1)
    .where('release_dates.platform = ' + PLATFORMS.NES)
    .search(name)
    .request('/games')

  return response.data[0]
}

export async function getServerSideProps(context) {
  let response = await requestGame(
    data[Math.floor(Math.random() * data.length)]
  )
  while (!response) {
    response = await requestGame(data[Math.floor(Math.random() * data.length)])
  }
  console.log(response)

  return {
    props: {
      game: response,
    },
  }
}