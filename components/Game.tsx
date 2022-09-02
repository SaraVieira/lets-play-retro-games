import { StarIcon } from '@heroicons/react/solid'

import { useState } from "react"
import { Images } from "./Images"
import { Info } from "./Info"
import { Game } from '../constants/types'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export const GamePage = ({ game }: { game: Game }) => {

    const [opened, setOpened] = useState(0)

    return <div className="pt-6 pb-16 sm:pb-24">
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
            <div className="tui-overlap active z-10 !fixed w-screen h-screen" onClick={() => setOpened(0)}></div>
            <div id="modal" className="tui-modal active !fixed" style={{
                transform: "translateX(-50%) translateY(-50%)",
                top: "50%",
                left: "50%",
                right: "auto"
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
} 