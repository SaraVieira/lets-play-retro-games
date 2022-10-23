import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { menuMain, otherInMenu } from '../constants/info'
import { SessionWithID } from '../constants/types'
import { Logo } from './Logo'

function User() {
  const { data } = useSession()
  let session = data as SessionWithID
  if (session) {
    return (
      <>
        <li className="tui-dropdown">
          <img
            src={session?.user?.image as string}
            className="w-5 h-5 rounded-full"
            style={{
              boxShadow: '5px 5px 0 #000',
            }}
            alt={session?.user?.name as string}
          />{' '}
          <div className="tui-dropdown-content" style={{ marginLeft: -150 }}>
            <ul>
              {session?.user?.id && (
                <li>
                  <Link href={`/user/${session.user.id}`}>
                    <a className="hidden sm:inline">
                      <span className="red-168-text">P</span>rofile
                    </a>
                  </Link>
                </li>
              )}
              <li>
                <button className="w-full text-left" onClick={() => signOut()}>
                  <span className="red-168-text">S</span>ign out
                </button>
              </li>
            </ul>
          </div>
        </li>
      </>
    )
  }
  return (
    <>
      <button onClick={() => signIn()}>
        <span className="red-168-text">S</span>ign in
      </button>
    </>
  )
}

export const Header = () => {
  const { asPath } = useRouter()
  return (
    <nav className="tui-nav !flex justify-between ">
      <div>
        <Link href={'/'}>
          <a>
            <Logo />
          </a>
        </Link>
        <div className="flex gap-4 sm:gap-6 sm:ml-[120px] ml-20 w-full">
          <Link href={'/'}>
            <a className="hidden sm:inline">
              <span className="red-168-text">H</span>ome
            </a>
          </Link>

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
                    <span className="red-168-text">
                      {console.name.charAt(0)}
                    </span>
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
            <button
              className="hidden sm:block"
              onClick={() => location.reload()}
            >
              <span className="red-168-text">A</span>nother
            </button>
          )}
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <User />
        <span
          className="tui-datetime hidden sm:block"
          data-format="h:m:s a"
        ></span>
      </div>
    </nav>
  )
}
