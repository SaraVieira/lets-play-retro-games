import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'tuicss'
import { useEffect } from 'react'
import { Header } from '../components/Header'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // @ts-ignore
    import('tuicss/dist/tuicss.min.js').default
  }, [])
  return (
    <div className="min-h-screen tui-bg-cyan-white">
      <Header />
      <div className="flex min-h-screen items-center justify-center">
        <main className="tui-screen-1024-768 bordered centered! m-0 !overflow-auto">
          <Component {...pageProps} />
        </main>
      </div>
    </div>
  )
}

export default MyApp