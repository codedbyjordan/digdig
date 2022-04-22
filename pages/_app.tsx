import '../styles/globals.css'
import type { AppProps } from 'next/app'
import EthersContextProvider from '../contexts/EthersContextProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <EthersContextProvider>
      <Component {...pageProps} />
    </EthersContextProvider>
  )
}

export default MyApp
