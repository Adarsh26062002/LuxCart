import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Poppins } from 'next/font/google'
import Header from './components/Header'

const inter = Poppins({ subsets: ['latin'], weight:'400' })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.className} min-h-screen max-sm:px-4 text-accent max-w-screen-2xl`}>
      <Header/>
      <Component {...pageProps}/>
    </main>
  )
}
