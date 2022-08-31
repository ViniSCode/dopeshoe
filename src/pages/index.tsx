import type { NextPage } from 'next'
import { BsArrowRightShort } from 'react-icons/bs'
import { CardProduct } from '../components/CardProduct'
import { Header } from '../components/Header'
import { SearchBar } from '../components/SearchBar'
import { SearchFilter } from '../components/SearchFilter'
import { Sidebar } from '../components/Sidebar'
import { TopContentText } from '../components/TopContentText/index'

const products = [
  {
    id: "123193sdjkfhsdf",
    name: "Yeezy 350 V3",
    price: 559,
    brand: "Nike",
    discount: 44,
    sales: 79,
    description: "Lançado como parte de um pacote ‘Mono’ de quatro peças, o adidas Yeezy Boost 350 V2 ‘Mono Cinder’ aplica um acabamento black-out ao tênis estilo de vida. O design revisado apresenta uma parte superior trabalhada em malha de monofilamento, reforçada com uma gaiola interna e acentuada com uma faixa lateral lateral tonal. Uma aba de puxar de correia no calcanhar permite que a construção semelhante a uma meia seja facilmente colocada e retirada. A paleta furtiva se estende até a sola intermediária, com amortecimento Boost envolto que percorre todo o comprimento da sola de borracha. Este sapato foi lançado exclusivamente pela Yeezy Supply.",
    image: "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c07609b2-cc45-4a24-8c56-73bb91b4267d/picwish_2.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220830%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220830T202745Z&X-Amz-Expires=86400&X-Amz-Signature=2322d78678ed8cea04c3f6c67406ace86b916b785483acde61ca6abb704c73eb&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22picwish%25202.png%22&x-id=GetObject",
  },
  {
    id: "1255fgsdg",
    name: "Yeezy 350 V3",
    price: 559,
    brand: "Nike",
    discount: 44,
    sales: 79,
    description: "Lançado como parte de um pacote ‘Mono’ de quatro peças, o adidas Yeezy Boost 350 V2 ‘Mono Cinder’ aplica um acabamento black-out ao tênis estilo de vida. O design revisado apresenta uma parte superior trabalhada em malha de monofilamento, reforçada com uma gaiola interna e acentuada com uma faixa lateral lateral tonal. Uma aba de puxar de correia no calcanhar permite que a construção semelhante a uma meia seja facilmente colocada e retirada. A paleta furtiva se estende até a sola intermediária, com amortecimento Boost envolto que percorre todo o comprimento da sola de borracha. Este sapato foi lançado exclusivamente pela Yeezy Supply.",
    image: "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c07609b2-cc45-4a24-8c56-73bb91b4267d/picwish_2.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220830%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220830T202745Z&X-Amz-Expires=86400&X-Amz-Signature=2322d78678ed8cea04c3f6c67406ace86b916b785483acde61ca6abb704c73eb&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22picwish%25202.png%22&x-id=GetObject",
  },
  {
    id: "21342dgsfhudau",
    name: "Yeezy 350 V3",
    price: 559,
    brand: "Nike",
    discount: 44,
    sales: 79,
    description: "Lançado como parte de um pacote ‘Mono’ de quatro peças, o adidas Yeezy Boost 350 V2 ‘Mono Cinder’ aplica um acabamento black-out ao tênis estilo de vida. O design revisado apresenta uma parte superior trabalhada em malha de monofilamento, reforçada com uma gaiola interna e acentuada com uma faixa lateral lateral tonal. Uma aba de puxar de correia no calcanhar permite que a construção semelhante a uma meia seja facilmente colocada e retirada. A paleta furtiva se estende até a sola intermediária, com amortecimento Boost envolto que percorre todo o comprimento da sola de borracha. Este sapato foi lançado exclusivamente pela Yeezy Supply.",
    image: "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c07609b2-cc45-4a24-8c56-73bb91b4267d/picwish_2.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220830%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220830T202745Z&X-Amz-Expires=86400&X-Amz-Signature=2322d78678ed8cea04c3f6c67406ace86b916b785483acde61ca6abb704c73eb&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22picwish%25202.png%22&x-id=GetObject",
  },
  {
    id: "2134rt457ag",
    name: "Yeezy 350 V3",
    price: 559,
    brand: "Nike",
    discount: 44,
    sales: 79,
    description: "Lançado como parte de um pacote ‘Mono’ de quatro peças, o adidas Yeezy Boost 350 V2 ‘Mono Cinder’ aplica um acabamento black-out ao tênis estilo de vida. O design revisado apresenta uma parte superior trabalhada em malha de monofilamento, reforçada com uma gaiola interna e acentuada com uma faixa lateral lateral tonal. Uma aba de puxar de correia no calcanhar permite que a construção semelhante a uma meia seja facilmente colocada e retirada. A paleta furtiva se estende até a sola intermediária, com amortecimento Boost envolto que percorre todo o comprimento da sola de borracha. Este sapato foi lançado exclusivamente pela Yeezy Supply.",
    image: "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c07609b2-cc45-4a24-8c56-73bb91b4267d/picwish_2.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220830%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220830T202745Z&X-Amz-Expires=86400&X-Amz-Signature=2322d78678ed8cea04c3f6c67406ace86b916b785483acde61ca6abb704c73eb&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22picwish%25202.png%22&x-id=GetObject",
  },
  {
    id: "51246iyrtsd",
    name: "Yeezy 350 V3",
    price: 559,
    brand: "Nike",
    discount: 44,
    sales: 79,
    description: "Lançado como parte de um pacote ‘Mono’ de quatro peças, o adidas Yeezy Boost 350 V2 ‘Mono Cinder’ aplica um acabamento black-out ao tênis estilo de vida. O design revisado apresenta uma parte superior trabalhada em malha de monofilamento, reforçada com uma gaiola interna e acentuada com uma faixa lateral lateral tonal. Uma aba de puxar de correia no calcanhar permite que a construção semelhante a uma meia seja facilmente colocada e retirada. A paleta furtiva se estende até a sola intermediária, com amortecimento Boost envolto que percorre todo o comprimento da sola de borracha. Este sapato foi lançado exclusivamente pela Yeezy Supply.",
    image: "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c07609b2-cc45-4a24-8c56-73bb91b4267d/picwish_2.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220830%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220830T202745Z&X-Amz-Expires=86400&X-Amz-Signature=2322d78678ed8cea04c3f6c67406ace86b916b785483acde61ca6abb704c73eb&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22picwish%25202.png%22&x-id=GetObject",
  },
  {
    id: "215jfssi46",
    name: "Yeezy 350 V3",
    price: 559,
    brand: "Nike",
    discount: 44,
    sales: 79,
    description: "Lançado como parte de um pacote ‘Mono’ de quatro peças, o adidas Yeezy Boost 350 V2 ‘Mono Cinder’ aplica um acabamento black-out ao tênis estilo de vida. O design revisado apresenta uma parte superior trabalhada em malha de monofilamento, reforçada com uma gaiola interna e acentuada com uma faixa lateral lateral tonal. Uma aba de puxar de correia no calcanhar permite que a construção semelhante a uma meia seja facilmente colocada e retirada. A paleta furtiva se estende até a sola intermediária, com amortecimento Boost envolto que percorre todo o comprimento da sola de borracha. Este sapato foi lançado exclusivamente pela Yeezy Supply.",
    image: "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c07609b2-cc45-4a24-8c56-73bb91b4267d/picwish_2.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220830%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220830T202745Z&X-Amz-Expires=86400&X-Amz-Signature=2322d78678ed8cea04c3f6c67406ace86b916b785483acde61ca6abb704c73eb&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22picwish%25202.png%22&x-id=GetObject",
  },
  {
    id: "73474rerhaez",
    name: "Yeezy 350 V3",
    price: 559,
    brand: "Nike",
    discount: 44,
    sales: 79,
    description: "Lançado como parte de um pacote ‘Mono’ de quatro peças, o adidas Yeezy Boost 350 V2 ‘Mono Cinder’ aplica um acabamento black-out ao tênis estilo de vida. O design revisado apresenta uma parte superior trabalhada em malha de monofilamento, reforçada com uma gaiola interna e acentuada com uma faixa lateral lateral tonal. Uma aba de puxar de correia no calcanhar permite que a construção semelhante a uma meia seja facilmente colocada e retirada. A paleta furtiva se estende até a sola intermediária, com amortecimento Boost envolto que percorre todo o comprimento da sola de borracha. Este sapato foi lançado exclusivamente pela Yeezy Supply.",
    image: "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c07609b2-cc45-4a24-8c56-73bb91b4267d/picwish_2.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220830%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220830T202745Z&X-Amz-Expires=86400&X-Amz-Signature=2322d78678ed8cea04c3f6c67406ace86b916b785483acde61ca6abb704c73eb&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22picwish%25202.png%22&x-id=GetObject",
  },
  {
    id: "865426hthujeqaujt",
    name: "Yeezy 350 V3",
    price: 559,
    brand: "Nike",
    discount: 44,
    sales: 79,
    description: "Lançado como parte de um pacote ‘Mono’ de quatro peças, o adidas Yeezy Boost 350 V2 ‘Mono Cinder’ aplica um acabamento black-out ao tênis estilo de vida. O design revisado apresenta uma parte superior trabalhada em malha de monofilamento, reforçada com uma gaiola interna e acentuada com uma faixa lateral lateral tonal. Uma aba de puxar de correia no calcanhar permite que a construção semelhante a uma meia seja facilmente colocada e retirada. A paleta furtiva se estende até a sola intermediária, com amortecimento Boost envolto que percorre todo o comprimento da sola de borracha. Este sapato foi lançado exclusivamente pela Yeezy Supply.",
    image: "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c07609b2-cc45-4a24-8c56-73bb91b4267d/picwish_2.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220830%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220830T202745Z&X-Amz-Expires=86400&X-Amz-Signature=2322d78678ed8cea04c3f6c67406ace86b916b785483acde61ca6abb704c73eb&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22picwish%25202.png%22&x-id=GetObject",
  },
  {
    id: "6243hds",
    name: "Yeezy 350 V3",
    price: 559,
    brand: "Nike",
    discount: 44,
    sales: 79,
    description: "Lançado como parte de um pacote ‘Mono’ de quatro peças, o adidas Yeezy Boost 350 V2 ‘Mono Cinder’ aplica um acabamento black-out ao tênis estilo de vida. O design revisado apresenta uma parte superior trabalhada em malha de monofilamento, reforçada com uma gaiola interna e acentuada com uma faixa lateral lateral tonal. Uma aba de puxar de correia no calcanhar permite que a construção semelhante a uma meia seja facilmente colocada e retirada. A paleta furtiva se estende até a sola intermediária, com amortecimento Boost envolto que percorre todo o comprimento da sola de borracha. Este sapato foi lançado exclusivamente pela Yeezy Supply.",
    image: "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c07609b2-cc45-4a24-8c56-73bb91b4267d/picwish_2.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220830%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220830T202745Z&X-Amz-Expires=86400&X-Amz-Signature=2322d78678ed8cea04c3f6c67406ace86b916b785483acde61ca6abb704c73eb&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22picwish%25202.png%22&x-id=GetObject",
  },
  {
    id: "g315asdgrhahjvnc",
    name: "Yeezy 350 V3",
    price: 559,
    brand: "Nike",
    discount: 44,
    sales: 79,
    description: "Lançado como parte de um pacote ‘Mono’ de quatro peças, o adidas Yeezy Boost 350 V2 ‘Mono Cinder’ aplica um acabamento black-out ao tênis estilo de vida. O design revisado apresenta uma parte superior trabalhada em malha de monofilamento, reforçada com uma gaiola interna e acentuada com uma faixa lateral lateral tonal. Uma aba de puxar de correia no calcanhar permite que a construção semelhante a uma meia seja facilmente colocada e retirada. A paleta furtiva se estende até a sola intermediária, com amortecimento Boost envolto que percorre todo o comprimento da sola de borracha. Este sapato foi lançado exclusivamente pela Yeezy Supply.",
    image: "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c07609b2-cc45-4a24-8c56-73bb91b4267d/picwish_2.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220830%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220830T202745Z&X-Amz-Expires=86400&X-Amz-Signature=2322d78678ed8cea04c3f6c67406ace86b916b785483acde61ca6abb704c73eb&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22picwish%25202.png%22&x-id=GetObject",
  },
]

const Home: NextPage = () => {
  return (
  <>
    <Header />
    <Sidebar />
    
    <main className="mb-16 px-4 max-w-[1120px] mx-auto mt-[8rem]">
      <div>
        <TopContentText />
        <SearchBar />
      </div>

      <SearchFilter />
      
      <div className='mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 flex-wrap max-w-[400px] md:max-w-full mx-auto'>
        {
          products.map(product => {
            return (
              <CardProduct 
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                dicount={product.discount}
                description={product.description}
                image={product.image}
                sales={product.sales}
                brand={product.brand}
              />
            )
          })
        }
      </div>
    </main>
    <footer className='flex items-center justify-between mb-24 px-10 max-w-[1120px] mx-auto'>
      <div>
        <p className="text-gray-500 underline">
          Discover All <br />
          Collections
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
  </>
  )
}

export default Home
