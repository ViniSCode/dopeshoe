export function SearchFilter () {
  return ( 
    <div className='flex items-center justify-center gap-8 mt-20'>
      <span className='text-red-600 cursor-pointer'>Popular</span>
      <span className='cursor-pointer'>Best Sellers</span>
      <span className='text-gray-300 font-bold'>|</span>
      <span className='cursor-pointer'>discounts</span>
    </div>
  );
}

