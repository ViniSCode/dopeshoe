import { NextApiRequest, NextApiResponse } from 'next';

// import { validateCartItems } from '../../../utils/validateCartItems';
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2022-08-01",
// })


// const product = [
//   {
//     name: 'Bananas',
//     description: 'Yummy yellow fruit',
//     id: 'sku_GBJ2Ep8246qeeT',
//     price: 400,
//     image:
//       'https://images.unsplash.com/photo-1574226516831-e1dff420e562?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=225&q=80',
//     attribution: 'Photo by Priscilla Du Preez on Unsplash',
//     currency: 'USD',
//   },
//   {
//     name: 'Tangerines',
//     id: 'sku_GBJ2WWfMaGNC2Z',
//     price: 100,
//     image:
//       'https://images.unsplash.com/photo-1482012792084-a0c3725f289f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=225&q=80',
//     attribution: 'Photo by Jonathan Pielmayer on Unsplash',
//     currency: 'USD',
//   },
// ]


export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    // const { cartProducts } = req.body;
    // const line_items = validateCartItems(cartProducts);

    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ['card'],
    //   line_items: [
    //     {
    //       price_data: {
    //         currency: 'BRL',
    //         product_data: {
    //           // images: formattedProductImages,
    //           name: "product.name",
    //         },
    //         // unit_amount: product.price * 100,
    //       },
    //       quantity: 1,
    //     },
    //   ],
    //   mode: 'payment',
    //   success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
    //   cancel_url: `${req.headers.origin}/cart`,
    // })
    // res.status(200).json({ sessionId: session.id })
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not allowed')
  }
}