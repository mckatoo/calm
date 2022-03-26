import { Exchanges } from '@prisma/client'
import { signOut, useSession } from 'next-auth/react'
import { FormEvent, useEffect, useState } from 'react'
import Container from '../../components/Container'
import Loader from '../../components/Loader'
import SideMenu from '../../components/SideMenu'
import TopMenu from '../../components/TopMenu'

const Profile = () => {
  const { data: session, status } = useSession()
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [binance, setBinance] = useState<Exchanges>();

  useEffect(() => {
    return () => {
      setFormError('')
      setFormSuccess('')
      setBinance(undefined)
    }
  }, [])

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

  const updateExchanges = async (event: FormEvent) => {
    event.preventDefault()
    const exchanges = {
      userId: session.user['userId'],
      binanceKey: binance.apiKey,
      binanceSecret: binance.secretKey
    }
    const response = await fetch("http://localhost:3000/api/exchanges/create-update", {
      method: "POST",
      body: JSON.stringify(exchanges),
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (!response.ok) {
      const error = (await response.json()).error
      !!error && setFormError(error)
    }

    setFormSuccess('Exchanges updated successfully')
  }

  if (status === "loading")
    return (
      <div className="bg-white flex align-center justify-center">
        <Loader
          className="h-40 w-40"
        />
      </div>
    )

  if (!session) return null

  return (
    <main className="text-orange-50">
      <div className="flex flex-col md:flex-row">
        <SideMenu />
        <div className="grid-row-2 w-full">
          <div className="text-right">
            <TopMenu />
          </div>
          <Container>
            <div className='mx-3 pt-3 flex flex-col gap-4'>
              <div className='bg-stone-900 p-4 rounded-md flex flex-col gap-6'>
                <form onSubmit={updateExchanges}>
                  <h2 className='text-2xl pb-2'>Exchanges</h2>
                  <fieldset className='flex gap-4 p-4 border-2 border-solid rounded-md'>
                    <legend className='px-2' >Binance</legend>
                    <div className='flex gap-4'>
                      <div>
                        <label className="text-sm font-sans font-medium">
                          Api Key
                        </label>
                        <input
                          defaultValue="ENCRYPTED VALUE"
                          onChange={event => setBinance({ ...binance, apiKey: event.currentTarget.value })}
                          type="text"
                          name="binance-key"
                          className="w-full bg-black py-3 px-4 border hover: border-gray-500 rounded shadow text-base font-sans" />
                      </div>
                      <div>
                        <label className="text-sm font-sans font-medium">
                          Secret Key
                        </label>
                        <input
                          defaultValue="ENCRYPTED VALUE"
                          onChange={event => setBinance({ ...binance, secretKey: event.currentTarget.value })}
                          type="text"
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

                  <button type='submit' className='px-4 p-2 w-full place-content-center mt-4 bg-orange-700 rounded-md flex font-semibold'>Salvar</button>

                </form>
              </div>

              <div className='bg-stone-900 p-4 rounded-md flex flex-col gap-6'>
                <form onSubmit={updatePassword}>
                  <h2 className='text-2xl pb-2'>Password</h2>
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

                  <button type='submit' className='px-4 p-2 w-full place-content-center mt-4 bg-orange-700 rounded-md flex font-semibold'>Salvar</button>

                </form>
              </div>
            </div>
          </Container>
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
      {!!formSuccess &&
        <div
          onClick={() => setFormSuccess('')}
          className="z-50 cursor-pointer fixed flex items-center whitespace-nowrap top-0 right-0 p-2 rounded-bl-md text-center bg-green-600 text-orange-50 font-bold text-xs">
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
          {formSuccess.toUpperCase()}
        </div>
      }
    </main>
  )
}

export default Profile
