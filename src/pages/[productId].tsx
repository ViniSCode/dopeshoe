import { motion } from 'framer-motion';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsArrowLeftShort } from "react-icons/bs";
import { Header } from "../components/Header";
import { ProductActions } from "../components/Product/ProductActions";
import { ProductDescription } from '../components/Product/ProductDescription';
import { ProductImages } from "../components/Product/ProductImages";
import { SearchBar } from "../components/SearchBar";
import { Sidebar } from "../components/Sidebar";
import { SimilarProduct } from "../components/SimilarProduct";
import { TopContentText } from "../components/TopContentText";
import { GetProductDocument, useGetProductQuery } from '../generated/graphql';
import { client, ssrCache } from '../lib/urql';

export default function Product() {
  const router = useRouter();
  const productId: any = router.query.productId;

  const [{ data, error, fetching }] = useGetProductQuery({
    variables: {
      id: productId
    }
  });

  return (
    <>
    <Header />
      <Sidebar />
        <motion.main className="mb-16 px-4 md:px-10 max-w-[1120px] mx-auto mt-[8rem]">
          <div>
            <TopContentText />
            <SearchBar />
          </div>
          <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.1, delay: 0.1}} className="mt-20 grid max-w-[500px] mx-auto md:max-w-[900px] md:grid-cols-product-lg lg:max-w-full gap-5 grid-cols-1 rounded-[13px] lg:grid-cols-product lg:gap-5">
            <ProductImages 
              productImages={data?.product.edges[0].node.image[0].productImages}
            />
            <ProductActions />
          </motion.div>

          <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay:0.3}} className="mt-10 grid max-w-[500px] mx-auto md:grid-cols-product-lg md:max-w-full gap-5">
            <ProductDescription 
              productDescription={data?.product.edges[0].node.description}
            />
            <div>
              <h2 className="text-2xl underline text-gray-350 font-bold mb-6">Similar</h2>
              <div className="grid grid-cols-2 gap-4 md:block">
                <div className="md:hidden">
                <SimilarProduct id="sdjf23894" name="Nike Air Force 1" price={299} discount={30} sales={29} description={"Lançado como parte de um pacote Mono de quatro peças, o adidas Yeezy Boost 350 V2 Mono Cinder aplica um acabamento black-out ao tênis estilo de vida. O design revisado apresenta uma parte superior trabalhada em malha de monofilamento, reforçada com uma gaiola interna e acentuada com uma faixa lateral lateral tonal. Uma aba de puxar de correia no calcanhar permite que a construção semelhante a uma meia seja facilmente colocada e retirada. A paleta furtiva se estende até a sola intermediária, com amortecimento Boost envolto que percorre todo o comprimento da sola de borracha. Este sapato foi lançado exclusivamente pela Yeezy Supply."} image="/yeezy.png" brand="Nike" key="sdjf23894" />
                </div>
                <div>
                  <SimilarProduct id="sdjf23894" name="Nike Air Force 1" price={299} discount={30} sales={29} description={"Lançado como parte de um pacote Mono de quatro peças, o adidas Yeezy Boost 350 V2 Mono Cinder aplica um acabamento black-out ao tênis estilo de vida. O design revisado apresenta uma parte superior trabalhada em malha de monofilamento, reforçada com uma gaiola interna e acentuada com uma faixa lateral lateral tonal. Uma aba de puxar de correia no calcanhar permite que a construção semelhante a uma meia seja facilmente colocada e retirada. A paleta furtiva se estende até a sola intermediária, com amortecimento Boost envolto que percorre todo o comprimento da sola de borracha. Este sapato foi lançado exclusivamente pela Yeezy Supply."} image="/yeezy.png" brand="Nike" key="sdjf23894" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.main>
      <footer className="flex items-center px-4 justify-between mb-24 md:px-10 max-w-[1120px] mx-auto">
        <div>
          <p className="text-gray-500 underline">
            Discover All <br />
            Collections
          </p>
        </div>
        <Link href="/">
          <div className="flex items-center gap-4 cursor-pointer">
            <BsArrowLeftShort fontSize={30} />
            <p className="text-[18px]">Voltar</p>
          </div>
        </Link>
        <div>
          <span>{" < 1 > "}</span>
        </div>
      </footer>
    </>
  );
}


export const getServerSideProps: GetServerSideProps = async () => {
  await client.query(GetProductDocument, { limit: 12, offset: 0 }).toPromise();


  return {
    props: {
      urqlState: ssrCache.extractData()
    }
  }
}