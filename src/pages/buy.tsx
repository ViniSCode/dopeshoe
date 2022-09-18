import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function Buy () {

  const handleCheckout = async () => {
    
  }

  return (
      <button onClick={handleCheckout} className='bg-pink-500 px-8 py-2 rounded-md mt-10 ml-10'>
        Checkout
      </button>
  )
}