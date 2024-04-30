interface OrderProps {
  order: {
    __typename?: "Order";
    orderId: string;
    amount: number;
    price: number;
    createdAt: any;
    isMoreThanOneProduct?: boolean | null | any;
    product?: {
      __typename?: "Product";
      id: string;
      name: string;
      brand?: {
        __typename?: "Brand";
        brandName: string;
      } | null;
      image: Array<{
        __typename?: "Image";
        mainImage: { __typename?: "Asset"; url: string };
      }>;
    } | null;
  };
}

export function AllOrders({ order }: OrderProps) {
  const formattedDate = new Date(order.createdAt).toLocaleDateString("pt-BR");

  return (
    <div className="cursor-pointer relative border-b border-b-[#dbdbdb] p-2 border-lg w-full h-fit mx-auto flex items-center gap-2 last-of-type:mb-10">
      <div className="h-auto w-[90px] rounded-lg">
        <img
          src={order!.product!.image[0].mainImage.url}
          alt="product image"
          className=""
        />
      </div>
      <div className="overflow-hidden">
        <div className="overflow-hidden max-w-[100%] md:max-w-[100%] lg:max-w-full">
          <p className="text-[18px] w-full truncate max-w-full font-medium">
            {order.product?.brand?.brandName}
          </p>
          <p className="text-[18px] w-full truncate max-w-full font-medium">
            {`${order.isMoreThanOneProduct ? "" : `${order.amount}x`}`}{" "}
            {order.product?.name}{" "}
            {order.isMoreThanOneProduct && `(+ ${order.amount - 1} products)`}
          </p>
        </div>
        <div className="gap-1 font-medium md:hidden text-black">
          <span>$</span>
          {order.price / 100}
        </div>
        <div className=" flex items-start justify-start gap-2">
          <p className="text-[15px] md:text-1xl font-medium text-[#707072]">
            {formattedDate}
          </p>
        </div>
      </div>

      <div className="hidden gap-1 font-medium md:ml-auto md:flex text-black">
        <span>$ </span>
        {order.price / 100}
      </div>
    </div>
  );
}
