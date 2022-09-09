import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
export default function Buy () {
  const handleClick = async (event: any) => {
      event.preventDefault();

      const {sessionId} = await fetch('/api/checkout/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          quantity: 1
        })
      }).then(res => res.json());

      const stripe = await stripePromise;
      const { error } = await stripe!.redirectToCheckout({sessionId})
  }

  return (
      <button role="link" onClick={handleClick}>
        Checkout
      </button>
  )
}