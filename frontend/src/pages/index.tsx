import { GetServerSideProps } from "next"
import { getSession, signIn, useSession } from "next-auth/react"
import { FormEvent } from "react"

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
    const response = await fetch("http://localhost:3000/api/user/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    })
    console.log('response', await response.json())
  }

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
              <a href="/signup" className="text-right text-sm font-sans font-medium text-gray-400 underline">
                {"Don't have an account? Sign up"}
              </a>
            </div>
          </div>

          <p className="text-center text-lg pt-2">
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
          </div>

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
    </div>
  )
}
