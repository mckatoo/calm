import { useSession } from "next-auth/react"
import { createContext, useContext, useEffect, useState } from "react"

export type SyncContextData = {
  isFailSync: boolean
  sync: () => void
  loading: boolean
}

export const SyncContext = createContext<SyncContextData>({
  isFailSync: false,
  sync: () => null,
  loading: false
})

export type SyncProviderProps = {
  children: React.ReactNode
}

const SyncProvider = ({ children }: SyncProviderProps) => {
  const [isFailSync, setIsFailSync] = useState(false)
  const [loading, setLoading] = useState(false)
  const { data: session } = useSession()

  const sync = async () => {
    setLoading(true)
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/exchanges/binance/sync`,
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

  return <SyncContext.Provider value={{
    isFailSync,
    sync,
    loading
  }}>{children}</SyncContext.Provider>

}

const useSync = () => useContext(SyncContext)

export { SyncProvider, useSync }
