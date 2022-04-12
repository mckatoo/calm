import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Container from '../../components/Container'
import Loader from '../../components/Loader'
import SideMenu from '../../components/SideMenu'
import TopMenu from '../../components/TopMenu'
import { RemmaperOrdersType } from '../../lib/binance/remmapers/orders'
import { formatPrice, formatTime } from '../../lib/format'

const Orders = () => {
  const { data: session, status } = useSession()
  const [Error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [binanceOrders, setBinanceOrders] = useState<RemmaperOrdersType[]>([])

  useEffect(() => {
    const getOrders = async () => {
      if (!session) return

      setLoading(true)
      const responseBinance = await fetch("http://localhost:3000/api/exchanges/binance/orders", {
        method: "POST",
        body: JSON.stringify({
          userId: session.user['userId'],
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

    getOrders().finally(() => setLoading(false))

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
                <div className="flex flex-col">
                  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                      <div className="overflow-x-auto">
                        <table className="min-w-full mx-4">
                          <thead className="border-b text-sm font-medium bg-slate-700 px-6 py-4 text-left">
                            <tr>
                              <th scope="col">
                                Data
                              </th>
                              <th scope="col">
                                Paridade
                              </th>
                              <th scope="col">
                                Preço
                              </th>
                              <th scope="col">
                                Total Comprado
                              </th>
                              <th scope="col">
                                Taxa
                              </th>
                              <th scope="col">
                                Valor Total
                              </th>
                            </tr>
                          </thead>
                          <tbody className='text-slate-900 px-6 py-4 whitespace-nowrap text-sm font-medium border-b'>
                            {
                              binanceOrders.map((order, index) => (
                                <tr key={index} className='h-8'>
                                  <td>{formatTime({ time: order.time })}</td>
                                  <td className='align-middle'>
                                    <Image src={order.icon || '/images/not-found.webp'} alt={order.pair} width={12} height={12} />
                                    {order.pair}
                                  </td>
                                  <td>{formatPrice(order.price)}</td>
                                  <td>{order.amount}</td>
                                  <td>{order.commission}</td>
                                  <td>{order.totalBuyed}</td>
                                </tr>
                              ))
                            }
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
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
