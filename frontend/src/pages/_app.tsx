import { SessionProvider } from 'next-auth/react'
import { BalanceProvider } from '../hooks/use-balance'
import '../styles/global.css'

function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}) {
  return (
    <SessionProvider session={session}>
      <BalanceProvider>
        <div className="bg-gradient-to-r from-slate-900 to-slate-800">
          <Component {...pageProps} />
        </div>
      </BalanceProvider>
    </SessionProvider>
  )
}

export default MyApp
