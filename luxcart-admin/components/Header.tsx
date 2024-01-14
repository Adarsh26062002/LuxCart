import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {}

const Header = (props: Props) => {
  const { data: session } = useSession()

  const router = useRouter()
  const active = 'text-green-500 transition hover:text-gray-500/75 p-3 bg-gray-200 rounded-xl';
  const inactive = 'text-gray-500 transition hover:text-gray-500/75 p-3';

  if (session) {
    return (
      <>
        <header className="bg-white border-b sticky top-0">
          <div className="lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex-1 md:flex md:items-center md:gap-12">
                <a className="block text-teal-600" href="/">
                  <span className="sr-only">Home</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                  </svg>

                </a>
              </div>

              <div className="md:flex md:items-center md:gap-12">
                <nav aria-label="Global" className="hidden md:block">
                  <ul className="flex items-center gap-6 text-sm">
                    <li>
                      <a className={location.pathname=='/' ? active:inactive} href="/">Dashboard </a>
                    </li>

                    <li>
                      <a className={location.pathname=='/products' ? active:inactive} href="/products"> Products </a>
                    </li>

                    <li>
                      <a className={location.pathname=='/categories' ? active:inactive} href="/categories"> Categories </a>
                    </li>

                    <li>
                      <a className={location.pathname=='/orders' ? active:inactive} href="/orders"> Orders </a>
                    </li>

                    <li>
                      <a className={location.pathname=='/settings' ? active:inactive} href="/settings"> Settings </a>
                    </li>

                  </ul>
                </nav>

                <div className="flex items-center gap-4">
                  <div className="sm:flex sm:gap-4">
                    <div className='h-9 w-9'>
                      {session?.user?.image && (
                        <img
                          className="h-full w-full rounded-full object-cover object-center"
                          src={session.user.image}
                          alt=""
                        />
                      )}
                    </div>
                  </div>

                  <div className="block md:hidden">
                    <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </>
    )
  }
}

export default Header