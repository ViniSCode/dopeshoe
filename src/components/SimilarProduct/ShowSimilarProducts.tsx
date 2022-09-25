import { SimilarProduct } from ".";
import { GetProductQuery } from "../../generated/graphql";

interface ShowSimilarProductsProps {
  data: GetProductQuery | undefined;
}

export function ShowSimilarProducts({ data }: ShowSimilarProductsProps) {
  return (
    <div>
      <h2 className="text-2xl underline text-gray-350 font-bold mb-6">
        Similar
      </h2>
      {data && (
        <div className="grid grid-cols-2 gap-4 md:block">
          <div className="md:hidden">
            <SimilarProduct
              id={data?.similar.edges[0].node.id}
              name={data?.similar.edges[0].node.name}
              price={data?.similar.edges[0].node.price}
              discount={data?.similar.edges[0].node.discount}
              image={data?.similar.edges[0].node.image[0].mainImage.url}
              brand={data?.similar.edges[0].node.brand?.brandName}
              key={data?.similar.edges[0].node.id}
            />
          </div>
          <div>
            <SimilarProduct
              id={data?.similar.edges[1].node.id}
              name={data?.similar.edges[1].node.name}
              price={data?.similar.edges[1].node.price}
              discount={data?.similar.edges[1].node.discount}
              image={data?.similar.edges[1].node.image[0].mainImage.url}
              brand={data?.similar.edges[1].node.brand?.brandName}
              key={data?.similar.edges[1].node.id}
            />
          </div>
        </div>
      )}
    </div>
  );
}
