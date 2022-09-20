import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface CardProductProps {
  id: string;
  name: string;
  price: number;
  discount?: number | null | undefined;
  image: {
    __typename?: "Image" | undefined;
    mainImage: { __typename?: "Asset" | undefined; url: string };
    productImages: { __typename?: "Asset" | undefined; url: string }[];
  }[];
  brand:
    | {
        __typename?: "Brand" | undefined;
        brandName: string | null | undefined;
      }
    | null
    | undefined;
}

export function CardProduct({
  id,
  name,
  price,
  discount,
  image,
  brand,
}: CardProductProps) {
  return (
    <Link href={`${id}`} passHref>
      <a>
        <motion.div
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="px-2 py-3 w-full h-[250px] md:w-full md:h-[360px] md:max-w-[280px] mx-auto bg-gray-700 rounded-[13px] md:px-4 md:py-4 flex flex-col gap-1 cursor-pointer shadow-lg hover:shadow-none transition-shadow"
        >
          <div className="w-full h-[200px] relative rounded-[9px] mx-auto bg-gray-600 flex items-center justify-center">
            <Image
              src={image[0].mainImage.url}
              alt="product image"
              layout="fill"
              objectFit={"contain"}
              priority={
                image[0].mainImage.url ===
                "https://media.graphassets.com/i5RtvtrhRseDy345Wr8V" ||
                image[0].mainImage.url === "https://media.graphassets.com/FyRdhk3vSruYu7UlYwn6"
              }
            />
          </div>
          <div>
            <div className="max-w-full mx-auto">
              <p className="text-[18px] w-full truncate max-w-full  text-center mx-auto mt-2 md:mt-5 md:text-[25px]">
                <span className="text-red-600 mr-1">{brand?.brandName}</span>
                {name}
              </p>
            </div>
            <div>
              <div className="mt-1 flex items-start md:gap-1 justify-center md:mt-2">
                <span className="flex items-center gap-1">
                  <p className="text-[18px] md:text-2xl">R$</p>

                  <p className="text-[18px] md:text-2xl">{price / 100}</p>
                </span>
                <span className="text-green-500 text-[14px]">
                  {discount}% OFF
                </span>
              </div>
              <p className="mt-2 text-center text-gray-200 md:mt-3 text-[14px]">
                em 12x R${(price / 100 / 12).toFixed(2)}
              </p>
            </div>
          </div>
        </motion.div>
      </a>
    </Link>
  );
}
