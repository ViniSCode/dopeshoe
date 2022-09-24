import { NextApiRequest, NextApiResponse } from 'next';
import { UserAlreadyExistsDocument } from '../../../generated/graphql';
import { client } from '../../../lib/urql';
import { stripe } from '../../../services/stripe';
import { validateCartItems } from '../../../utils/validateCartItems';
import { updateCustomer } from './session';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { session } = req.body;
  const email = session.user.email;
  
  if (req.method === 'POST') {
    const { cartProducts } = req.body;

    // VALIDATE CART PRODUCTS
    const line_items = await validateCartItems(cartProducts);

    if (line_items.length === 0) {
      throw new Error('Invalid Products');
    }
    
    const {data: { customers }} = await client.query(UserAlreadyExistsDocument, {email}).toPromise();
    
    let customerId = customers[0].stripeId;
    
    customerId = customers[0].stripeId;
    
    if (customerId === null) {
      const stripeCustomer = await stripe.customers.create({
        name: session.user.name,
        email: session.user.email,
      });
  
      await updateCustomer(email, stripeCustomer.id);
      customerId = stripeCustomer.id;
    }


    try {
      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        submit_type: 'pay',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        line_items,
        expand: ['line_items'],
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