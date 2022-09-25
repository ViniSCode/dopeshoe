import Image from "next/image";

interface OrderProps {
  order: {
    __typename?: "Order";
    orderId: string;
    name: string;
    amount: number;
    price: number;
    createdAt: any;
    image?: {
      __typename?: "Image";
      id: string;
      mainImage: { __typename?: "Asset"; url: string };
    } | null;
  };
}

export function Order({ order }: OrderProps) {
  return (
    <div className="cursor-pointer relative bg-gray-600 p-2 border-lg w-full h-[80px] mx-auto rounded-lg flex items-center gap-2 last-of-type:mb-10">
      <div className="absolute top-2 right-2"></div>
      <div className="bg-gray-900 h-full w-full min-w-[70px] max-w-[70px] rounded-lg p-1">
        <div className="relative h-full w-full inset-0">
          <Image
            src={order!.image!.mainImage.url}
            alt="product image"
            layout="fill"
            objectFit={"contain"}
          />
        </div>
      </div>
      <div className="overflow-hidden">
        <div className="overflow-hidden max-w-[130px] md:max-w-[200px]">
          <p className="text-[18px] w-full truncate max-w-full">
            <span className="font-bold">{order.amount}x </span>
            <span>{order.name}</span>
          </p>
        </div>
        <div className=" flex items-start justify-start gap-2">
          <span className="flex items-center gap-1">
            <p className="text-[16px] md:text-1xl font-bold">R$</p>
          </span>
          <p className="text-[16px] md:text-1xl font-bold">
            {order.price / 100}
          </p>
          <div></div>
        </div>
      </div>
    </div>
  );
}