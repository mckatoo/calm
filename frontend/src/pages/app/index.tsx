import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Container from '../../components/Container'
import Loader from '../../components/Loader'
import PortifolioItem, { PortifolioItemProps } from '../../components/PortifolioItem'
import SideMenu from '../../components/SideMenu'
import TopMenu from '../../components/TopMenu'

const App = () => {
  const { data: session, status } = useSession()

  const [portifolios, setPortifolios] = useState<PortifolioItemProps[]>([])
  const [formError, setFormError] = useState('')
  const [formSuccess, setFormSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getBalances = async () => {
      if (!session) return

      setLoading(true)
      const response = await fetch(
        "http://localhost:3000/api/exchanges/binance/balance",
        {
          method: "POST",
          body: JSON.stringify({ userId: session.user['userId'] }),
          headers: {
            "Content-Type": "application/json"
          }
        })

      if (!response.ok) {
        const error = (await response.json()).error
        !!error && setFormError(error)
      } else {
        const balances = await response.json()
        setPortifolios(balances)
        setLoading(false)
      }
    }

    getBalances()

    return () => {
      setLoading(false)
      setPortifolios([])
      setFormSuccess('')
      setFormError('')
    }
  }, [session])

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
            {loading
              ? (
                <div className="bg-white flex align-center justify-center">
                  <Loader
                    className="h-40 w-40"
                  />
                </div>
              )
              : (
                <div className='flex flex-col'>
                  {
                    portifolios.length > 0
                      ? (
                        portifolios.map((item, index) => (
                          <div key={index} className={index === 0 ? 'm-2' : 'mx-2 mb-2'}>
                            <PortifolioItem {...item} />
                          </div>
                        ))
                      )
                      : (
                        <div className='mx-2 mb-2 text-center'>
                          <Image src="/images/empty.jpg" alt="Empty" width="1000" height="950" />
                        </div>
                      )
                  }
                </div>
              )
            }

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

export default App
