import { StarIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import { Game } from '../constants/types'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const useFreshRating = ({ console, id }: { console: string; id: string }) => {
  const [data, setData] = useState<{
    totalRating?: number
    ratingCount?: number
  }>({})
  const getData = async () => {
    const { total_rating_count, total_rating } = await fetch(
      `/api/${console}/${id}/rating`
    ).then((rsp) => rsp.json())

    setData({
      totalRating: total_rating,
      ratingCount: total_rating_count,
    })
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [console, id])

  return data
}

export const Rating = ({ url, console: platform, igdb_id }: Game) => {
  const { ratingCount, totalRating } = useFreshRating({
    console: platform,
    id: igdb_id,
  })
  if (!totalRating || !ratingCount) return <div className="mt-4 h-[25px]" />
  const moreThanOneRating = ratingCount > 1
  const ratingText = `See ${moreThanOneRating ? 'all' : null} 
  ${ratingCount} rating${moreThanOneRating ? 's' : null}`

  return (
    <div className="mt-4 h-[25px]">
      <h2 className="sr-only">Reviews</h2>
      <div className="flex items-center">
        <p className="text-sm text-gray-700">
          {((totalRating / 100) * 5).toFixed(1)}
          <span className="sr-only"> out of 5 stars</span>
        </p>
        <div className="ml-1 flex items-center">
          {[0, 1, 2, 3, 4].map((rating) => (
            <StarIcon
              key={rating}
              className={classNames(
                totalRating && Math.round((totalRating / 100) * 5) > rating
                  ? 'text-yellow-400'
                  : 'text-gray-100',
                'h-5 w-5 flex-shrink-0'
              )}
              aria-hidden="true"
            />
          ))}
        </div>
        <div aria-hidden="true" className="ml-4 text-sm text-gray-300">
          ·
        </div>
        {ratingCount ? (
          <div className="ml-4 flex">
            <a
              href={url}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              {ratingText}
            </a>
          </div>
        ) : null}
      </div>
    </div>
  )
}
