export function CardProduct () {   
  return (
    <div className='w-[325px] bg-gray-700 rounded-[13px] px-6 py-6 flex flex-col gap-5 cursor-pointer shadow-lg hover:shadow-none transition-shadow'>
      <div className='w-[100%] h-[200px] rounded-[9px] mx-auto bg-gray-600'>
          <img className="w-[100%] h-[100%] object-cover rounded-[9px]" src="https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
      </div>
      <div>
        <p className='text-[22px] text-center'>
          <span className='text-red-600'>Jordan</span> 6s Infrared
        </p>
        <div>
          <div className='flex items-start gap-1 justify-center mt-4'>
            <span className='flex items-center gap-1'>
              <p className='text-2xl'>R$</p>
              <p className='text-2xl'>559</p>
            </span>
            <span className='text-green-500 text-[14px]'>44% OFF</span>
          </div>
          <p className="text-center text-gray-200 mt-1 text-[14px]">em 12x R$15,42</p>
        </div>
      </div>
    </div>
  )
}