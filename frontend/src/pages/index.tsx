import { GetServerSideProps } from 'next'
import { getSession, signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'

import Loader from '../components/Loader'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })

  if (session) return {
    redirect: {
      destination: "/app",
      permanent: false
    }
  }

  return {
    props: {}
  }
}

export default function Login() {
  const routes = useRouter()
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState('')

  function handleGoogleSignIn() {
    signIn('google')
  }

  function handleFacebookSignIn() {
    signIn('facebook')
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const user = {
      username: event.currentTarget['username']?.value,
      password: event.currentTarget['password']?.value,
    }

    const result = await signIn('credentials', {
      ...user,
      redirect: false,
      callbackUrl: `${routes.query?.callbackUrl || ''}`
    })

    if (result?.url) {
      return routes.push(result?.url)
    }

    setLoading(false)

    setFormError('username or password is invalid')
  }

  if (loading) return (
    <div className="bg-white flex align-center justify-center">
      <Loader
        className="h-40 w-40"
      />
    </div>
  )

  return (
    <div className='grid md:grid-cols-2 text-white font-sans font-bold'>
      <div className="grid grid-flow-col min-h-screen items-center justify-items-center">
        <form onSubmit={handleSubmit}>
          <p className="text-center text-4xl">
            WELCOME
          </p>
          <div>
            <label className="text-sm font-sans font-medium">
              Username
            </label>
            <input
              type="text"
              name="username"
              className="w-full bg-black py-3 px-4 border hover: border-gray-500 rounded shadow text-base font-sans" />
          </div>
          <div>
            <label className="text-sm font-sans font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              className=" w-full bg-black py-3 px-4 border hover: border-gray-500 rounded shadow text-base font-sans" />
            <div className="grid grid-cols-2 space-x-3">
              <a href="" className="text-sm font-sans font-medium text-gray-600 underline">
                {'Forgot password?'}
              </a>
              <Link href="/signup">
                <a className="text-right text-sm font-sans font-medium text-gray-400 underline">
                  {"Don't have an account? Sign up"}
                </a>
              </Link>
            </div>
          </div>

          {/* <p className="text-center text-lg pt-2">
            OR
          </p>

          <div>
            <label className="text-sm font-sans font-medium">
              Binance Api Key
            </label>
            <input
              type="text"
              name="binance-key"
              className="w-full bg-black py-3 px-4 border hover: border-gray-500 rounded shadow text-base font-sans" />
          </div> */}

          <div className="text-sm font-sans font-medium pt-4">
            <button
              type="submit"
              className="text-center w-full py-4 bg-blue-700 hover:bg-blue-400 rounded-md text-white">
              LOGIN
            </button>
          </div>
          <div className="text-center  text-sm font-sans pt-4 grid-cols-3 content-center space-x-4">
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="p-2 bg-red-700 hover:bg-blue-400 rounded-md text-white">
              GOOGLE
            </button>
            <button
              onClick={handleFacebookSignIn}
              type="button"
              className="p-2 bg-blue-800 hover:bg-blue-400 rounded-md text-white">
              FACEBOOK
            </button>
          </div>
        </form>
      </div>

      <div className="p-4 hidden md:grid grid-rows-3 text-white font-sans font-bold bg-cover bg-[url('/images/login.jpg')]">
        <div className="row-start-1">
          logotipo
        </div>
        <div className="row-start-2">
          <p>KEEP</p>
          <p>CALM</p>
          <p>{'&'}</p>
          <p>ORGANIZE YOUR CRYPTOCURRENCIES.</p>
        </div>
      </div>

      {!!formError &&
        <div
          onClick={() => setFormError('')}
          className="z-50 cursor-pointer fixed flex items-center whitespace-nowrap top-0 right-0 p-2 rounded-bl-md text-center bg-red-700 text-orange-50 font-bold text-xs">
          <div className="w-7">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          {formError.toUpperCase()}
        </div>
      }
    </div>
  )
}
