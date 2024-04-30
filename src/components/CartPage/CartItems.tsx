import Link from "next/link";
import { toast } from "react-toastify";
import { SelectQuantity } from "../Radix/SelectQuantity";

interface CartItemsProps {
  cart: any;
  handleUpdateAmount: any;
  handleRemoveProduct: any;
}

export function CartItems({
  cart,
  handleUpdateAmount,
  handleRemoveProduct,
}: CartItemsProps) {
  return (
    <div className="select-none grid grid-cols-1 w-full h-full gap-2">
      {cart.length > 0 &&
        cart.map((item: any) => {
          return (
            <div
              className="cursor-pointer relative border-lg w-full h-fit mx-auto flex items-center justify-between border-b pb-2 border-[#c8c8c9]"
              key={item.id}
            >
              <div className="h-full w-full flex items-start gap-2">
                <div className="h-full w-full min-w-[70px] max-w-[100px]">
                  <Link href={`/${item.id}`}>
                    <div className="relative h-full w-full inset-0 hover:brightness-90 transition-filter">
                      <img
                        src={item.image[0].mainImage.url}
                        alt="product image"
                        className=" w-full h-auto rounded-sm"
                      />
                    </div>
                  </Link>
                </div>
                <div className="overflow-hidden flex flex-col gap-1 w-full">
                  <div className="flex items-start gap-2">
                    <div className="overflow-hidden flex items-start gap-4">
                      <div className="text-base">
                        <p className="block font-medium">
                          {item.brand?.brandName}
                        </p>
                        <p className="block font-medium">{item.name}</p>
                        <div className="flex gap-2 ml-auto xsm:hidden">
                          <span className="flex items-center gap-1">
                            <p className="text-base md:text-1xl font-medium">
                              $
                            </p>
                          </span>
                          <p className="text-[16px] md:text-1xl font-medium">
                            {(item.price / 100).toFixed(2)}
                          </p>
                          <span className="font-medium text-green-500">
                            {item.discount}% off
                          </span>
                        </div>
                        <div className="flex items-center gap-1 font-medium">
                          <p className="mr-1 text-[#707072]">Quantity</p>
                          <SelectQuantity
                            handleUpdateAmount={handleUpdateAmount}
                            defaultQuantity={item.amount}
                            item={item}
                          />
                        </div>
                        <div
                          className="flex items-center gap-2 text-[#707072] hover:brightness-75 transition-filter"
                          onClick={() => {
                            toast.success("Produto Removido do carrinho");
                            handleRemoveProduct(item);
                          }}
                        >
                          <span className="mt-2 font-medium text-base hover:underline">
                            Remove Product
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="hidden ml-auto xsm:flex flex-col items-end">
                      <div className="flex items-center gap-1">
                        <span className="flex items-center gap-1">
                          <p className="text-base md:text-1xl font-medium">$</p>
                        </span>
                        <p className="text-[16px] md:text-1xl font-medium">
                          {(item.price / 100).toFixed(2)}
                        </p>
                      </div>
                      <span className="font-medium text-green-500">
                        {item.discount}% off
                      </span>
                    </div>
                  </div>
                  <div className=" flex items-start justify-start gap-2"></div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
