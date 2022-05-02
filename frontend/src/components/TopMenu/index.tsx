import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSync } from '../../hooks/use-sync'

import Logo from '../Logo'

const TopMenu = () => {
  const { data: session } = useSession()
  const [spin, setSpin] = useState<'animate-spin' | ''>('')
  const [isOpenUserMenu, setIsOpenUserMenu] = useState(false)
  const [isOpenSideMenu, setIsOpenSideMenu] = useState(false)
  const [styleFailOnSync, setStyleFailOnSync] = useState('hidden')

  const toggleSideMenu = () => setIsOpenSideMenu(!isOpenSideMenu)

  const { sync, loading, isFailSync } = useSync()

  useEffect(() => {
    setStyleFailOnSync('hidden')
    if (loading) {
      setSpin('animate-spin')
    } else {
      setSpin('')
      isFailSync && setStyleFailOnSync('absolute bottom-0 right-0 ml-2 text-red-700 text-2xl')
    }
  }, [loading, isFailSync])

  return (
    <div className="flex items-center py-2 px-0 justify-between">
      <menu aria-label='Open Side Menu' className='w-14 h-14 cursor-pointer content-center md:hidden' onClick={toggleSideMenu}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      </menu>

      {isOpenSideMenu && (
        <nav className='
          bg-gray-100 
          overflow-hidden
          inset-0
          absolute
          z-50
          text-stone-900
        '>
          <span
            aria-label='Close Side Menu'
            onClick={toggleSideMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-14 w-14 cursor-pointer absolute top-0 right-0 m-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>

          <div className='grid grid-cols-1 h-full items-center content-center text-2xl font-bold text-center' >
            <Link href="/">
              <a className='
                relative
                m-2
                hover:animate-pulse
              '>
                <span>Portifólio</span>
              </a>
            </Link>
            <Link href="/app/orders">
              <a className='
                relative
                m-2
                hover:animate-pulse
              '>
                <span>Ordens</span>
              </a>
            </Link>
            <Link href="/">
              <a className='
                relative
                m-2
                hover:animate-pulse
              '>
                <span className="">Gráficos</span>
              </a>
            </Link>
          </div>
        </nav>
      )}
      <div >
      </div>

      <div className={`
        md:hidden 
        absolute 
        left-1/2
        -translate-x-1/2
        w-14
        h-14
        cursor-pointer
      `}>
        <Logo size="normal" />
      </div>

      <div className='z-40 flex md:flex-grow relative justify-end'>
        <div>
          <button className={`
            px-2
            border-2
            border-transparent
            focus:border-2
            focus:border-dashed
            focus:border-orange-50
            rounded-md
          `}
            aria-label='Sync data between exchanges and database'
            onClick={sync}
          >
            <div className={`relative`}>
              <div className={spin}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 -scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
              </div>
              <span aria-label='Fail on Sync' className={styleFailOnSync}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
          </button>
        </div>
        <menu aria-label='User Menu' className='
            text-center 
            border-2
            border-transparent
            focus:border-2
            focus:border-dashed
            focus:border-orange-50
            rounded-md
          '>
          <button className={`
          flex
          gap-2
          px-2
          items-center
          h-14
        `} onClick={() => { setIsOpenUserMenu(!isOpenUserMenu) }}>
            <span className='hidden md:flex'>
              {session.user.name}
            </span>
            <span className='md:hidden'>
              {session.user.image
                ? (
                  <div className='h-14 w-14 m-2'>
                    <Image src={session.user.image} className='rounded-full' alt={session.user.name} width="56" height="56" />
                  </div>
                )
                : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                  </svg>
                )
              }
            </span>
            <span className='hidden md:flex text-3xl'>{isOpenUserMenu ? '▲' : '▼'}</span>
          </button>
          <div
            className={`
            absolute
            z-50
            bg-slate-900
            overflow-hidden
            right-0
            mr-2
            rounded-md
            ${!isOpenUserMenu ? 'hidden' : ''}
          `}>
            <Link href={'/app/profile'}>
              <a className='hover:bg-gray-800 rounded-md block px-16 py-2'>Perfil</a>
            </Link>
            <button className='hover:bg-gray-800 rounded-md block w-full py-2' onClick={() => signOut()}>Sair</button>
          </div>
          {isOpenUserMenu &&
            <span
              className='bg-black bg-opacity-50 fixed z-30 inset-0'
              onClick={() => { setIsOpenUserMenu(false) }}
            />
          }
        </menu>
      </div>
    </div>
  )
}

export default TopMenu