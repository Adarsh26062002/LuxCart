import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Poppins } from 'next/font/google'
import { SessionProvider } from "next-auth/react"
import Header from '@/components/Header'

const inter = Poppins({ subsets: ['latin'], weight:'400'})

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <main className={`mx-auto max-w-screen-xl px-4 sm:px-6 ${inter.className}`}>
    <SessionProvider>
      <Header/>
      <Component {...pageProps} />
    </SessionProvider>
    </main>
  )
}
