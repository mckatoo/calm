import Link from "next/link"
import Logo from "../Logo"

const SideMenu = () =>
  <menu aria-label="Side Menu" className="hidden md:block p-4 text-left">
    <div className="flex justify-center">
      <Logo size="normal" />
    </div>
    <div className="pt-4 px-4 text-lg">
      <ul className="list-reset">
        <li className="py-2">
          <Link href="/">
            <a>
              <span className="underline">Portifólio</span>
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