import { NextApiRequest, NextApiResponse } from 'next';

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-08-01",
})
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {amount} = req.body;
  const {productId} = req.body;

  if (req.method === 'POST') {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
          price: process.env.PRICE_ID,
          quantity: 1
        },],
      mode: 'payment',
      success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/checkout`,
    })
    res.status(200).json({ sessionId: session.id })
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not allowed')
  }
}