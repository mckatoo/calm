import { SessionProvider } from 'next-auth/react'
import Adsense from '../components/Adsense'
import Analytics from '../components/Analytics'
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
      <Analytics />
      {process.env.NEXT_PUB_ADSENSE && <Adsense />}
    </SessionProvider>
  )
}

export default MyApp
