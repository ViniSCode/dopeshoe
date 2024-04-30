interface ProductDescriptionProps {
  productDescription: string | undefined;
}

export function ProductDescription({
  productDescription,
}: ProductDescriptionProps) {
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-medium text-black">Details</h2>
      <p className="text-sm md:text-base text-justify font-medium mt-9 text-[#717171]">
        {productDescription && productDescription}
      </p>
    </div>
  );
}
