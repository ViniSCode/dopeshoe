import Image from "next/image";
import Link from "next/link";
import { CgRemove } from "react-icons/cg";
import { HiMinusSm, HiOutlinePlusSm } from "react-icons/hi";

export function CartProducts({
  item,
  handleRemoveProduct,
  handleUpdateAmount,
}: any) {
  return (
    <div
      className="cursor-pointer relative bg-gray-600 p-2 border-lg w-full h-[80px] mx-auto rounded-lg flex items-center gap-2 last-of-type:mb-10"
      key={item.id}
    >
      <div
        className="absolute top-2 right-2"
        onClick={() => handleRemoveProduct(item)}
      >
        <CgRemove size={17} className="text-gray-400" />
      </div>
      <div className="bg-gray-900 h-full w-full min-w-[70px] max-w-[70px] rounded-lg p-1">
        <div className="relative h-full w-full inset-0">
          <Image
            src={item.image[0].mainImage.url}
            alt="product image"
            layout="fill"
            objectFit={"contain"}
            priority={
              item.image[0].mainImage.url ===
              "https://media.graphassets.com/i5RtvtrhRseDy345Wr8V"
            }
          />
        </div>
      </div>
      <div className="overflow-hidden">
        <Link href={`/${item.id}`}>
          <div className="overflow-hidden max-w-[130px] md:max-w-[200px]">
            <p className="text-[15px] w-full truncate max-w-full">
              <span className="mr-1 font-bold">{item.amount}x</span>
              <span className="text-red-600 mr-1 font-bold">
                {item.brand?.brandName}
              </span>
              {item.name}
            </p>
          </div>
        </Link>
        <div className=" flex items-start justify-start gap-2">
          <span className="flex items-center gap-1">
            <p className="text-[14px] md:text-1xl font-bold">R$</p>
          </span>
          <p className="text-[14px] md:text-1xl font-bold">
            {item.price / 100}
          </p>
          <div>
            <div className="flex gap-1">
              <button
                disabled={item.amount === 1}
                className="bg-gray-900 rounded-md flex items-center justify-center w-[30px] h-[25px] disabled:opacity-80"
                onClick={() => {
                  if (item.amount > 1) {
                    handleUpdateAmount(item, item.amount - 1, "decrease");
                  }
                }}
              >
                <HiMinusSm size={18} />
              </button>
              <button
                disabled={item.available === item.amount}
                className="bg-gray-900 rounded-lg flex items-center justify-center w-[30px] disabled:opacity-80"
                onClick={() => {
                  if (item.available > item.amount) {
                    handleUpdateAmount(item, item.amount + 1, "increase");
                  }
                }}
              >
                <HiOutlinePlusSm size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
