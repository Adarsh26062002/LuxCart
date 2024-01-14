import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Poppins } from 'next/font/google'
import Header from './components/Header'
import  CartContextProvider  from '@/lib/CartContext'
import { Toaster } from 'react-hot-toast'
import {SessionProvider,useSession} from 'next-auth/react'

const inter = Poppins({ subsets: ['latin'], weight:'400' })

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  // const {data:session} = useSession()
  return (
    <SessionProvider session={session}>
    <CartContextProvider>
      <main className={`${inter.className} min-h-screen max-sm:px-4 text-accent max-w-screen-2xl`}>
      <Header/>
      <Component {...pageProps}/>
      <Toaster
        position='top-center'
        reverseOrder={false}
        />
      </main>
    </CartContextProvider>
    </SessionProvider>
  )
}
