import { signOut, useSession } from 'next-auth/react'
import { FormEvent, useState } from 'react'
import Container from '../../components/Container'
import Loader from '../../components/Loader'
import SideMenu from '../../components/SideMenu'


const Profile = () => {
  const { data: session, status } = useSession()
  const [formError, setFormError] = useState('');

  if (status === "loading")
    return (
      <div className="bg-white flex align-center justify-center">
        <Loader
          className="h-40 w-40"
        />
      </div>
    )

  if (!session) return null

  const updatePassword = async (event: FormEvent) => {
    event.preventDefault()
    const user = {
      email: session.user.email,
      password: event.currentTarget['password']?.value,
      repeatPassword: event.currentTarget['repeat-password']?.value,
      username: session.user['username'],
    }
    const response = await fetch("http://localhost:3000/api/user/update", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (response.ok) {
      await signOut()
    } else {
      const error = (await response.json()).error
      !!error && setFormError(error)
    }

  }

  const updateExchanges = (event: FormEvent) => {
    throw new Error('Function not implemented.')
  }

  return (
    <main className="text-orange-50">
      <div className="flex flex-col md:flex-row">
        <SideMenu />
        <Container>
          <div className='mx-3 pt-3'>
            <div className='bg-stone-900 p-4 rounded-md flex flex-col gap-6'>
              <form onSubmit={updateExchanges}>
                <div className='flex flex-row flex-nowrap justify-between'>
                  <h2 className='text-2xl pb-2'>Exchanges</h2>
                  <button type='submit' className='px-4 pt-2 bg-orange-700 rounded-md flex font-semibold'>Salvar</button>
                </div>
                <fieldset className='flex gap-4 p-4 border-2 border-solid rounded-md'>
                  <legend className='px-2' >Binance</legend>
                  <div className='flex gap-4'>
                    <div>
                      <label className="text-sm font-sans font-medium">
                        Api Key
                      </label>
                      <input
                        type="password"
                        name="binande-key"
                        className="w-full bg-black py-3 px-4 border hover: border-gray-500 rounded shadow text-base font-sans" />
                    </div>
                    <div>
                      <label className="text-sm font-sans font-medium">
                        Secret Key
                      </label>
                      <input
                        type="password"
                        name="binance-secret"
                        className="w-full bg-black py-3 px-4 border hover: border-gray-500 rounded shadow text-base font-sans" />
                    </div>
                  </div>
                </fieldset>
                <fieldset className='flex gap-4 p-4 border-2 border-solid rounded-md' disabled>
                  <legend className='px-2'>FTX - não implementada</legend>
                  <div className='flex gap-4'>
                    <div>
                      <label className="text-sm font-sans font-medium">
                        Api Key
                      </label>
                      <input
                        type="password"
                        name="ftx-key"
                        className="w-full bg-black py-3 px-4 border hover:border-gray-500 rounded shadow text-base font-sans" />
                    </div>
                    <div>
                      <label className="text-sm font-sans font-medium">
                        Secret Key
                      </label>
                      <input
                        type="password"
                        name="ftx-secret"
                        className="w-full bg-black py-3 px-4 border hover:border-gray-500 rounded shadow text-base font-sans" />
                    </div>
                  </div>
                </fieldset>
              </form>

              <form onSubmit={updatePassword}>
                <div className='flex pb-3 flex-row flex-nowrap justify-between'>
                  <h2 className='text-2xl pb-2'>Password</h2>
                  <button type='submit' className='px-4 pt-2 bg-orange-700 rounded-md flex font-semibold'>Salvar</button>
                </div>
                <fieldset className='flex gap-4 p-4 border-2 border-solid rounded-md'>
                  <div className='flex gap-4'>
                    <div>
                      <label className="text-sm font-sans font-medium">
                        New Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        className="w-full bg-black py-3 px-4 border hover: border-gray-500 rounded shadow text-base font-sans" />
                    </div>
                    <div>
                      <label className="text-sm font-sans font-medium">
                        Repeat Password
                      </label>
                      <input
                        type="password"
                        name="repeat-password"
                        className="w-full bg-black py-3 px-4 border hover: border-gray-500 rounded shadow text-base font-sans" />
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </Container>
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
    </main>
  )
}

export default Profile
