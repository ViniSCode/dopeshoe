import { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '../../../services/stripe';
import { validateCartItems } from '../../../utils/validateCartItems';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { cartProducts } = req.body;

    // VALIDATE CART PRODUCTS
    const line_items = await validateCartItems(cartProducts);

    if (line_items.length === 0) {
      throw new Error('Invalid Products');
    }

    try {
      const session = await stripe.checkout.sessions.create({
        submit_type: 'pay',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        line_items,
        mode: 'payment',
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cart`,
      })
      res.status(200).json({ sessionId: session.id })
    } catch (err) {
      res.status(409).end('Invalid Products.')
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not allowed')
  }
}