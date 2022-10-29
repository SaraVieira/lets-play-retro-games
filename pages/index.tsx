import Link from 'next/link'
import { menuMain, otherInMenu } from '../constants/info'

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-full flex-col mt-5 sm:mt-0">
      <h1 className="text-2xl font-bold text-center">
        Let{"'"}s play some retro games
      </h1>
      <h2 className="mb-8 sm:w-[330px]  mt-2 text-center max-w-[90%]">
        Select a console and I will give you a random game to play
      </h2>

      <div className="tui-window">
        <fieldset className="tui-fieldset tui-border-double sm:grid grid-cols-2 gap-4">
          <legend>Choose a console to start</legend>
          {menuMain.map((console) => (
            <fieldset
              className="tui-fieldset tui-border-double"
              key={console.name}
            >
              <legend>{console.name}</legend>
              {console.items.map((link) => (
                <Link href={link.linkRandom} key={link.name} passHref>
                  <button className="tui-button block mb-4 w-full">
                    {link.name}
                  </button>
                </Link>
              ))}
            </fieldset>
          ))}
          <fieldset className="tui-fieldset tui-border-double">
            <legend>Other</legend>
            {otherInMenu.map((link) => (
              <Link href={link.linkRandom} key={link.name} passHref>
                <button className="tui-button block mb-4 w-full">
                  {link.name}
                </button>
              </Link>
            ))}
          </fieldset>
        </fieldset>
      </div>
    </div>
  )
}
