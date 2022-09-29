import {
  GetCustomerByStripeIdDocument,
  GetProductAvailableDocument
} from "../../../generated/graphql";
import { client } from "../../../lib/urql";
import { stripe } from "../../../services/stripe";

export async function saveCheckout(
  checkoutId: string,
  customerId: string,
  metadata: any
) {
  // get user by customerId
  const { data: customers } = await client.query(GetCustomerByStripeIdDocument, { customerId }).toPromise();
  const lineItems = await stripe.checkout.sessions.listLineItems(checkoutId);

  console.log(lineItems.data.length)
  console.log(lineItems.data)
  
  try {
    if (lineItems.data.length > 1) {
      // save orders (First Product + 3 items)
        const retrieve = await stripe.products.retrieve(
          lineItems.data[0].price!.product.toString(),
        );

        // const total_amount = lineItems.data.reduce((prev, curr) => {
        //   return prev.amount_total + curr.amount_total;
        // }, lineItems)

        const mainCartProduct = {
          orderId: checkoutId,
          cartCheckoutItemsAmount: lineItems.data.length,
          price: lineItems.data[0].amount_total,
          metadata: retrieve.metadata,
          isMoreThanOneProduct: true,
        }  

        console.log(mainCartProduct)
    } else {

      const { data: { product } } = await client.query(GetProductAvailableDocument, { id: metadata.productId }).toPromise();
      const productAvailable = product.edges[0].node.available - lineItems.data[0].quantity!; 
      const email = customers.customers[0].email;
      
      await fetch(
        `https://api-sa-east-1.hygraph.com/v2/cl76lacb209q101ta1ko0b7nl/master`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.API_ACCESS_TOKEN}`,
          },
          body: JSON.stringify({
            query: `
            mutation CreateCustomerOrder {
              createOrder (
                data: {
                  orderId: "${checkoutId}", 
                  amount: ${lineItems.data[0].quantity},
                  price: ${lineItems.data[0].amount_total},
                  customer: {connect: {email: "${email}"} },
                  product: {connect: {id: "${metadata.productId}"}}
                }
              ) {
                id
              }
              updateProduct (where: {id: "${metadata.productId}"}, data: {available: ${productAvailable}}) { id }
            
              publishOrder (where: {orderId: "${checkoutId}"}) { id }
              publishCustomer (where: {email: "${email}"}) { id }
              publishProduct (where: {id: "${metadata.productId}"}) { id }
            }    
            `,
          }),
        }
      );
    }
  } catch (err: any) {
    console.log(err);
  }
}




