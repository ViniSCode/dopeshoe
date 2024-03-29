import { motion } from "framer-motion";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { CardProduct } from "../components/CardProduct";
import { Header } from "../components/Header";
import { IndexPageFooter } from "../components/IndexPageFooter";
import { SearchBar } from "../components/SearchBar";
import { SearchFilter } from "../components/SearchFilter";
import { Sidebar } from "../components/Sidebar";
import { TopContentText } from "../components/TopContentText/index";
import {
  GetAllProductsDocument,
  ProductOrderByInput,
  useGetAllProductsQuery,
} from "../generated/graphql";
import { client, ssrCache } from "../lib/urql";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const Home: NextPage = () => {
  const [offset, setOffset] = useState(0);
  const productsPerPage = 8;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filterSelected, setFilterSelected] = useState("all");
  const [orderBy, setOrderBy] = useState(() => ProductOrderByInput.NameAsc);
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
      <Sidebar />
      <motion.main className="mb-28 px-4 max-w-[1120px] mx-auto mt-[8rem] min-h-[100vh]">
        <div>
          <TopContentText />
          <SearchBar search={search} setSearch={setSearch} setPage={setPage} />
        </div>
        <SearchFilter
          setOrderBy={setOrderBy}
          setFilterSelected={setFilterSelected}
          filterSelected={filterSelected}
          setPage={setPage}
        />

        {data &&
          (data!.product.aggregate.count < 1 ? (
            <span className="text-2xl text-center mt-40 block text-gray-500">
              Nenhum produto encontrado
            </span>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
              className="select-none mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 flex-wrap max-w-[400px] md:max-w-full mx-auto"
            >
              {data?.product.edges.map((product) => {
                return (
                  <motion.div key={product.node.id} variants={item}>
                    <CardProduct
                      id={product.node.id}
                      name={product.node.name}
                      price={product.node.price}
                      discount={product.node.discount}
                      image={product.node.image}
                      brand={product.node.brand}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          ))}
      </motion.main>

      <IndexPageFooter
        data={data}
        offset={offset}
        page={page}
        productsPerPage={productsPerPage}
        setOffset={setOffset}
        setPage={setPage}
      />
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  await client
    .query(GetAllProductsDocument, { limit: 8, offset: 0, search: "" })
    .toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  };
};
