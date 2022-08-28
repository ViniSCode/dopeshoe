import type { NextPage } from 'next'
import { BsArrowRightShort } from 'react-icons/bs'
import { CardProduct } from '../components/CardProduct'
import { Header } from '../components/Header'
import { SearchBar } from '../components/SearchBar'
const Home: NextPage = () => {
  return (
  <>
    <Header />
    <main className="mb-24 px-10 max-w-[1120px] mx-auto">
      <div>
        <div className='mt-[4rem] max-w-[430px] mx-auto'>
          <h2 className="text-[1.875rem] text-center">Ofertas especiais em setembro!</h2>
          <p className="text-sm text-gray-500 text-center">Assine a nossa newsletter e fique por dentro das novas ofertas.</p>
        </div>
        <SearchBar />
      </div>
      <div className='flex items-center justify-center gap-8 mt-20 lg:justify-start'>
        <span className='text-red-600 cursor-pointer'>Popular</span>
        <span className='cursor-pointer'>Best Sellers</span>
        <span className='text-gray-300 font-bold'>|</span>
        <span className='cursor-pointer'>discounts</span>
      </div>
      <div className='mt-16 flex items-center justify-center gap-8 flex-wrap'>
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
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
