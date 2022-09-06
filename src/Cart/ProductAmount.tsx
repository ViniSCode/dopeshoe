import { HiMinusSm, HiOutlinePlusSm } from "react-icons/hi";
import { useCart } from "../hooks/useCart";

interface ProductAmountProps {
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
}

export function ProductAmount ({item}: ProductAmountProps) {
  const {handleUpdateAmount } = useCart();

  return (
    <div>
    <div className="flex gap-1">
      <button disabled={item.amount === 1} className="bg-gray-900 rounded-md flex items-center justify-center w-[30px] h-[25px] disabled:opacity-80" onClick={() => {
        if (item.amount > 1) {
          handleUpdateAmount(item, item.amount - 1, "decrease")
        }
      }}>
        <HiMinusSm size={18} />
      </button>
      <button disabled={item.available === item.amount} className="bg-gray-900 rounded-lg flex items-center justify-center w-[30px] disabled:opacity-80" onClick={() => {
        if (item.available > item.amount) {
          handleUpdateAmount(item, item.amount + 1, "increase")
        }
      }}>
        <HiOutlinePlusSm size={18} />
      </button>
    </div>
  </div>
  );
}