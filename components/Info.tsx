import 'tippy.js/dist/tippy.css' // optional

import Tippy from '@tippyjs/react'
import { Fragment, useMemo } from 'react'
import { Game } from '../constants/types'
import { consolesMenu } from '../constants/info'
import Link from 'next/link'

export const Info = ({ game }: { game: Game }) => {
  console.log(game)
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
    <div className="mt-8 border-t border-gray-200 pt-8">
      <h2 className="text-sm font-medium text-gray-900">Game Info</h2>

      <div className="mt-4 prose prose-sm text-gray-500">
        <ul role="list">
          {dev && (
            <li className="flex gap-1 align-center">
              <Tippy content="Developed by">
                <span className="w-4 text-gray-900">&#9787;</span>
              </Tippy>
              {dev}
            </li>
          )}
          {publisher && (
            <li className="flex gap-1 align-center">
              <Tippy content="Published by">
                <span className="w-4 text-gray-900">&#9788;</span>
              </Tippy>
              {publisher}
            </li>
          )}
          <li className="flex gap-1 align-center">
            <Tippy content="Console">
              <span className="w-4 text-gray-900">&#8227;</span>
            </Tippy>
            <Link
              href={`/${game.console}/all`}
              className="underline text-blue-500"
            >
              {consolesMenu.find(({ id }) => id === game.console)?.name}
            </Link>
          </li>

          <li className="flex gap-1 align-center">
            <Tippy content="Released In">
              <span className="w-4 text-gray-900">&#9719;</span>
            </Tippy>
            {new Date(game.first_release_date * 1000).toLocaleString('PT-pt', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            })}
          </li>
          {game.genres.length ? (
            <li className="flex gap-1 align-center">
              <Tippy content="Genres">
                <span className="w-4 text-gray-900">&#8267;</span>
              </Tippy>
              <div>
                {game.genres.map(({ slug, name }, i) => (
                  <Fragment key={slug}>
                    <Link
                      href={`/${game.console}/genre/${slug}`}
                      className="underline text-blue-500 inline"
                    >
                      {name}
                    </Link>
                    {i !== game.genres.length - 1 && ', '}
                  </Fragment>
                ))}
              </div>
            </li>
          ) : null}

          {game.collections?.length ? (
            <li className="flex gap-1 align-center">
              <Tippy content="Franchise">
                <span className="w-4 text-gray-900">&#8284;</span>
              </Tippy>

              {game.collections
                .map((collection) => ({
                  name: collection.name,
                  slug: collection.slug,
                }))
                .map(({ name, slug }) => (
                  <Link
                    key={slug}
                    href={`/franchises/${slug}`}
                    className="underline text-blue-500"
                  >
                    {name}
                  </Link>
                ))}
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  )
}
