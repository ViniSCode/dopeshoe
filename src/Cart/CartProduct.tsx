import Image from 'next/image';
import Link from 'next/link';
import { CgRemove } from "react-icons/cg";
import { useCart } from "../hooks/useCart";
import { ProductAmount } from "./ProductAmount";

interface CartProductProps {
  item: {
    id: string;
    name: string;
    price: number;
    available: number;
    discount?: number | null | undefined;
    image: { __typename?: "Image" | undefined; mainImage: { __typename?: "Asset" | undefined; url: string; }; productImages: { __typename?: "Asset" | undefined; url: string; }[]; }[]
    brand?: { 
      __typename?: "Brand" | undefined; brandName: string | null | undefined; 
    } | null | undefined;
    amount: number;
  }
  key: string;
}

export function CartProduct ({item}: CartProductProps) {
  const { handleSetIsCartOpen, isCartOpen, cart, handleRemoveProduct, handleUpdateAmount } = useCart();

  return (
    <div className='cursor-pointer relative bg-gray-600 p-2 border-lg w-full h-[80px] mx-auto rounded-lg flex items-center gap-2 last-of-type:mb-10' key={item.id}>
      <div className='absolute top-2 right-2' onClick={() => handleRemoveProduct(item)}>
        <CgRemove size={17} className='text-gray-400'/>
      </div>
      <div className='bg-gray-900 h-full w-full min-w-[70px] max-w-[70px] rounded-lg p-1'>
          <div className='relative h-full w-full inset-0'>
            <Image src={item.image[0].mainImage.url} alt="product image" layout='fill' objectFit={'contain'} priority={item.image[0].mainImage.url === "https://media.graphassets.com/i5RtvtrhRseDy345Wr8V"}/>
          </div>
      </div>
      <div className='overflow-hidden'>
        <Link href={`/${item.id}`}>
          <div className="overflow-hidden max-w-[130px] md:max-w-[200px]">
            <p className='text-[15px] w-full truncate max-w-full'>
              <span className='mr-1 font-bold'>{item.amount}x</span><span className='text-red-600 mr-1 font-bold'>{item.brand?.brandName}</span>{item.name}
            </p>
          </div>
        </Link>
        <div className=' flex items-start justify-start gap-2'>
          <span className='flex items-center gap-1'>
            <p className='text-[14px] md:text-1xl font-bold'>R$</p>
          </span>
          <p className='text-[14px] md:text-1xl font-bold'>{item.price}</p>
          <ProductAmount item={item}/>
        </div>
      </div>
    </div>
  )
}