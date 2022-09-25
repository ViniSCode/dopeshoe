import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface ProductImagesProps {
  productImages: { __typename?: "Asset" | undefined; url: string }[] | any;
  mainImage: string | any;
}

export function ProductImages({
  productImages,
  mainImage,
}: ProductImagesProps) {
  const [displayImage, setDisplayImage] = useState(mainImage);

  return (
    <div className="bg-gray-700 select-none w-full h-full md:max-h-[350px] md:h-full p-2 lg:p-4 rounded-[13px]">
      {productImages && mainImage ? (
        <div className="p-3 bg-gray-600 relative w-full h-full rounded-lg grid grid-cols-1 md:grid-cols-product-image lg:grid-cols-product-image-lg gap-2">
          <div className="w-full h-[300px] md:h-[full] bg-gray-900 rounded-lg p-4 md:p-4 lg:p-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={displayImage}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full relative md:w-full md:h-full md:relative"
              >
                <Image
                  src={displayImage}
                  alt="product image"
                  layout="fill"
                  objectFit={"contain"}
                  className="pointer-events-none"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mx-auto w-full h-[80px] md:h-full grid gap-2 grid-cols-4 md:grid-cols-1">
            {productImages.map((image: any) => {
              return (
                <motion.div
                  key={image.url}
                  whileHover={{ scale: 1.05 }}
                  className={`md:w-full md:h-full bg-gray-900 rounded-lg cursor-pointer p-2 ${
                    displayImage === image.url && "opacity-[77%] bg-gray-700"
                  }`}
                  onClick={() => setDisplayImage(image.url)}
                >
                  <div className="w-full h-full relative">
                    <Image
                      src={image.url}
                      alt="product image"
                      layout="fill"
                      objectFit={"contain"}
                      className="pointer-events-none"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ) : (
        <div
          className={`p-3 bg-gray-600 relative w-full h-full rounded-lg grid grid-cols-1 md:grid-cols-product-image lg:grid-cols-product-image-lg gap-2 ${
            !productImages && "h-[400px] md:h-full lg:h-full"
          }`}
        >
          <div className="w-full absolute h-full inset-0 bg-gray-900 rounded-lg p-4 md:p-4 lg:p-4 animate-pulse">
            <div className="w-full h-full relative md:w-full md:h-full md:relative flex items-center justify-center animate-pulse">
              <svg
                className="w-[80] h-[80px] text-gray-200 animate-pulse"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 640 512"
              >
                <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
