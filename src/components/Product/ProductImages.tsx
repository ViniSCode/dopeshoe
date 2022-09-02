import { useEffect, useState } from "react";

interface ProductImagesProps {
  productImages: { __typename?: "Asset" | undefined; url: string }[] | any;
}

export function ProductImages({ productImages }: ProductImagesProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const [pulsing, setPulsing] = useState(true);

  useEffect(() => {
    if (productImages) {
      setTimeout(() => setImageLoading(false), 2000);
    }
  }, [productImages]);

  return (
    <div className="bg-gray-700 w-full h-full md:max-h-[350px] md:h-full p-2 lg:p-4 rounded-[13px]">
      <div
        className={`p-3 bg-gray-600 w-full h-full rounded-lg grid grid-cols-1 md:grid-cols-product-image lg:grid-cols-product-image-lg gap-2 ${
          imageLoading && "md:flex lg:flex"
        }`}
      >
        <div
          className={`w-full h-full bg-gray-900 rounded-lg p-2 lg:p-4 ${
            imageLoading && "animate-pulse flex items-center justify-center"
          }`}
        >
          <div className="md:w-full md:h-full md:relative">
            {!imageLoading ? (
              <img
                className="w-full h-full object-contain md:absolute md:inset-0"
                src={productImages[0].url}
              />
            ) : (
              <>
                <svg
                  className="w-[50px] h-[50px] mx-auto my-auto object-contain md:absolute md:inset-0 text-gray-200"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 640 512"
                >
                  <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                </svg>
              </>
            )}
          </div>
        </div>
        {!imageLoading && (
          <div className="mx-auto grid gap-2 grid-cols-4 md:grid-cols-1">
            <div className="bg-gray-900 rounded-lg p-2 ">
              <img
                className="w-full h-full object-contain"
                src={productImages[0].url}
                alt=""
              />
            </div>
            <div className="bg-gray-900 rounded-lg p-2">
              <img
                className="w-full h-full object-contain"
                src={productImages[1].url}
                alt=""
              />
            </div>
            <div className="bg-gray-900 rounded-lg p-2">
              <img
                className="w-full h-full object-contain"
                src={productImages[2].url}
                alt=""
              />
            </div>
            <div className="bg-gray-900 rounded-lg p-2">
              <img
                className="w-full h-full object-contain"
                src={productImages[3].url}
                alt=""
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
