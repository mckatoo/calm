import Image from "next/image"
import { formatPrice } from "../../lib/format"

export type PortifolioItemProps = {
  id?: string
  name: string
  image?: string
  amount: number
  price: number
  averagePrice: number
  roi: number
}

const PortifolioItem = ({
  name, image, amount, price, averagePrice, roi
}: PortifolioItemProps) => {
  return (
    <div className="flex bg-stone-900 gap-4 p-4 rounded-md">
      <div className="text-center">
        <h3>{name}</h3>
        <div className={`
        bg-orange-50
        p-1
        rounded-md
        grid
        items-center
      `}>
          <Image
            src={image || '/images/not-found.webp'}
            alt={`${name} Logo`}
            width="48"
            height="48"
          />
        </div>
      </div>
      <div className="grid grid-cols-4 w-full items-center sd:gap-4">
        <div className="text-center flex flex-col justify-around min-w-fit">
          <h4 className="bg-slate-700 h-14 sm:h-fit flex items-center justify-center rounded-tl-md">Quantidade</h4>
          {amount}
        </div>
        <div className="text-center flex flex-col justify-around min-w-fit">
          <h4 className="bg-slate-700 h-14 sm:h-fit flex items-center justify-center">Preço Médio</h4>
          {`${formatPrice(averagePrice)}`}
        </div>
        <div className="text-center flex flex-col justify-around min-w-fit">
          <h4 className="bg-slate-700 h-14 sm:h-fit flex items-center justify-center">Preço Atual</h4>
          {`${formatPrice(price)}`}
        </div>
        <div className="text-center flex flex-col justify-around min-w-fit">
          <h4 className="bg-slate-700 h-14 sm:h-fit flex items-center justify-center rounded-tr-md">Roi</h4>
          {`${roi}%`}
        </div>
      </div>
    </div>
  )
}

export default PortifolioItem
