import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";

interface Asset {
  __typename?: "Asset";
  url: string;
}

interface ImageProps {
  __typename?: "Image";
  mainImage: Asset;
  productImages: Asset[];
  thumb?: Asset | null | undefined;
}

interface CardProductProps {
  id: string;
  name: string;
  price: number;
  discount?: number | null | undefined;
  available: number | any;
  image: {
    __typename?: "Image";
    thumb?: Asset | null | undefined;
  }[];
  brand:
    | {
        __typename?: "Brand";
        brandName: string | null | undefined;
      }
    | null
    | undefined;
}

export function ShoeThumbCard({
  id,
  name,
  price,
  discount,
  image,
  brand,
  available,
}: CardProductProps) {
  const router = useRouter();

  const thumb = image[0]?.thumb?.url
    ? image[0].thumb.url
    : "https://media.graphassets.com/xUiufZkGTKu8RJFwZV57";

  return (
    <div
      onClick={() => router.push(`${id}`)}
      className="hover:brightness-[.97] transition-filter "
    >
      <motion.div
        transition={{ duration: 0.2 }}
        className="mx-auto cursor-pointer w-[280px] h-[280px] md:w-[340px] md:h-[340px]  lg:w-[360px] lg:h-[360px]"
      >
        <div className="w-full h-full relative mx-auto flex items-center justify-center">
          <Image
            src={thumb}
            className="w-full h-full pointer-events-none"
            alt="product image"
            width={500}
            height={500}
            objectFit="contain"
            priority
            quality={100}
          />
        </div>
      </motion.div>
    </div>
  );
}
