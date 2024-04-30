import { Footer } from "@/components/Footer";
import { Slider } from "@/components/Slider";
import { motion } from "framer-motion";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoeThumbCard } from "../components/CardProduct";
import { Header } from "../components/Header";
import {
  GetHomeProductsDocument,
  ProductOrderByInput,
  useGetHomeProductsQuery,
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
  const productsPerPage = 6;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filterSelected, setFilterSelected] = useState("all");
  const [orderBy, setOrderBy] = useState(() => ProductOrderByInput.NameAsc);
  const [{ data }] = useGetHomeProductsQuery();

  useEffect(() => {
    let timer = setTimeout(() => {
      if (search) {
        setOffset(0);
        setPage(1);
        setSearch(search);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="font-sans">
      <Head>
        <title>DopeShoe | Shoes E-commerce</title>
        <meta
          name="description"
          content="Nike, New Balance, Adidas, DopeShoe shoe store with incredible prices. Visit us now and enjoy!"
        />
      </Head>
      <Header />

      <div className="mt-20">
        <img
          alt="nike banner"
          src="/assets/banner-nike-shoe.jpg"
          className="w-full h-[60vh] md:h-[80vh] max-h-[100vh] object-cover"
        />
      </div>
      <motion.main className="px-5 mb-14 min-h-fit max-w-full md:max-w-full lg:max-w-[1120px] mx-auto">
        <div>
          <div className="mt-[60px] md:max-w-full mx-auto">
            <h4 className="text-xl md:text-[32px] font-bold">POPULAR</h4>
          </div>

          {data &&
            (data!.productsNew.length < 1 ? (
              <span className="text-2xl text-center mt-7 block text-gray-500">
                Nenhum produto encontrado
              </span>
            ) : (
              <motion.div
                variants={container}
                initial="hidden"
                animate="visible"
                className="select-none"
              >
                <Slider sliderCount={data?.productsNew.length}>
                  {data?.productsNew.map((product) => {
                    return (
                      <motion.div key={product.id} variants={item}>
                        <ShoeThumbCard
                          id={product.id}
                          name={product.name}
                          price={product.price}
                          discount={product.discount}
                          image={product.image}
                          brand={product.brand}
                          available={product.available}
                        />
                      </motion.div>
                    );
                  })}
                </Slider>
              </motion.div>
            ))}
        </div>

        <div className="mt-[60px]">
          <h4 className="text-xl md:text-[32px] font-bold">ALL SHOES</h4>
          <Link href="/all">
            <img
              alt="nike banner"
              src="/assets/nike-all-shoes-banner.jpg"
              className="w-full h-auto mt-5 hover:brightness-90 transition-filter"
            />
          </Link>
        </div>

        <div>
          <div className="mt-[60px] md:max-w-full mx-auto">
            <h4 className="text-xl md:text-[32px] font-bold">BEST OFFERS</h4>
          </div>

          {data &&
            (data!.productsOffer.length < 1 ? (
              <span className="text-2xl text-center mt-7 block text-gray-500">
                Nenhum produto encontrado
              </span>
            ) : (
              <motion.div
                variants={container}
                initial="hidden"
                animate="visible"
                className="select-none"
              >
                <Slider sliderCount={data.productsOffer.length}>
                  {data?.productsOffer.map((product) => {
                    return (
                      <motion.div key={product.id} variants={item}>
                        <ShoeThumbCard
                          id={product.id}
                          name={product.name}
                          price={product.price}
                          discount={product.discount}
                          image={product.image}
                          brand={product.brand}
                          available={product.available}
                        />
                      </motion.div>
                    );
                  })}
                </Slider>
              </motion.div>
            ))}
        </div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  await client.query(GetHomeProductsDocument, {}).toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  };
};
