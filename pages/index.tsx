import Link from 'next/link'

const links = [
  {
    img: '/nes.png',
    alt: 'NES',
    name: 'Nintendo Entertainment System',
    link: '/nes/random',
  },
  {
    img: '/snes.png',
    alt: 'SNES',
    name: 'Super Nintendo',
    link: '/snes/random',
  },
  {
    img: '/gb.png',
    alt: 'Game Boy',
    name: 'Game Boy',
    link: '/gb/random',
  },
  {
    img: '/gbc.png',
    alt: 'Game Boy Color',
    name: 'Game Boy Color',
    link: '/gba/random',
  },
  {
    img: '/gba.png',
    alt: 'Game Boy Advance',
    name: 'Game Boy Advance',
    link: '/gba/random',
  },
]

export default function Example() {
  return (
    <div className="flex items-center justify-center min-h-full flex-col">
      <h1 className="text-2xl mb-8 font-bold">Let{"'"}s play some retro games</h1>

      <div className="tui-window">
        <fieldset className="tui-fieldset tui-border-double">
          <legend>Choose a console to start</legend>

          {links.map((link) => (
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