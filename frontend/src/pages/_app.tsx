import { SessionProvider } from 'next-auth/react'
import { SyncProvider } from '../hooks/use-sync'
import '../styles/global.css'

function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}) {
  return (
    <SessionProvider session={session}>
      <SyncProvider>
        <div className="bg-gradient-to-r from-slate-900 to-slate-800">
          <Component {...pageProps} />
        </div>
      </SyncProvider>
    </SessionProvider>
  )
}

export default MyApp
