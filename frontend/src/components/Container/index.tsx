import TopMenu from "../TopMenu"

const Container = ({ children }) => (
  <section>
    <div id="main" className="main-content rounded-tl-md flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
      {children}
    </div>
  </section>
)

export default Container
