import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { gql } from "urql";
import { client } from "../../../lib/urql";
import {
  GetProductDocument
} from "./../../../generated/graphql";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-08-01",
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { amount } = req.body;
  const { productId } = req.body;
  const { session } = req.body;
  const { productName } = req.body;
  const email = session.user.email;
  
  let customerId = null;
  
  try {
    // get customer if already exists
    const {data: { customers }} = await client.query(gql`
    query UserAlreadyExists($email: String!) {
      customers(where: {email: $email}) {
        id
        stripeId
      }
    }`, {email: session.user.email}).toPromise();
  
    if (customers[0]?.stripeId) {
      // if customer already exists
      customerId = customers[0]?.stripeId;
    } else {
      // if customer not exists
      const stripeCustomer = await stripe.customers.create({
        name: session.user.name,
        email: session.user.email,
      })
 
      await updateCustomer(email, stripeCustomer.id);
      customerId = stripeCustomer.id;
    }

  } catch (err: any) {
    console.log(err)
  }

  if (req.method === "POST") {
    // PRODUCTID COMES FROM REQUEST BODY (FETCH)
    const { data } = await client.query(GetProductDocument, { id: productId }).toPromise();
    const product = data.product.edges[0].node;

    // CHECK AGAIN IF PRODUCT AMOUNT IS AVAILABLE
    if (amount > product.available) {
      res.status(406).end("Product Amount Not Acceptable");
      return;
    }

    // FORMAT PRODUCT IMAGES
    const productImages = product.image[0].productImages;
    const formattedProductImages = productImages.map((image: any) => {
      return image.url;
    });

    // CREATE CHECKOUT SESSION
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer: customerId,
      line_items: [
        {
          price_data: {
            currency: "BRL",
            product_data: {
              metadata: {
                productId: productId,
                productImage: product.image[0].mainImage.url,
                productName: productName,
                brand: product.brand.brandName,
                image: product.image[0].mainImage.url,
                available: product.available,
                email: email,
              },
              images: formattedProductImages,
              name: product.name,
            },
            unit_amount: product.price,
          },
          quantity: amount,
        },
      ],
      expand: ["line_items", "payment_intent"],
      mode: "payment",
      success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/${product.id}`,
    });

    // store customer orders

    res.status(200).json({ sessionId: session.id });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
};

// update (HyGraph) customer (add stripeId).
export async function updateCustomer(email: string, stripeId: string) {
  const data = await fetch(
    `https://api-sa-east-1.hygraph.com/v2/cl76lacb209q101ta1ko0b7nl/master`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.API_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        query: `
        mutation UpdateCustomer {
          updateCustomer(where: {email: "${email}"}, data: {stripeId: "${stripeId}"}) { id },
          publishCustomer (where: {email: "${email}"}) { id }
        }`,
      }),
    }
  );

  const response = await data.json();

  return response;
}
