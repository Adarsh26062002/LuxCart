import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Poppins } from 'next/font/google'
import { SessionProvider } from "next-auth/react"
import Header from '@/components/Header'

const inter = Poppins({ subsets: ['latin'], weight:'400'})

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider>
      <Header/>
    <main className={`${inter.className}`}>
      <Component {...pageProps} />
    </main>
    </SessionProvider>
  )
}
