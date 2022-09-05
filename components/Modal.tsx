import { useEffect } from 'react'
import { Game } from '../constants/types'

export const Modal = ({
  game,
  opened,
  setOpened,
}: {
  game: Game
  opened: number
  setOpened: (a: number) => void
}) => {
  const closeModal = () => setOpened(0)
  const currentScreenShot = game.screenshots.find((s) => s.id === opened)

  useEffect(() => {
    document.addEventListener('keydown', closeModal, false)

    return () => {
      document.removeEventListener('keydown', closeModal, false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!opened) return null

  return (
    <>
      <div
        className="tui-overlap active z-10 !fixed w-screen h-screen"
        onClick={closeModal}
      />
      <div
        id="modal"
        className="tui-modal active !fixed"
        style={{
          transform: 'translateX(-50%) translateY(-50%)',
          top: '50%',
          left: '50%',
          right: 'auto',
        }}
      >
        <div className="tui-window red-168 left-align">
          <fieldset className="tui-fieldset">
            <legend className="red-255 yellow-255-text">Screenshot</legend>
            <img
              src={currentScreenShot?.url.replace('t_thumb', 't_720p')}
              alt={game.name}
              width={currentScreenShot?.width}
              height={currentScreenShot?.height}
            />
            <button
              className=" mt-4 tui-button cyan-168 white-255-text tui-modal-close-button right"
              onClick={closeModal}
            >
              close
            </button>
          </fieldset>
        </div>
      </div>
    </>
  )
}
