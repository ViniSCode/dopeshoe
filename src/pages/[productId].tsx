import { Footer } from "@/components/Footer";
import { ProductActions } from "@/components/Product/ProductActions";
import { ProductDescription } from "@/components/Product/ProductDescription";
import { ProductImages } from "@/components/Product/ProductImages";
import { motion } from "framer-motion";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Header } from "../components/Header";
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
    <div className="min-h-screen">
      <Head>
        {data ? (
          <>
            <title>
              DopeShoe |{" "}
              {data.product.edges[0].node.brand?.brandName +
                data.product.edges[0].node.name}
            </title>
            <meta
              name="description"
              content={`${data.product.edges[0].node.description}`}
            />
          </>
        ) : (
          <>
            <meta name="description" content="Buy Product" />
            <title>DopeShoe | Product Description</title>
          </>
        )}
      </Head>
      <Header />
      {data && (
        <main className="px-5 mb-14 md:max-w-full lg:max-w-[1120px] mx-auto min-h-[90vh]">
          <div className="mt-28 md:mt-32 font-medium text-[15px] text-[#717171] hover:underline">
            <Link href="/">
              {`Home > ${data?.product.edges[0].node.brand?.brandName} ${data?.product.edges[0].node.name}`}
            </Link>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.1 }}
            className="mt-5 grid mx-auto max-w-full gap-10 grid-cols-1 rounded-[13px] lg:grid-cols-product"
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
            className="mt-14 grid mx-auto lg:grid-cols-product-lg md:max-w-full gap-5"
          >
            <ProductDescription
              productDescription={data?.product.edges[0].node.description}
            />
            {/* <ShowSimilarProducts data={data} /> */}
          </motion.div>
        </main>
      )}

      <Footer />
    </div>
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
