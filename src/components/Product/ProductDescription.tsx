interface ProductDescriptionProps {
  productDescription: string | undefined;
}

export function ProductDescription ({productDescription}: ProductDescriptionProps) {
  return (
    <div>
      <h2 className="text-2xl underline text-gray-350 font-bold">Descrição</h2>
      <p className="text-justify mt-6 text-gray-200">
        {productDescription &&  productDescription}
      </p>
    </div>
  );
}