import Link from 'next/link'
import { useRouter } from 'next/router'
import { menuMain, otherInMenu } from '../constants/info'
import { Logo } from './Logo'

export const Header = () => {
  const { asPath } = useRouter()
  return (
    <nav className="tui-nav !flex justify-between">
      <Link href={'/'} passHref>
        <Logo />
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
              {menuMain.map((console) => (
                <li className="tui-dropdown block" key={console.name}>
                  <span className="right">►</span>
                  <span className="red-168-text">{console.name.charAt(0)}</span>
                  {console.name.substring(1)}
                  <div className="tui-dropdown-content">
                    <ul>
                      {console.items.map((item) => (
                        <li key={item.id}>
                          <Link href={item.linkRandom}>
                            <a>
                              <span className="red-168-text">
                                {item.name.charAt(0)}
                              </span>
                              {item.name.substring(1)}
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
              {otherInMenu.map((console) => (
                <li key={console.name}>
                  <a href={console.linkRandom}>
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
        <li className="tui-dropdown">
          <span className="red-168-text">A</span>ll{' '}
          <span className="red-168-text">G</span>ames
          <div className="tui-dropdown-content">
            <ul>
              {menuMain.map((console) => (
                <li className="tui-dropdown block" key={console.name}>
                  <span className="right">►</span>
                  <span className="red-168-text">{console.name.charAt(0)}</span>
                  {console.name.substring(1)}
                  <div className="tui-dropdown-content">
                    <ul>
                      {console.items.map((item) => (
                        <li key={item.id}>
                          <Link href={item.linkAll}>
                            <a>
                              <span className="red-168-text">
                                {item.name.charAt(0)}
                              </span>
                              {item.name.substring(1)}
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
              {otherInMenu.map((console) => (
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
