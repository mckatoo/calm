import Link from "next/link"
import Logo from "../Logo"

const SideMenu = () =>
  <menu aria-label="Side Menu" className="
  hidden
  md:block
  px-4
  py-2
  text-left
  fixed
  w-fit
  bg-slate-900
  z-20
  h-full
  ">
    <div className="z-30 flex justify-center">
      <Logo aria-label="Logotipo" size="normal" />
    </div>
    <div className="pt-4 px-4 text-lg">
      <ul className="list-reset">
        <li className="py-2">
          <Link href="/">
            <a>
              <span>Portifólio</span>
            </a>
          </Link>
        </li>
        <li className="py-2">
          <Link href="/app/orders">
            <a>
              <span>Ordens</span>
            </a>
          </Link>
        </li>
        <li className="py-2">
          <Link href="/">
            <a>
              <span className="">Gráficos</span>
            </a>
          </Link>
        </li>
      </ul>
    </div>
  </menu>

export default SideMenu