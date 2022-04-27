import { useSession } from "next-auth/react"
import { createContext, useContext, useEffect, useState } from "react"

export type BalanceContextData = {
  isFailSync: boolean
  sync: () => void
  loading: boolean
}

export const BalanceContext = createContext<BalanceContextData>({
  isFailSync: false,
  sync: () => null,
  loading: false
})

export type BalanceProviderProps = {
  children: React.ReactNode
}

const BalanceProvider = ({ children }: BalanceProviderProps) => {
  const [isFailSync, setIsFailSync] = useState(false)
  const [loading, setLoading] = useState(false)
  const { data: session } = useSession()

  const sync = async () => {
    setLoading(true)
    const response = await fetch(
      "http://localhost:3000/api/exchanges/binance/sync",
      {
        method: "POST",
        body: JSON.stringify({ email: session.user['email'] }),
        headers: {
          "Content-Type": "application/json"
        }
      })

    setIsFailSync(!response.ok)
    setLoading(false)
  }

  useEffect(() => {
    setIsFailSync(false)
  }, [])

  return <BalanceContext.Provider value={{
    isFailSync,
    sync,
    loading
  }}>{children}</BalanceContext.Provider>

}

const useBalance = () => useContext(BalanceContext)

export { BalanceProvider, useBalance }
