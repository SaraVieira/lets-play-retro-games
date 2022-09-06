import Link from 'next/link'
import { useRouter } from 'next/router'
import { consolesMenu } from '../constants/info'

export const Header = () => {
  const { asPath } = useRouter()
  return (
    <nav className="tui-nav !flex justify-between">
      <Link href={'/'} passHref>
        <svg
          width="44"
          xmlns="http://www.w3.org/2000/svg"
          x="0"
          y="0"
          viewBox="0 0 100 100"
          className="absolute z-10 ml-4 tui-shadow tui-bg-cyan-white"
        >
          <g data-name="Console, gadget, game, game boy, retro">
            <path d="M92.83 46.44L47 46.26V35a1.29 1.29 0 011.29-1.29h10.18A4.53 4.53 0 0063 29.17v-17a1.5 1.5 0 00-3 0v17a1.54 1.54 0 01-1.53 1.53H48.29A4.29 4.29 0 0044 35v11.24l-36.82-.15a1.5 1.5 0 00-1.06.44 1.52 1.52 0 00-.44 1.06v39.86A1.5 1.5 0 007.17 89l85.65.35a1.5 1.5 0 001.5-1.5V47.94a1.51 1.51 0 00-1.49-1.5zM91.32 86.3L8.68 86V49.1l82.64.34z"></path>
            <path d="M15.55 73.09h6.58v6.57a1.5 1.5 0 001.5 1.5h7.74a1.5 1.5 0 001.5-1.5v-6.6h6.59A1.51 1.51 0 0041 71.54v-7.73a1.47 1.47 0 00-.45-1.06 1.39 1.39 0 00-1.06-.44h-6.62v-6.56a1.5 1.5 0 00-1.5-1.5h-7.74a1.5 1.5 0 00-1.5 1.5v6.59h-6.59a1.5 1.5 0 00-1.5 1.5v7.74a1.51 1.51 0 001.51 1.51zm8.08-7.75a1.51 1.51 0 001.5-1.5v-6.59h4.74v6.57a1.5 1.5 0 00.44 1.06 1.46 1.46 0 001.06.44H38v4.74h-6.63a1.5 1.5 0 00-1.5 1.5v6.59h-4.74v-6.58a1.5 1.5 0 00-1.5-1.5h-6.58v-4.72zM60.55 73.09h6.58v6.57a1.5 1.5 0 001.5 1.5h7.74a1.5 1.5 0 001.5-1.5v-6.6h6.59A1.51 1.51 0 0086 71.54v-7.73a1.47 1.47 0 00-.45-1.06 1.44 1.44 0 00-1.06-.44h-6.62v-6.56a1.5 1.5 0 00-1.5-1.5h-7.74a1.5 1.5 0 00-1.5 1.5v6.59h-6.59a1.5 1.5 0 00-1.5 1.5v7.74a1.51 1.51 0 001.51 1.51zm8.08-7.75a1.51 1.51 0 001.5-1.5v-6.59h4.74v6.57a1.5 1.5 0 00.44 1.06 1.46 1.46 0 001.06.44H83v4.74h-6.63a1.5 1.5 0 00-1.5 1.5v6.59h-4.74v-6.58a1.5 1.5 0 00-1.5-1.5h-6.58v-4.72zM45 79.7h10a1.5 1.5 0 000-3H45a1.5 1.5 0 000 3z"></path>
          </g>
        </svg>
      </Link>
      <div className="!flex gap-6 ml-20">
        <Link href={'/'}>
          <a>
            <span className="red-168-text">H</span>ome
          </a>
        </Link>
        <li className="tui-dropdown">
          <span className="red-168-text">R</span>andom{' '}
          <span className="red-168-text">G</span>ame
          <div className="tui-dropdown-content">
            <ul>
              {consolesMenu.map((console) => (
                <li key={console.name}>
                  <Link href={console.linkRandom}>
                    <a>
                      <span className="red-168-text">
                        {console.name.charAt(0)}
                      </span>
                      {console.name.substring(1)}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </li>
        <li className="tui-dropdown">
          <span className="red-168-text">A</span>ll{' '}
          <span className="red-168-text">G</span>ames
          <div className="tui-dropdown-content">
            <ul>
              {consolesMenu.map((console) => (
                <li key={console.name}>
                  <a href={console.linkAll}>
                    <span className="red-168-text">
                      {console.name.charAt(0)}
                    </span>
                    {console.name.substring(1)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </li>

        <Link href={'/search'}>
          <a>
            <span className="red-168-text">S</span>earch
          </a>
        </Link>

        {asPath.includes('random') && (
          <button onClick={() => location.reload()}>
            <span className="red-168-text">A</span>nother
          </button>
        )}
      </div>
      <span
        className="tui-datetime hidden sm:block"
        data-format="h:m:s a"
      ></span>
    </nav>
  )
}
