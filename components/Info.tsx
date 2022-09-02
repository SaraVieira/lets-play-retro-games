import {
  ClockIcon,
  DocumentDuplicateIcon,
  GlobeIcon,
  TagIcon,
  TerminalIcon,
} from '@heroicons/react/outline'
import 'tippy.js/dist/tippy.css' // optional

import Tippy from '@tippyjs/react'
import { useMemo } from 'react'
import { Game } from '../constants/types'



export const Info = ({ game }: { game: Game }) => {
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
            {new Date(game.first_release_date * 1000).toLocaleString('PT-pt', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            })}
          </li>
          {game.genres.length ? (
            <li className="flex gap-1 align-center">
              <Tippy content="Genres">
                <TagIcon width="16" />
              </Tippy>
              {game.genres.map((genre) => genre.name).join(', ')}
            </li>
          ) : null}
          {game.franchise.name && (
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
  )
}