import Link from "next/link";

export function ShoeCard({ product }: any) {
  return (
    <Link key={product.node.id} href={`/${product.node.id}`}>
      <div>
        <img
          src={product.node.image[0].mainImage.url}
          alt={product.node.name}
          className="rounded-md"
        />
        <div className="mt-4">
          <p className="text-[#9E3500] font-medium">
            {product.node.brand?.brandName}
          </p>
          <p className="font-medium">{product.node.name}</p>
          <p className="font-medium text-[#707072]">
            {product.node.available} Available
          </p>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="flex items-center gap-1">
                <p className="text-base md:text-1xl font-medium">$</p>
              </span>
              <p className="text-[16px] md:text-1xl font-medium">
                {(product.node.price / 100).toFixed(2)}
              </p>
            </div>
            <span className="font-medium text-green-500">
              {product.node.discount}% off
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
