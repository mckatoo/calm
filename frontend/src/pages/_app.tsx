import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-800">
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
