interface CartCheckoutProps {
  cartSum: any;
  loading: any;
  handleCartCheckout: any;
}

export function CartCheckout({
  cartSum,
  loading,
  handleCartCheckout,
}: CartCheckoutProps) {
  return (
    <>
      <div>
        <div className="select-none mt-8 flex-wrap max-w-full mx-auto md:w-full md:mt-0 pb-4 border-b border-[#c8c8c9]">
          <h2 className="text-2xl font-medium">Summary</h2>
          <div className="flex items-center justify-between mt-8">
            <p className="font-medium">Total: </p>
            <p className="font-medium">${cartSum.toFixed(2)}</p>
          </div>
        </div>
        <div className="hidden md:flex mt-8 items-center justify-center flex-col gap-2">
          <button
            disabled={loading}
            role="link"
            onClick={handleCartCheckout}
            className="bg-[#F1F1F1] font-medium text-black w-full rounded-full py-4 px-4 transition-filter hover:brightness-75 disabled:opacity-80"
          >
            Buy Now
          </button>
        </div>
      </div>

      <div className="md:hidden mt-8 flex items-center justify-center flex-col gap-2">
        <button
          disabled={loading}
          role="link"
          onClick={handleCartCheckout}
          className="bg-[#F1F1F1] font-medium text-black w-full rounded-full py-4 px-4 transition-filter hover:brightness-75 disabled:opacity-80"
        >
          Buy Now
        </button>
      </div>
    </>
  );
}
