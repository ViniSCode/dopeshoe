import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BiSolidOffer } from "react-icons/bi";

interface CardProductProps {
  id: string | undefined;
  name: string | undefined;
  price: number | any;
  discount: number | null | undefined;
  image: string | any;
  brand: string | undefined | undefined;
  key?: string | undefined;
}

export function SimilarProduct({
  id,
  name,
  price,
  discount,
  image,
  brand,
}: CardProductProps) {
  return (
    <Link href={`${id}`} passHref legacyBehavior>
      <a>
        <motion.div
          transition={{ duration: 0.2 }}
          className="px-4 py-4 w-full min-h-[220px] max-h-[220px] md:w-full md:min-h-[280px] md:max-h-[280px] md:max-w-[280px] mx-auto bg-[#F1F1F1] rounded-[13px] flex flex-col gap-1 cursor-pointer card-shadow"
        >
          <div className="w-full h-[200px] relative rounded-[9px] mx-auto flex items-center justify-center">
            <Image
              src={image}
              alt="product image"
              width={200}
              height={200}
              objectFit={"contain"}
              priority
              quality={10}
            />
          </div>
          <div>
            <div className="mt-2 max-w-full mx-auto">
              <p className="text-base md:text-xl w-full truncate max-w-full text-start mx-auto">
                <span className="mr-1">{brand}</span>
                {name}
              </p>
            </div>
            <div>
              <div className="mt-1 flex items-start md:gap-1 justify-start md:mt-1">
                <div className="flex items-center gap-1 font-bold">
                  <p className="text-[14px] md:text-lg">USD</p>

                  <p className="text-[14px] md:text-lg">{price / 100}</p>
                </div>
              </div>
              <div className="mt-1 text-black text-[12px] md:text-sm flex gap-3 flex-wrap sm:flex-nowrap items-center justify-start">
                <div className="flex font-medium items-center text-[#CE5875] gap-1">
                  <BiSolidOffer size={16} className="min-w-3 min-h-3" />
                  {discount}% OFF
                </div>{" "}
              </div>
            </div>
          </div>
        </motion.div>
      </a>
    </Link>
  );
}
