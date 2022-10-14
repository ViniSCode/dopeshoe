import Image from "next/image";

interface OrderProps {
  order: {
    __typename?: 'Order', 
    orderId: string, 
    amount: number, 
    price: number, 
    createdAt: any, 
    isMoreThanOneProduct?: boolean | null | any;
    product?: { 
      __typename?: 'Product', 
      id: string, 
      name: string, 
      brand?: { 
        __typename?: 'Brand', 
        brandName: string 
      } | null, 
      image: Array<{ __typename?: 'Image', mainImage: { __typename?: 'Asset', url: string } }> 
    } | null 
  };
}

export function AllOrders({ order }: OrderProps) {
  const formattedDate = new Date(order.createdAt).toLocaleDateString("pt-BR");

  return (
    <div className="cursor-pointer relative border-b-2 border-b-gray-700 p-2 border-lg w-full h-[100px] mx-auto rounded-lg flex items-center gap-2 last-of-type:mb-10">
      <div className="absolute top-2 right-2"></div>
      <div className="bg-gray-900 h-full w-full min-w-[75px] max-w-[75px] md:min-w-[100px] md:max-w-[100px] rounded-lg p-1">
        <div className="relative h-full w-full inset-0">
          <Image
            src={order!.product!.image[0].mainImage.url}
            alt="product image"
            layout="fill"
            objectFit={"contain"}
          />
        </div>
      </div>
      <div className="overflow-hidden">
        <div className="overflow-hidden max-w-[100%] md:max-w-[100%] lg:max-w-full">
          <p className="text-[18px] w-full truncate max-w-full font-medium">
            <span>{`${order.isMoreThanOneProduct ? '' : `${order.amount}x`}`} </span>
            <span>{order.isMoreThanOneProduct ? `${order.product?.name} + ${order.amount - 1} products` : order.product!.brand!.brandName}</span>
            {!order.isMoreThanOneProduct && <span>{order.product!.name}</span>}
          </p>
        </div>
        <div className="gap-1 font-bold md:hidden text-gray-100">
          <span>R$ </span>
          {order.price / 100}
        </div>
        <div className=" flex items-start justify-start gap-2">
          <p className="text-[15px] md:text-1xl font-bold text-gray-500">
            {formattedDate}
          </p>
        </div>
      </div>

      <div className="hidden gap-1 font-bold md:ml-auto md:flex text-gray-100">
        <span>R$ </span>
        {order.price / 100}
      </div>
    </div>
  );
}
