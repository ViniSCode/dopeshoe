import { motion } from 'framer-motion'
import type { GetStaticProps, NextPage } from 'next'
import { BsArrowRightShort } from 'react-icons/bs'
import { CardProduct } from '../components/CardProduct'
import { Header } from '../components/Header'
import { SearchBar } from '../components/SearchBar'
import { SearchFilter } from '../components/SearchFilter'
import { Sidebar } from '../components/Sidebar'
import { TopContentText } from '../components/TopContentText/index'
import { GetAllProductsDocument, useGetAllProductsQuery } from '../generated/graphql'
import { client, ssrCache } from '../lib/urql'

const products = [
  {
    id: "123193sdjkfhsdf",
    name: "Yeezy 350 V3",
    price: 559,
    brand: "Nike",
    discount: 44,
    sales: 79,
    description: "Lançado como parte de um pacote ‘Mono’ de quatro peças, o adidas Yeezy Boost 350 V2 ‘Mono Cinder’ aplica um acabamento black-out ao tênis estilo de vida. O design revisado apresenta uma parte superior trabalhada em malha de monofilamento, reforçada com uma gaiola interna e acentuada com uma faixa lateral lateral tonal. Uma aba de puxar de correia no calcanhar permite que a construção semelhante a uma meia seja facilmente colocada e retirada. A paleta furtiva se estende até a sola intermediária, com amortecimento Boost envolto que percorre todo o comprimento da sola de borracha. Este sapato foi lançado exclusivamente pela Yeezy Supply.",
    image: "/yeezy.png",
  },
  {
    id: "1255fgsdg",
    name: "Yeezy 350 V3",
    price: 559,
    brand: "Nike",
    discount: 44,
    sales: 79,
    description: "Lançado como parte de um pacote ‘Mono’ de quatro peças, o adidas Yeezy Boost 350 V2 ‘Mono Cinder’ aplica um acabamento black-out ao tênis estilo de vida. O design revisado apresenta uma parte superior trabalhada em malha de monofilamento, reforçada com uma gaiola interna e acentuada com uma faixa lateral lateral tonal. Uma aba de puxar de correia no calcanhar permite que a construção semelhante a uma meia seja facilmente colocada e retirada. A paleta furtiva se estende até a sola intermediária, com amortecimento Boost envolto que percorre todo o comprimento da sola de borracha. Este sapato foi lançado exclusivamente pela Yeezy Supply.",
    image: "/yeezy.png",
  },
  {
    id: "21342dgsfhudau",
    name: "Yeezy 350 V3",
    price: 559,
    brand: "Nike",
    discount: 44,
    sales: 79,
    description: "Lançado como parte de um pacote ‘Mono’ de quatro peças, o adidas Yeezy Boost 350 V2 ‘Mono Cinder’ aplica um acabamento black-out ao tênis estilo de vida. O design revisado apresenta uma parte superior trabalhada em malha de monofilamento, reforçada com uma gaiola interna e acentuada com uma faixa lateral lateral tonal. Uma aba de puxar de correia no calcanhar permite que a construção semelhante a uma meia seja facilmente colocada e retirada. A paleta furtiva se estende até a sola intermediária, com amortecimento Boost envolto que percorre todo o comprimento da sola de borracha. Este sapato foi lançado exclusivamente pela Yeezy Supply.",
    image: "/yeezy.png",
  },
  {
    id: "2134rt457ag",
    name: "Yeezy 350 V3",
    price: 559,
    brand: "Nike",
    discount: 44,
    sales: 79,
    description: "Lançado como parte de um pacote ‘Mono’ de quatro peças, o adidas Yeezy Boost 350 V2 ‘Mono Cinder’ aplica um acabamento black-out ao tênis estilo de vida. O design revisado apresenta uma parte superior trabalhada em malha de monofilamento, reforçada com uma gaiola interna e acentuada com uma faixa lateral lateral tonal. Uma aba de puxar de correia no calcanhar permite que a construção semelhante a uma meia seja facilmente colocada e retirada. A paleta furtiva se estende até a sola intermediária, com amortecimento Boost envolto que percorre todo o comprimento da sola de borracha. Este sapato foi lançado exclusivamente pela Yeezy Supply.",
    image: "/yeezy.png",
  },
  {
    id: "51246iyrtsd",
    name: "Yeezy 350 V3",
    price: 559,
    brand: "Nike",
    discount: 44,
    sales: 79,
    description: "Lançado como parte de um pacote ‘Mono’ de quatro peças, o adidas Yeezy Boost 350 V2 ‘Mono Cinder’ aplica um acabamento black-out ao tênis estilo de vida. O design revisado apresenta uma parte superior trabalhada em malha de monofilamento, reforçada com uma gaiola interna e acentuada com uma faixa lateral lateral tonal. Uma aba de puxar de correia no calcanhar permite que a construção semelhante a uma meia seja facilmente colocada e retirada. A paleta furtiva se estende até a sola intermediária, com amortecimento Boost envolto que percorre todo o comprimento da sola de borracha. Este sapato foi lançado exclusivamente pela Yeezy Supply.",
    image: "/yeezy.png",
  },
  {
    id: "215jfssi46",
    name: "Yeezy 350 V3",
    price: 559,
    brand: "Nike",
    discount: 44,
    sales: 79,
    description: "Lançado como parte de um pacote ‘Mono’ de quatro peças, o adidas Yeezy Boost 350 V2 ‘Mono Cinder’ aplica um acabamento black-out ao tênis estilo de vida. O design revisado apresenta uma parte superior trabalhada em malha de monofilamento, reforçada com uma gaiola interna e acentuada com uma faixa lateral lateral tonal. Uma aba de puxar de correia no calcanhar permite que a construção semelhante a uma meia seja facilmente colocada e retirada. A paleta furtiva se estende até a sola intermediária, com amortecimento Boost envolto que percorre todo o comprimento da sola de borracha. Este sapato foi lançado exclusivamente pela Yeezy Supply.",
    image: "/yeezy.png",
  },
  {
    id: "73474rerhaez",
    name: "Yeezy 350 V3",
    price: 559,
    brand: "Nike",
    discount: 44,
    sales: 79,
    description: "Lançado como parte de um pacote ‘Mono’ de quatro peças, o adidas Yeezy Boost 350 V2 ‘Mono Cinder’ aplica um acabamento black-out ao tênis estilo de vida. O design revisado apresenta uma parte superior trabalhada em malha de monofilamento, reforçada com uma gaiola interna e acentuada com uma faixa lateral lateral tonal. Uma aba de puxar de correia no calcanhar permite que a construção semelhante a uma meia seja facilmente colocada e retirada. A paleta furtiva se estende até a sola intermediária, com amortecimento Boost envolto que percorre todo o comprimento da sola de borracha. Este sapato foi lançado exclusivamente pela Yeezy Supply.",
    image: "/yeezy.png",
  },
  {
    id: "865426hthujeqaujt",
    name: "Yeezy 350 V3",
    price: 559,
    brand: "Nike",
    discount: 44,
    sales: 79,
    description: "Lançado como parte de um pacote ‘Mono’ de quatro peças, o adidas Yeezy Boost 350 V2 ‘Mono Cinder’ aplica um acabamento black-out ao tênis estilo de vida. O design revisado apresenta uma parte superior trabalhada em malha de monofilamento, reforçada com uma gaiola interna e acentuada com uma faixa lateral lateral tonal. Uma aba de puxar de correia no calcanhar permite que a construção semelhante a uma meia seja facilmente colocada e retirada. A paleta furtiva se estende até a sola intermediária, com amortecimento Boost envolto que percorre todo o comprimento da sola de borracha. Este sapato foi lançado exclusivamente pela Yeezy Supply.",
    image: "/yeezy.png",
  },
  {
    id: "6243hds",
    name: "Yeezy 350 V3",
    price: 559,
    brand: "Nike",
    discount: 44,
    sales: 79,
    description: "Lançado como parte de um pacote ‘Mono’ de quatro peças, o adidas Yeezy Boost 350 V2 ‘Mono Cinder’ aplica um acabamento black-out ao tênis estilo de vida. O design revisado apresenta uma parte superior trabalhada em malha de monofilamento, reforçada com uma gaiola interna e acentuada com uma faixa lateral lateral tonal. Uma aba de puxar de correia no calcanhar permite que a construção semelhante a uma meia seja facilmente colocada e retirada. A paleta furtiva se estende até a sola intermediária, com amortecimento Boost envolto que percorre todo o comprimento da sola de borracha. Este sapato foi lançado exclusivamente pela Yeezy Supply.",
    image: "/yeezy.png",
  },
  {
    id: "g315asdgrhahjvnc",
    name: "Yeezy 350 V3",
    price: 559,
    brand: "Nike",
    discount: 44,
    sales: 79,
    description: "Lançado como parte de um pacote ‘Mono’ de quatro peças, o adidas Yeezy Boost 350 V2 ‘Mono Cinder’ aplica um acabamento black-out ao tênis estilo de vida. O design revisado apresenta uma parte superior trabalhada em malha de monofilamento, reforçada com uma gaiola interna e acentuada com uma faixa lateral lateral tonal. Uma aba de puxar de correia no calcanhar permite que a construção semelhante a uma meia seja facilmente colocada e retirada. A paleta furtiva se estende até a sola intermediária, com amortecimento Boost envolto que percorre todo o comprimento da sola de borracha. Este sapato foi lançado exclusivamente pela Yeezy Supply.",
    image: "/yeezy.png",
  },
]

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1
    }
  }
}
  
