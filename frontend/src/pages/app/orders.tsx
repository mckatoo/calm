import { BinanceOrders } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Container from '../../components/Container'
import Loader from '../../components/Loader'
import SideMenu from '../../components/SideMenu'
import TopMenu from '../../components/TopMenu'



const Orders = () => {
  const { data: session, status } = useSession()
  const [Error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [binanceOrders, setBinanceOrders] = useState<BinanceOrders[]>([])

  useEffect(() => {
    const getOrders = async () => {
      if (!session) return

      setLoading(true)
      const responseBinance = await fetch("http://localhost:3000/api/exchanges/binance/orders", {
        method: "POST",
        body: JSON.stringify({ 
          userId: session.user['userId'] ,
          symbol: 'BTCUSDT'
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (!responseBinance.ok) {
        const error = (await responseBinance.json()).error
        !!error && setError(error)
      } else {
        const orders = await responseBinance.json()
        setBinanceOrders(orders)
      }
    }
    
    getOrders()
    setLoading(false)

    return () => {
      setBinanceOrders([])
      setError('')
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
                    binanceOrders.length > 0 && (
                      binanceOrders.map((order, index) => (
                        <div key={index} className={`text-black ${index === 0 ? 'm-2' : 'mx-2 mb-2'}`}>
                          Pair: {order.pair} | Amount: {order.amount}
                        </div>
                      ))
                    )
                  }
                </div>
              )
            }
          </Container>
        </div>
      </div>
      {!!Error &&
        <div
          onClick={() => setError('')}
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
          {Error.toUpperCase()}
        </div>
      }
    </main>
  )
}

export default Orders
