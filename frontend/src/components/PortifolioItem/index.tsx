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
      <div className="grid grid-cols-4 w-full sd:w-96 items-center sd:gap-4">
        <div className="text-center justify-around">
          <h4 className="bg-slate-700 py-1 rounded-tl-md">Quantidade</h4>
          <div className="py-1">
            {amount.toFixed(8)}
          </div>
        </div>
        <div className="text-center justify-around">
          <h4 className="bg-slate-700 py-1 sm:h-fit">Preço Médio</h4>
          <div className="py-1">
            {`${formatPrice(averagePrice)}`}
          </div>
        </div>
        <div className="text-center justify-around">
          <h4 className="bg-slate-700 py-1 sm:h-fit">Preço Atual</h4>
          <div className="py-1">
            {`${formatPrice(price)}`}
          </div>
        </div>
        <div className="text-center justify-around">
          <h4 className="bg-slate-700 py-1 sm:h-fit rounded-tr-md">Roi</h4>
          <div className={`${roi < 0 ? 'bg-red-700' : 'bg-green-700'} py-1 rounded-br-md`}>
            {`${roi}%`}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortifolioItem
