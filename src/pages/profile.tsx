import { motion } from 'framer-motion'
import type { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import { AiOutlineLogin, AiOutlinePhone } from 'react-icons/ai'
import { BiPurchaseTagAlt } from 'react-icons/bi'
import { BsArrowLeftShort } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { MdOutlineFavoriteBorder } from 'react-icons/md'
import { Header } from '../components/Header'
import { ProfileSidebar } from '../components/Profile/ProfileSidebar'
import { Sidebar } from '../components/Sidebar'

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
  
const menuItems = [
  { icon: <CgProfile className='h-[22px] w-[22px] md:w-[26px] md:h-[26px]'/>, href: '/profile', name: 'Profile' },
  { icon: <BiPurchaseTagAlt className='h-[22px] w-[22px] md:w-[26px] md:h-[26px]'/>, href: '/orders', name: 'Orders' },
  { icon: <AiOutlinePhone className='h-[22px] w-[22px] md:w-[26px] md:h-[26px]'/>, href: '/contact', name: 'Contact' },
  { icon: <MdOutlineFavoriteBorder className='h-[22px] w-[22px] md:w-[26px] md:h-[26px]'/>, href: '/favorites', name: 'Favorites' },
  { icon: <AiOutlineLogin className='h-[22px] w-[22px] md:w-[26px] md:h-[26px]'/>, href: '/login', name: 'Login'},
]
const menuItemsMobile = [
  { icon: <BiPurchaseTagAlt className='h-[22px] w-[22px]'/>, href: '/orders', name: 'Orders' },
  { icon: <MdOutlineFavoriteBorder className='h-[22px] w-[22px]'/>, href: '/favorites', name: 'Favorites' },
  { icon: <AiOutlineLogin className='h-[22px] w-[22px]'/>, href: '/login', name: 'Login'},
]

export default function Profile () {
  return (
    <div>
        <Header />
        <Sidebar />
          <motion.main className="px-4 max-w-[1120px] mx-auto mt-[8rem] min-h-[100vh] lg:grid lg:grid-cols-profile">
            <motion.div  variants={container} initial="hidden" animate="visible" className='hidden lg:select-none lg:flex lg:flex-col lg:gap-20'>
              {menuItems.map(item => (
                <ProfileSidebar key={item.name} href={item.href} name={item.name} icon={item.icon}/>
              ))}
            </motion.div>
            
            <motion.div  variants={container} initial="hidden" animate="visible" className='select-none w-[290px] mx-auto md:w-[420px]'>
              <div className='flex flex-col items-center gap-4 lg:flex-row'>
                <img src="https://www.github.com/viniscode.png" className='rounded-full h-40 w-40'/>
                <strong className='text-2xl'>Vinícius Rodrigues</strong>
                <motion.div  variants={container} initial="hidden" animate="visible" className='select-none w-full mx-auto mt-8 flex items-center justify-between lg:flex-col gap-4 md:gap-16 lg:gap-20 lg:hidden'>
                  {menuItemsMobile.map(item => (
                    <ProfileSidebar key={item.name} href={item.href} name={item.name} icon={item.icon}/>
                  ))}
                </motion.div>
              </div>
                <div className='mt-10'> 
                  <strong className='text-lg'>Last Orders:</strong>
                  <div className='mt-16 text-center'>
                    <span>No orders yet...</span>
                  </div>
                </div>
            </motion.div>
          </motion.main>
        <motion.footer initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 1}} className='select-none flex items-center justify-center mb-24 px-4 md:px-10 md:pb-4 max-w-[1120px] mx-auto'>
          <Link href="/">
            <div className="flex items-center gap-4 cursor-pointer transition-colors hover:text-yellow-500">
              <BsArrowLeftShort fontSize={30} />
              <p className="text-[18px]">Voltar</p>
            </div>
          </Link>
        </motion.footer>
      </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {session}
  }
}