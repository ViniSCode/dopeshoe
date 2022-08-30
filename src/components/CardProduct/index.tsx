export function CardProduct () {   
  return (
    <div className='px-2 py-3 h-[250px] md:w-[100%] md:h-[360px] md:max-w-[280px] mx-auto bg-gray-700 rounded-[13px] md:px-4 md:py-4 flex flex-col gap-1 cursor-pointer shadow-lg hover:shadow-none transition-shadow'>
      <div className='w-[100%] h-[200px] rounded-[9px] mx-auto bg-gray-600'>
          <img className="w-[100%] h-[100%] object-contain rounded-[9px]" src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c07609b2-cc45-4a24-8c56-73bb91b4267d/picwish_2.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220830%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220830T202745Z&X-Amz-Expires=86400&X-Amz-Signature=2322d78678ed8cea04c3f6c67406ace86b916b785483acde61ca6abb704c73eb&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22picwish%25202.png%22&x-id=GetObject" />
      </div>
      <div>
        <p className='text-[18px] mt-2 md:mt-5 md:text-[25px] text-center'>
          <span className='text-red-600'>Yeezy</span> 350 V3
        </p>
        <div>
          <div className='mt-1 flex items-start md:gap-1 justify-center md:mt-2'>
            <span className='flex items-center gap-1'>
              <p className='text-[22px] md:text-2xl'>R$</p>
              <p className='text-[22px] md:text-2xl'>559</p>
            </span>
            <span className='text-green-500 text-[14px]'>44% OFF</span>
          </div>
          <p className="mt-2 text-center text-gray-200 md:mt-3 text-[14px]">em 12x R$15,42</p>
        </div>
      </div>
    </div>
  )
}