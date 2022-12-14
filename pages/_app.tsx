import '../styles/globals.css'
import 'tuicss'
import { useEffect } from 'react'
import { Header } from '../components/Header'
import { SessionProvider } from 'next-auth/react'
import { SEO } from '../components/SEO'

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  useEffect(() => {
    // @ts-ignore
    import('tuicss/dist/tuicss.min.js').default
  }, [])

  return (
    <SessionProvider session={session}>
      <SEO />
      <div className="min-h-screen tui-bg-cyan-white">
        <Header />
        <div className="flex min-h-screen justify-center">
          <main className="sm:max-w-5xl max-w-[90%] mt-12" id="container">
            <Component {...pageProps} />
          </main>
        </div>
      </div>
    </SessionProvider>
  )
}

export default MyApp
