import Image from "next/image";
import Link from "next/link";
import { FiTrash } from "react-icons/fi";
import { HiMinusSm, HiOutlinePlusSm } from "react-icons/hi";

export function CartProducts({
  item,
  handleRemoveProduct,
  handleUpdateAmount,
}: any) {
  return (
    <div
      className="cursor-pointer relative bg-white border-b border-[#707072] p-2 border-lg w-full h-[80px] mx-auto flex items-center gap-2 last-of-type:mb-10"
      key={item.id}
    >
      <div
        className="absolute top-2 right-2"
        onClick={() => handleRemoveProduct(item)}
      >
        <FiTrash size={17} className="text-black" />
      </div>
      <div className="h-full w-full min-w-[70px] max-w-[70px] rounded-lg p-1">
        <div className="relative h-full w-full inset-0">
          <Image
            src={item.image[0].mainImage.url}
            alt="product image"
            layout="fill"
            quality={2}
            objectFit={"contain"}
            priority={
              item.image[0].mainImage.url ===
              "https://media.graphassets.com/i5RtvtrhRseDy345Wr8V"
            }
          />
        </div>
      </div>
      <div className="overflow-hidden pr-5 sm:p-0.5">
        <Link href={`/${item.id}`}>
          <div className="overflow-hidden max-w-[130px] md:max-w-[200px] text-black">
            <p className="text-[15px] w-full truncate max-w-full">
              <span className="mr-1 font-bold">{item.amount}x</span>
              <span className="text-black mr-1 font-bold">
                {item.brand?.brandName}
              </span>
              {item.name}
            </p>
          </div>
        </Link>
        <div className=" flex items-start justify-start gap-2 text-black">
          <span className="flex items-center gap-1">
            <p className="text-[14px] md:text-1xl font-bold">$</p>
          </span>
          <p className="text-[14px] md:text-1xl font-bold">
            {item.price / 100}
          </p>
          <div>
            <div className="sm:flex gap-1 hidden">
              <button
                disabled={item.amount === 1}
                className="border border-black indent-[-9999em] uppercase bg-white text-black rounded flex items-center justify-center w-[30px] h-[25px] disabled:opacity-10"
                onClick={() => {
                  if (item.amount > 1) {
                    handleUpdateAmount(item, item.amount - 1, "decrease");
                  }
                }}
              >
                Decrease
                <HiMinusSm size={18} />
              </button>
              <button
                disabled={item.available === item.amount}
                className="border border-black indent-[-9999em] uppercase bg-white text-black rounded flex items-center justify-center w-[30px] disabled:opacity-10"
                onClick={() => {
                  if (item.available > item.amount) {
                    handleUpdateAmount(item, item.amount + 1, "increase");
                  }
                }}
              >
                <HiOutlinePlusSm size={18} />
                Increase
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
