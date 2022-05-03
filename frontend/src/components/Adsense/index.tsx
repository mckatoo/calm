const Adsense = () => (
  <>
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUB_ADSENSE}`}
      crossOrigin="anonymous"
    />
  </>
)

export default Adsense