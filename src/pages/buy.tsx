// import { loadStripe } from '@stripe/stripe-js';
// import { useState } from 'react';

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// export default function Buy () {
//   const [loading, setLoading] = useState(false);

//   const handleCheckout = async (event: any) => {
//     event.preventDefault();
//     setLoading(true)

//     const {sessionId} = await fetch('/api/checkout/session', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         amount: 1
//       })
//     }).then(res => res.json());

//     const stripe = await stripePromise;
//     const { error } = await stripe!.redirectToCheckout({sessionId})
//     setLoading(false)
//   }

//   return (
//       <button role="link" onClick={handleCheckout} className='bg-pink-500 px-8 py-2 rounded-md mt-10 ml-10'>
//         Checkout
//       </button>
//   )
// }