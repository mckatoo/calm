const Container = ({ children }) => (
  <section>
    <div id="main"
      className="main-content 
        rounded-md 
        flex-1 
        bg-gray-100 
        mt-16
        md:ml-36
        ">
      {children}
    </div>
  </section>
)

export default Container
