import { motion } from "framer-motion";
import type { GetStaticProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { CardProduct } from "../components/CardProduct";
import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { SearchFilter } from "../components/SearchFilter";
import { Sidebar } from "../components/Sidebar";
import { TopContentText } from "../components/TopContentText/index";
import {
  GetAllProductsDocument,
  useGetAllProductsQuery
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
  const [orderBy, setOrderBy] = useState('name_ASC');

  const [{ data }] = useGetAllProductsQuery({
    variables: {
      limit: productsPerPage,
      offset: offset,
      search: search,
      // orderBy: 'name_ASC'
    },
  });

  useEffect(() => {
    let timer = setTimeout(() => {
      if (search) {
        setSearch(search);
      }
    }, 800)

    return () => clearTimeout(timer);
  }, [search])

  return (
    <div>
      <Header />
      <Sidebar />
      <motion.main className="mb-16 px-4 max-w-[1120px] mx-auto mt-[8rem] min-h-[100vh]">
        <div>
          <TopContentText />
          <SearchBar search={search} setSearch={setSearch}/>
        </div>
        <SearchFilter />

        {
          data!.product.aggregate.count < 1 ? (
            <span className="text-2xl text-center mt-40 block text-gray-500">Nenhum produto encontrado</span>
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
          )
        }

      </motion.main>
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="select-none flex items-center justify-between mb-24 px-4 md:px-10 md:pb-4 max-w-[1120px] mx-auto"
      >
        <>
          <div>
            <p className="text-gray-500 underline">All</p>
          </div>

          <div className="flex items-center justify-center gap-2">
            <div
              onClick={() => {
                if (data?.product.pageInfo.hasPreviousPage) {
                  setOffset(offset - productsPerPage);
                  setPage(page - 1);
                }
              }}
              className={`flex items-center gap-4 cursor-pointer transition-colors hover:text-yellow-500 ${
                !data?.product.pageInfo.hasPreviousPage &&
                "text-gray-500 hover:text-gray-500 opacity-80 cursor-auto"
              }`}
            >
              <BsArrowLeftShort fontSize={30} />
            </div>
            <span>{String(page)}</span>
            <div
              onClick={() => {
                if (data?.product.pageInfo.hasNextPage) {
                  setOffset(offset + productsPerPage);
                  setPage(page + 1);
                }
              }}
              className={`flex items-center gap-4 cursor-pointer transition-colors hover:text-yellow-500 ${
                !data?.product.pageInfo.hasNextPage &&
                "text-gray-500 hover:text-gray-500 opacity-80 cursor-auto"
              }`}
            >
              <BsArrowRightShort fontSize={30} />
            </div>
          </div>

          <div>
            <span>{String(page)}</span>
          </div>
        </>
      </motion.footer>
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
