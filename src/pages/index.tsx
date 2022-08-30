import type { NextPage } from 'next'
import { BsArrowRightShort } from 'react-icons/bs'
import { CardProduct } from '../components/CardProduct'
import { Header } from '../components/Header'
import { SearchBar } from '../components/SearchBar'
import { SearchFilter } from '../components/SearchFilter'
import { Sidebar } from '../components/Sidebar'
import { TopContentText } from '../components/TopContentText/inde'
const Home: NextPage = () => {
  return (
  <>
    <Header />
    <Sidebar />
    
    <main className="mb-24 px-10 max-w-[1120px] mx-auto mt-[7rem]">
      <div>
        <TopContentText />
        <SearchBar />
      </div>

      <SearchFilter />
      
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
