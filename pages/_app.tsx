import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '@fontsource/press-start-2p'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp