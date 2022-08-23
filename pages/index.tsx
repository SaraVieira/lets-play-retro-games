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
    img: '/gba.png',
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
    <div className="bg-gray-200 min-h-screen flex justify-center items-center">
      <div className="pt-6 pb-16 sm:pb-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 grid gap-2 grid-cols-3 gap-6">
          {links.map((link) => (
            <div
              className="wrapper-console text-center text-white font-bold text-2xl"
              key={link.alt}
            >
              <img
                alt={link.alt}
                src={link.img}
                className="m-auto w-[320px] relative transition z-10 block"
              />
              <Link href={link.link} passHref>
                <a className=" eightbit-btn top-[-40px] relative block z-10 relative">
                  {link.name}
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}