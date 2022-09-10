import { NextApiRequest, NextApiResponse } from 'next';
import { GetProductDocument } from './../../../generated/graphql';

import Stripe from 'stripe';
import { client } from '../../../lib/urql';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-08-01",
})
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {amount} = req.body;
  const {productId} = req.body;
  
  if (req.method === 'POST') {
    const {data} = await client.query(GetProductDocument, { id: productId }).toPromise();
    const product = data.product.edges[0].node
    
    //product images
    const productImages = product.image[0].productImages;
    const formattedProductImages = productImages.map((image: any) => {
      return (
        image.url
      )
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'BRL',
            product_data: {
              images: formattedProductImages,
              name: product.name,
            },
            unit_amount: product.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/${product.id}`,
    })
    res.status(200).json({ sessionId: session.id })
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not allowed')
  }
}