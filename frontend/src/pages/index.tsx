import { GetServerSideProps } from "next"
import { getSession, signIn, useSession } from "next-auth/react"

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

export default function Home() {

  function handleGoogleSignIn() {
    signIn('google')
  }

  function handleFacebookSignIn() {
    signIn('facebook')
  }

  return (
    <div className='grid md:grid-cols-2 text-white font-sans font-bold'>
      <div className="grid grid-rows-6 grid-flow-col min-h-screen items-center justify-items-start">
        <div className="row-span-4 px-10 row-start-2 text-4xl">
          <p className="text-center">
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
              <a href="" className="text-right text-sm font-sans font-medium text-gray-400 underline">
                {"Don't have an account? Sign up"}
              </a>
            </div>
          </div>

          <div className="text-sm font-sans font-medium pt-4">
            <button
              type="button"
              className="text-center w-full py-4 bg-blue-700 hover:bg-blue-400 rounded-md text-white">
              SIGN IN
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
        </div>
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
