import '../styles/globals.css'
import 'tuicss'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { Header } from '../components/Header'
import { SEO } from '../components/SEO'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // @ts-ignore
    import('tuicss/dist/tuicss.min.js').default
  }, [])

  return (
    <>
      <SEO />
      <div className="min-h-screen tui-bg-cyan-white">
        <Header />
        <div className="flex min-h-screen items-center justify-center">
          <main
            className="tui-screen-1024-768 bordered centered! m-0 !overflow-auto mt-24 sm:mt-0"
            id="container"
          >
            <Component {...pageProps} />
          </main>
        </div>
      </div>
    </>
  )
}

export default MyApp
