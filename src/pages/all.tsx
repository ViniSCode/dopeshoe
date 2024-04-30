import { ShoeCard } from "@/components/CardProduct/ShoeCard";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Filter } from "@/components/Radix/Filter";
import type { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  GetAllProductsDocument,
  ProductOrderByInput,
  useGetAllProductsQuery,
} from "../generated/graphql";
import { client, ssrCache } from "../lib/urql";

export default function All() {
  const [offset, setOffset] = useState(0);
  const productsPerPage = 21;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState(
    () => ProductOrderByInput.CreatedAtDesc
  );
  const [{ data }] = useGetAllProductsQuery({
    variables: {
      limit: productsPerPage,
      offset: offset,
      search: search,
      orderBy: orderBy,
    },
  });

  useEffect(() => {
    let timer = setTimeout(() => {
      if (search) {
        setOffset(0);
        setPage(1);
        setSearch(search);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div>
      <Head>
        <title>DopeShoe | Shoes E-commerce</title>
        <meta
          name="description"
          content="Nike, New Balance, Adidas, DopeShoe shoe store with incredible prices. Visit us now and enjoy!"
        />
      </Head>
      <Header />
      <main className="relative mt-28 md:mt-28 px-5 mb-14 max-w-full md:max-w-full lg:max-w-[1120px] mx-auto min-h-[100vh]">
        <div className="px-5 bg-white pt-10 py-8 fixed z-[90] max-w-full md:max-w-full lg:max-w-[1120px] top-[4rem] left-[50%] right-[50%] -translate-x-1/2 w-full">
          <div className="flex items-center justify-between w-full">
            <div>
              <div className="font-medium text-[15px] text-[#717171] hover:underline">
                <Link href="/">{`Home > All`}</Link>
              </div>
              <h3 className="text-2xl font-medium">All Shoes</h3>
            </div>
            <div className="flex gap-2 items-center cursor-pointer">
              {/* <span className="text-base font-medium">Sort By</span> */}
              <Filter setOrderBy={setOrderBy} setPage={setPage} />
            </div>
          </div>
        </div>

        <div className="mt-[16rem]">
          {data &&
            (data!.product.aggregate.count < 1 ? (
              <span className="text-2xl text-center mt-40 block text-gray-500">
                Nenhum produto encontrado
              </span>
            ) : (
              <div className="select-none mt-16 grid grid-cols-1 xsm:grid-cols-2  md:grid-cols-3 items-end gap-4 mx-auto">
                {data?.product.edges.map((product) => {
                  return <ShoeCard product={product} key={product.node.id} />;
                })}
              </div>
            ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  await client
    .query(GetAllProductsDocument, { limit: 12, offset: 0, search: "" })
    .toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  };
};
