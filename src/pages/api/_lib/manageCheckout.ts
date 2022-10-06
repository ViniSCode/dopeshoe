import {
  GetCustomerByStripeIdDocument
} from "../../../generated/graphql";
import { client } from "../../../lib/urql";
import { stripe } from "../../../services/stripe";

export async function saveCheckout(
  checkoutId: string,
  customerId: string,
  metadata: any
) {
  // get user by customerId
  const {data: {customers}} = await client.query(GetCustomerByStripeIdDocument, { customerId }).toPromise();
  const lineItems = await stripe.checkout.sessions.listLineItems(checkoutId);
  const email = customers[0].email;

  try {
    const sumTotal = lineItems.data.reduce((prev, curr) => prev + curr.amount_total, 0);
    console.log(lineItems.data)
    const totalAmount = lineItems.data.reduce((prev, curr) => prev + curr.quantity!, 0);
    const isMoreThanOneProduct = lineItems.data.length > 1 ? true : false;
    
    const productsMetadata = await stripe.products.retrieve(
      lineItems.data[0].price!.product.toString()
      );
      
    const productAvailable = Number(productsMetadata.metadata.available) - lineItems.data[0].quantity!;


    // productAvailable error = NaN
    // for each items in cart update products amount

    try {
      await fetch(
        `https://api-sa-east-1.hygraph.com/v2/cl76lacb209q101ta1ko0b7nl/master`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.API_ACCESS_TOKEN}`,
          },
          body: JSON.stringify({
            query: `
            mutation CreateCustomerOrder {
              createOrder (
                data: {
                  orderId: "${checkoutId}", 
                  amount: ${totalAmount},
                  price: ${sumTotal},
                  customer: {connect: {email: "${email}"} },
                  isMoreThanOneProduct: ${isMoreThanOneProduct},
                  product: {connect: {id: "${productsMetadata.metadata.productId}"}}
                }
              ) {
                id
              }
              updateProduct (where: {id: "${productsMetadata.metadata.productId}"}, data: {available: ${productAvailable}}) { id }
            
              publishOrder (where: {orderId: "${checkoutId}"}) { id }
              publishCustomer (where: {email: "${email}"}) { id }
              publishProduct (where: {id: "${productsMetadata.metadata.productId}"}) { id }
            }    
            `,
          }),
        }
      );
    } catch(err: any) {
      console.log(err.message)
    }
    
  } catch (err: any) {
    console.log(err);
  }
}
