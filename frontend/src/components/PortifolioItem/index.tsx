import Image from "next/image"

export type PortifolioItemProps = {
  name: string
  image: string
  quantity: number
  price: number
  purchasePrice: number
  averagePrice: number
  roi: number
}

const PortifolioItem = ({
  name, image, quantity, price, purchasePrice, averagePrice, roi
}: PortifolioItemProps) => {
  return (
    <div className="grid-cols-6 h-20 md:h-15 bg-stone-900">
      <Image src='/images/bitcoin.svg' alt="Bitcoin Logo" />
    </div>
  )
}

export default PortifolioItem