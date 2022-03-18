import TopMenu from "../TopMenu"

const Container = ({ children }) => <>
  <TopMenu />
  <div>
    {children}
  </div>
</>

export default Container