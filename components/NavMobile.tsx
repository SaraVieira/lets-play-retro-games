import Link from 'next/link'
import { useRouter } from 'next/router'
import { menuMain, otherInMenu } from '../constants/info'

import { Logo } from './Logo'
import { UserMenu } from './UserMenu'

export const NavMobile = () => {
  const { asPath } = useRouter()
  return (
    <div className="flex lg:hidden justify-between">
      <div>
        <Link className="absolute sm:relative" href="/">
          <Logo />
        </Link>
        <div className="flex gap-4 sm:gap-6 sm:ml-[120px] ml-20 w-full">
          <li className="tui-dropdown">
            <span className="red-168-text">M</span>enu
            <div className="tui-dropdown-content">
              <ul>
                <li>
                  <Link className="hidden sm:inline" href="/">
                    <span className="red-168-text">H</span>ome
                  </Link>
                </li>
                <li className="tui-dropdown">
                  <span className="red-168-text">R</span>andom{' '}
                  <span className="hidden sm:inline">
                    <span className="red-168-text ">G</span>ame
                  </span>
                  <div className="tui-dropdown-content">
                    <ul>
                      {menuMain.map((console) => (
                        <li className="tui-dropdown block" key={console.name}>
                          <span className="right">►</span>
                          <span className="red-168-text">
                            {console.name.charAt(0)}
                          </span>
                          {console.name.substring(1)}
                          <div className="tui-dropdown-content">
                            <ul>
                              {console.items.map((item) => (
                                <li key={item.id}>
                                  <Link href={item.linkRandom}>
                                    <span className="red-168-text">
                                      {item.name.charAt(0)}
                                    </span>
                                    {item.name.substring(1)}
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
                          <span className="red-168-text">
                            {console.name.charAt(0)}
                          </span>
                          {console.name.substring(1)}
                          <div className="tui-dropdown-content">
                            <ul>
                              {console.items.map((item) => (
                                <li key={item.id}>
                                  <Link href={item.linkAll}>
                                    <span className="red-168-text">
                                      {item.name.charAt(0)}
                                    </span>
                                    {item.name.substring(1)}
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
                <li>
                  <Link href={'/search'}>
                    <span className="red-168-text">S</span>earch
                  </Link>
                </li>
                <li>
                  <Link
                    href={'https://github.com/SaraVieira/lets-play-retro-games'}
                  >
                    <span className="red-168-text">C</span>ontribute
                  </Link>
                </li>
                {asPath.includes('random') && (
                  <li>
                    <button
                      className="hidden sm:block"
                      onClick={() => location.reload()}
                    >
                      <span className="red-168-text">A</span>nother
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </li>
        </div>
      </div>
      <div className="flex gap-4 items-center w-[400px] mt-8 relative right-7 static mt-0 w-auto justify-end">
        <UserMenu />
        <span className="tui-datetime" data-format="h:m:s a"></span>
      </div>
    </div>
  )
}
