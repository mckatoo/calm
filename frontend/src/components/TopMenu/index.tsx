import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'

const TopMenu = () => {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="grid place-content-end p-2">
      <div className='relative text-center flex gap-2 z-50'>
        <button className={`
          flex
          gap-2
          border-2
          border-transparent
          focus:border-2
          focus:border-dashed
          focus:border-orange-50
          p-2
          rounded-md
        `} onClick={() => { setIsOpen(!isOpen) }}>
          {session.user.name}
          <span>{isOpen ? '▲' : '▼'}</span>
        </button>
        <div className={`
          absolute top-10 p-2 w-full bg-slate-900
          ${isOpen ? `visible` : `hidden`}
        `}>
          <Link href={'/app/profile'}>
            <a className='hover:bg-gray-800 rounded-md block py-2'>Perfil</a>
          </Link>
          <button className='hover:bg-gray-800 rounded-md block w-full  py-2' onClick={() => signOut()}>Sair</button>
        </div>
      </div>
      {isOpen &&
        <span
          className='bg-black bg-opacity-50 fixed z-30 inset-0'
          onClick={() => { setIsOpen(false) }}
        />
      }
    </div>
  )
}

export default TopMenu