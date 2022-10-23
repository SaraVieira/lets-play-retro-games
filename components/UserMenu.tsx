import { signIn, signOut, useSession } from 'next-auth/react'
import { SessionWithID } from '../constants/types'
import Link from 'next/link'

export const UserMenu = () => {
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
          />
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
