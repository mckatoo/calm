const Container = ({ children }) => (
  <section>
    <div id="main"
      className="main-content 
        rounded-md 
        mx-2
        flex-1 
        bg-gray-100 
        pb-24
        md:pb-5"
    >
      {children}
    </div>
  </section>
)

export default Container
