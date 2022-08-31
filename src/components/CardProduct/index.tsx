import Link from "next/link";

interface CardProductProps {
    id: string;
    name: string;
    price: number;
    dicount?: number;
    sales?: number;
    description: string;
    image: string;
    brand: string;
    key?: string;
}

export function CardProduct ({id, name, price, dicount, sales, description, image, brand, key}: CardProductProps) {   
  return (
    <Link href={`product/${id}`}>
      <div className='px-2 py-3 w-full h-[250px] md:w-full md:h-[360px] md:max-w-[280px] mx-auto bg-gray-700 rounded-[13px] md:px-4 md:py-4 flex flex-col gap-1 cursor-pointer shadow-lg hover:shadow-none transition-shadow'>
        <div className='w-full h-[200px] rounded-[9px] mx-auto bg-gray-600'>
            <img className="w-full h-full object-contain rounded-[9px]" src={image} />
        </div>
        <div>
          <div className="max-w-full mx-auto">
            <p className='text-[18px] w-full truncate max-w-full mx-auto mt-2 md:mt-5 md:text-[25px]'>
              <span className='text-red-600 mr-1'>{brand}</span>{name}
            </p>
          </div>
          <div>
            <div className='mt-1 flex items-start md:gap-1 justify-center md:mt-2'>
              <span className='flex items-center gap-1'>
                <p className='text-[18px] md:text-2xl'>R$</p>
                <p className='text-[18px] md:text-2xl'>{price}</p>
              </span>
              <span className='text-green-500 text-[14px]'>{dicount}% OFF</span>
            </div>
            <p className="mt-2 text-center text-gray-200 md:mt-3 text-[14px]">em 12x R$15,42</p>
          </div>
        </div>
      </div>
    </Link>
  )
}