const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
}

const Home: NextPage = () => {
  const [{ data }] = useGetAllProductsQuery({
    variables: {
      limit: 12,
      offset: 0
    }
  })

  return (
    <div>
        <Header />
        <Sidebar />
          <motion.main className="mb-16 px-4 max-w-[1120px] mx-auto mt-[8rem]">
            <div>
              <TopContentText />
              <SearchBar />
            </div>
            <SearchFilter />
            
            <motion.div  variants={container} initial="hidden" animate="visible" className='mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 flex-wrap max-w-[400px] md:max-w-full mx-auto'>
              {
                data?.product.edges.map(product => {
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
                  )
                })
              }
            </motion.div>
          </motion.main>
        <footer className='flex items-center justify-between mb-24 px-4 md:px-10 max-w-[1120px] mx-auto'>
          <div>
            <p className="text-gray-500 underline">
              Discover All <br />
              Products
            </p>
          </div>
          <div className='flex items-center gap-4 cursor-pointer'>
            <p className='text-[18px]'>Next page</p>
            <BsArrowRightShort fontSize={30}/>
          </div>
          <div>
            <span>{" < 1 > "}</span>
          </div>
        </footer>
      </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  await client.query(GetAllProductsDocument, { limit: 12, offset: 0 }).toPromise();


  return {
    props: {
      urqlState: ssrCache.extractData()
    }
  }
}