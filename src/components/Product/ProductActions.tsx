import { FiShoppingCart } from "react-icons/fi";
import { HiMinusSm, HiOutlinePlusSm } from "react-icons/hi";

export function ProductActions() {
  return (
    <div className="bg-gray-700 p-2 w-full h-[full] rounded-[13px]">
      <div className="bg-gray-600 w-full h-full rounded-lg p-5">
        <h2 className="text-[22px] w-full">Adidas Yeezy Boost 350</h2>
        <p className="text-gray-200">79 vendidos</p>

        <div className="mt-5 flex items-start">
          <span className="flex items-center gap-1">
            <p className="text-[20px] md:text-2xl">R$</p>
            <p className="text-[20px] md:text-2xl">559</p>
          </span>
          <span className="text-green-500 text-[14px]">44% OFF</span>
        </div>

        <div className="mt-5 flex gap-1">
          <button className="bg-gray-900 rounded-lg flex items-center justify-center w-[40px] h-[35px]">
            <HiMinusSm size={20} />
          </button>
          <button className="bg-gray-900 rounded-lg flex items-center justify-center w-[40px]">
            <HiOutlinePlusSm size={20} />
          </button>
          <div className="bg-gray-900 rounded-lg flex items-center justify-center w-[40px]">
            1
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center flex-col gap-2">
          <button className="bg-red-500 w-full rounded py-2 px-4 transition-filter hover:brightness-75">
            Comprar
          </button>
          <button className="bg-yellow-500 w-full rounded py-2 px-4 transition-filter flex items-center justify-center hover:brightness-75">
            <FiShoppingCart size={25} />
          </button>
        </div>
      </div>
    </div>
  );
}
