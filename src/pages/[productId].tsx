import { motion } from "framer-motion";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Header } from "../components/Header";
import { ProductActions } from "../components/Product/ProductActions";
import { ProductDescription } from "../components/Product/ProductDescription";
import { ProductFooter } from "../components/Product/ProductFooter";
import { ProductImages } from "../components/Product/ProductImages";
import { Sidebar } from "../components/Sidebar";
import { ShowSimilarProducts } from "../components/SimilarProduct/ShowSimilarProducts";
import { GetProductDocument, useGetProductQuery } from "../generated/graphql";
import { client, ssrCache } from "../lib/urql";

export default function Product() {
  const router = useRouter();
  const productId: any = router.query.productId;

  const [{ data, error, fetching }] = useGetProductQuery({
    variables: {
      id: productId,
    },
  });

  return (
    <>
      <Header />
      <Sidebar />
      {data && (
        <motion.main className="mb-16 px-4 md:px-10 max-w-[1120px] mx-auto mt-[8rem] min-h-[100vh] lg:min-h-[90vh]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.1 }}
            className="mt-20 grid max-w-[500px] mx-auto md:max-w-[900px] md:grid-cols-product-lg lg:max-w-full gap-5 grid-cols-1 rounded-[13px] lg:grid-cols-product lg:gap-5"
          >
            <ProductImages
              productImages={data?.product.edges[0].node.image[0].productImages}
              mainImage={data?.product.edges[0].node.image[0].mainImage.url}
            />
            <ProductActions product={data?.product.edges[0].node} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-10 grid max-w-[500px] mx-auto md:grid-cols-product-lg md:max-w-full gap-5"
          >
            <ProductDescription
              productDescription={data?.product.edges[0].node.description}
            />
            <ShowSimilarProducts data={data} />
          </motion.div>
        </motion.main>
      )}
      
      <ProductFooter />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  await client.query(GetProductDocument, { limit: 12, offset: 0 }).toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  };
};
