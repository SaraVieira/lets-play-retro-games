import '../styles/globals.css'
import 'tuicss'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { Header } from '../components/Header'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // @ts-ignore
    import('tuicss/dist/tuicss.min.js').default
  }, [])

  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <div className="min-h-screen tui-bg-cyan-white">
        <Header />
        <div className="flex min-h-screen items-center justify-center">
          <main
            className="tui-screen-1024-768 bordered centered! m-0 !overflow-auto"
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
