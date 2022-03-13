import '../styles/global.css'
import { SessionProvider } from 'next-auth/react'

function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}) {
  return (
    <SessionProvider session={session}>
      <div className="bg-gradient-to-r from-slate-900 to-slate-800">
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  )
}

export default MyApp
