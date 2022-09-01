interface ProductImagesProps {
  productImages: { __typename?: "Asset" | undefined; url: string; }[] | any
}

export function ProductImages ({productImages}: ProductImagesProps) {
  return productImages && ( 
    <div className="bg-gray-700 w-full h-[full] md:h-full p-2 lg:p-4 rounded-[13px]">
      <div className="p-3 bg-gray-600 w-full h-full rounded-lg grid grid-cols-1 md:grid-cols-product-image lg:grid-cols-product-image-lg gap-2">
        <div className="w-full bg-gray-900 rounded-lg p-2">
          <img className="w-full h-full object-contain" src={productImages[0].url} alt="" />
        </div>
        <div className="mx-auto grid gap-2 grid-cols-4 md:grid-cols-1">
          <div className="bg-gray-900 rounded-lg p-2">
            <img className='w-full h-full object-contain' src={productImages[0].url} alt="" />
          </div>
          <div className="bg-gray-900 rounded-lg p-2">
            <img className='w-full h-full object-contain' src={productImages[1].url} alt="" />
          </div>
          <div className="bg-gray-900 rounded-lg p-2">
            <img className='w-full h-full object-contain' src={productImages[2].url} alt="" />
          </div>
          <div className="bg-gray-900 rounded-lg p-2">
            <img className='w-full h-full object-contain' src={productImages[3].url} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}