import { signOut, useSession } from 'next-auth/react'

import Container from '../../components/Container'
import Loader from '../../components/Loader'
import PortifolioItem from '../../components/PortifolioItem'
import SideMenu from '../../components/SideMenu'

const App = () => {
  const { data: session, status } = useSession()

  if (status === "loading")
    return (
      <div className="bg-white flex align-center justify-center">
        <Loader
          className="h-40 w-40"
        />
      </div>
    )

  if (!session) return null

  const handleSignOut = () => signOut({
    callbackUrl: "/"
  })

  const portifolios = [
    {
      id: '3alskfjsdj',
      name: 'Bitcoin',
      image: '/images/bitcoin.svg',
      quantity: 2,
      price: 41299.20,
      averagePrice: 45865.78,
      roi: 2.5
    },
    {
      id: 'fas4wedvsfkljlsdkjv',
      name: 'Ethereum',
      image: '/images/ethereum.svg',
      quantity: 2,
      price: 2859.31,
      averagePrice: 2790.45,
      roi: 4.6
    }
  ]

  return (
    <main className="text-orange-50">
      <div className="flex flex-col md:flex-row">
        <SideMenu />
        <Container>
          <div className='flex flex-col'>
            {portifolios.map((item, index) => (
              <div key={item.id} className={index === 0 ? 'm-2' : 'mx-2 mb-2'}>
                <PortifolioItem {...item} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    </main>
  )
}

export default App