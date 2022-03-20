import Image from "next/image"

export type PortifolioItemProps = {
  name: string
  image: string
  quantity: number
  price: number
  averagePrice: number
  roi: number
}

const PortifolioItem = ({
  name, image, quantity, price, averagePrice, roi
}: PortifolioItemProps) => {
  return (
    <div className="flex bg-stone-900 gap-4 p-4 rounded-md">
      <div className={`
        bg-orange-50
        p-1
        rounded-md
        grid
        items-center
      `}>
        <Image
          src={image}
          alt={`${name} Logo`}
          width="48"
          height="48"
        />
      </div>
      <div className="grid grid-cols-3 w-full items-center gap-4">
        <div className="text-center">
          <h4 className="bg-slate-700">Quantidade</h4>
          {quantity}
        </div>
        <div className="text-center">
          <h4 className="bg-slate-700">Preço Médio.</h4>
          {`$${averagePrice}`}
        </div>
        <div className="text-center">
          <h4 className="bg-slate-700">Roi</h4>
          {`${roi}%`}
        </div>
      </div>
    </div>
  )
}

export default PortifolioItem