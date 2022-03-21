import { User } from "@prisma/client"
import { GetServerSideProps } from "next"
import { getSession, signIn } from "next-auth/react"
import { useRouter } from "next/router"
import { FormEvent, useState } from "react"

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

export default function SignUp() {
  const routes = useRouter()
  const [formError, setFormError] = useState('');
  
  const handleSignUp = async (event: FormEvent) => {
    event.preventDefault()
    const user = {
      name: event.currentTarget['name']?.value,
      email: event.currentTarget['email']?.value,
      password: event.currentTarget['password']?.value,
      repeatPassword: event.currentTarget['repeat-password']?.value,
      username: event.currentTarget['username']?.value,
    }
    const response = await fetch("http://localhost:3000/api/user/create", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (response.ok) {
      await signIn('credentials', {
        ...user,
        callbackUrl: '/'
      })
    }

    setFormError((await response.json()).error)
  }

  return (
    <div className='grid md:grid-cols-2 text-white font-sans font-bold'>
      <div className="grid grid-rows-6 grid-flow-col min-h-screen items-center justify-items-center">
        <form onSubmit={handleSignUp} className="row-span-4 px-10 row-start-2 text-4xl">
          <p className="text-center">
            SIGN UP
          </p>
          <div>
            <label className="text-sm font-sans font-medium">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full bg-black py-3 px-4 border hover: border-gray-500 rounded shadow text-base font-sans" />
          </div>
          <div>
            <label className="text-sm font-sans font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full bg-black py-3 px-4 border hover: border-gray-500 rounded shadow text-base font-sans" />
          </div>
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
          </div>
          <div>
            <label className="text-sm font-sans font-medium">
              Repeat Password
            </label>
            <input
              type="password"
              name="repeat-password"
              className=" w-full bg-black py-3 px-4 border hover: border-gray-500 rounded shadow text-base font-sans" />
          </div>

          <div className="text-sm font-sans font-medium pt-4">
            <button
              type="submit"
              className="text-center w-full py-4 bg-orange-700 hover:bg-orange-400 rounded-md text-white">
              SIGN UP
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
        <div className="fixed flex items-center whitespace-nowrap top-0 right-0 p-2 rounded-bl-md text-center bg-red-700 text-orange-50 font-bold text-xs">
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
