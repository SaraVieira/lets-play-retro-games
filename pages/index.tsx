import Link from 'next/link'
import { consolesMenu } from '../constants/info'

export default function Example() {
  return (
    <div className="flex items-center justify-center min-h-full flex-col">
      <h1 className="text-2xl font-bold">Let{"'"}s play some retro games</h1>
      <h2 className=" mb-8 w-[330px] text-center mt-2">
        {' '}
        Select a console and I will give you a random game to play
      </h2>

      <div className="tui-window">
        <fieldset className="tui-fieldset tui-border-double">
          <legend>Choose a console to start</legend>

          {consolesMenu.map((link) => (
            <button className="tui-button block mb-4 w-full" key={link.alt}>
              <Link href={link.link} passHref>
                <a>{link.name}</a>
              </Link>
            </button>
          ))}
        </fieldset>
      </div>
    </div>
  )
}